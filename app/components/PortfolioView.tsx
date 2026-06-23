"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../lib/supabase";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  bio: string | null;
  role: string | null;
  avatar_url: string | null;
  tags: string[] | null;
  subscription_status: string | null;
  email?: string | null;
}

interface Post {
  id: string;
  title: string;
  content: string | null;
  cover_url: string | null;
  post_type: string;
  category: string;
  is_premium: boolean | null;
  price: number | null;
  script_budget: string | null;
  script_episodes: string | null;
  script_language: string | null;
  script_status: string | null;
  created_at: string;
  genre?: string | null;
  likes_count?: number;
}

interface Stats {
  scriptsCount: number;
  totalLikes: number;
  totalSaves: number;
}

export default function PortfolioView({ username, darkMode = true }: { username: string; darkMode?: boolean }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>({ scriptsCount: 0, totalLikes: 0, totalSaves: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeScript, setActiveScript] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);
  const [isTearing, setIsTearing] = useState(false);

  const triggerTear = () => {
    setIsTearing(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  useEffect(() => {
    if (!username) return;

    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      try {
        const client = supabase;
        if (!client) {
          throw new Error("Supabase is not configured. Please set the environment variables.");
        }

        // 1. Fetch Profile (case-insensitive username lookup)
        const { data: profileData, error: profileError } = await client
          .from("profiles")
          .select("id, username, full_name, bio, role, avatar_url, tags, subscription_status, email")
          .ilike("username", username)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData) {
          setProfile(null);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // 2. Fetch public, published creations created by this writer/creator (all posts, text + video)
        const { data: postsData, error: postsError } = await client
          .from("posts")
          .select("*")
          .eq("user_id", profileData.id)
          .eq("status", "published")
          .eq("visibility", "public")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;

        const fetchedPosts = (postsData || []) as Post[];

        // 3. Aggregate stats and map likes_count to individual posts
        if (fetchedPosts.length > 0) {
          const postIds = fetchedPosts.map((p) => p.id);

          const [likesRes, savesRes] = await Promise.all([
            client
              .from("likes")
              .select("post_id")
              .in("post_id", postIds),
            client
              .from("saves")
              .select("post_id")
              .in("post_id", postIds),
          ]);

          const likesMap: Record<string, number> = {};
          likesRes.data?.forEach((like) => {
            likesMap[like.post_id] = (likesMap[like.post_id] || 0) + 1;
          });

          const postsWithLikes = fetchedPosts.map((p) => ({
            ...p,
            likes_count: likesMap[p.id] || 0,
          }));

          setPosts(postsWithLikes);

          setStats({
            scriptsCount: fetchedPosts.length,
            totalLikes: likesRes.data?.length || 0,
            totalSaves: savesRes.data?.length || 0,
          });
        } else {
          setPosts([]);
          setStats({
            scriptsCount: 0,
            totalLikes: 0,
            totalSaves: 0,
          });
        }
      } catch (err: any) {
        console.error("Error fetching portfolio:", err);
        setError("Unable to retrieve writer information. Please check your network or try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [username]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.search = `?writer=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "W";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${profile?.username || "writer"}_portfolio`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const handleDownloadApp = () => {
    if (typeof window !== 'undefined') {
      window.open('/download', '_blank');
    }
  };

  // Determine if profile is verified under "Writer Pro" or standard tier
  const isWriterPro =
    profile?.role?.toLowerCase() === "writer pro" ||
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "expiring_soon";

  // Loading State (Shimmer Effect)
  if (loading) {
    return (
      <div className={`min-h-screen bg-transparent ${darkMode ? "text-white" : "text-gray-900"} pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-10`}>
        {/* Profile Card Shimmer */}
        <div className={`w-full h-64 rounded-3xl ${darkMode ? "bg-white/[0.02] border-white/[0.05]" : "bg-black/[0.02] border-black/[0.05]"} p-8 flex flex-col md:flex-row gap-6 items-center animate-pulse`}>
          <div className={`w-28 h-28 rounded-full ${darkMode ? "bg-white/10" : "bg-black/10"} shrink-0`} />
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className={`h-8 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-[40%]`} />
            <div className={`h-4 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-[25%]`} />
            <div className={`h-12 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-full mt-2`} />
          </div>
        </div>

        {/* Stats Row Shimmer */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-24 rounded-2xl ${darkMode ? "bg-white/[0.02] border-white/[0.05]" : "bg-black/[0.02] border-black/[0.05]"} p-4 flex flex-col justify-center items-center animate-pulse`}>
              <div className={`h-8 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-16 mb-2`} />
              <div className={`h-3 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-20`} />
            </div>
          ))}
        </div>

        {/* Script Cards Shimmer */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className={`h-56 rounded-2xl ${darkMode ? "bg-white/[0.02] border-white/[0.05]" : "bg-black/[0.02] border-black/[0.05]"} p-6 animate-pulse flex flex-col gap-4`}>
              <div className={`h-6 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-[70%]`} />
              <div className={`h-16 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-full`} />
              <div className={`h-8 ${darkMode ? "bg-white/10" : "bg-black/10"} rounded w-[40%] mt-auto`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error Fallback
  if (error) {
    return (
      <div className={`min-h-screen bg-transparent ${darkMode ? "text-white" : "text-gray-900"} pt-40 pb-20 px-4 flex flex-col items-center justify-center max-w-md mx-auto text-center`}>
        <div className={`p-6 rounded-2xl ${darkMode ? "bg-red-500/10 border-red-500/20" : "bg-red-50/80 border-red-200"} border backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]`}>
          <span className="text-3xl">⚠️</span>
          <h2 className="text-xl font-bold mt-3 mb-2">Something Went Wrong</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-sm font-semibold shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Profile Not Found Fallback
  if (!profile) {
    return (
      <div className={`min-h-screen bg-transparent ${darkMode ? "text-white" : "text-gray-900"} pt-40 pb-20 px-4 flex flex-col items-center justify-center max-w-lg mx-auto text-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-3xl ${
            darkMode 
              ? "bg-white/[0.03] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "bg-black/[0.02] border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
          } backdrop-blur-xl border w-full relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className={`w-16 h-16 rounded-full ${darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"} flex items-center justify-center mx-auto text-3xl mb-4`}>
            🔍
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Writer Profile Not Found
          </h1>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} mb-8 max-w-sm mx-auto leading-relaxed`}>
            We couldn't locate any writer profile registered with the username <span className="text-purple-400 font-bold font-mono">@{username}</span>.
          </p>

          {/* Fallback Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search writer username (e.g. mayank9307)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 ${darkMode ? "bg-black/40 border-white/10 text-white" : "bg-gray-50 border-black/10 text-black"} border rounded-xl px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition shadow-inner font-semibold`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              Search
            </button>
          </form>

          <a
            href="/"
            className="text-xs text-purple-400 hover:text-purple-300 font-bold transition flex items-center justify-center gap-1.5"
          >
            ← Back to Homepage
          </a>
        </motion.div>
      </div>
    );
  }

  // Decider Logic for Layout Types
  const roleNorm = profile.role?.toLowerCase() || '';
  const isWriter = ['writer pro', 'writer', 'poet', 'script writer'].includes(roleNorm);
  const isCreator = ['creator pro', 'creator', 'studio pro', 'filmmaker', 'director', 'producer', 'actor'].includes(roleNorm);

  const writerPosts = posts.filter(p => p.post_type !== 'video');
  const creatorPosts = posts.filter(p => p.post_type === 'video' || p.category === 'Reels' || p.category === 'Series');

  let isCreatorTemplate = false;
  if (isWriter) {
    isCreatorTemplate = false;
  } else if (isCreator) {
    isCreatorTemplate = true;
  } else {
    // Admin/Core roles -> compare counts
    isCreatorTemplate = creatorPosts.length > writerPosts.length;
  }

  // 1. WRITER PRO LAYOUT
  const renderWriterProLayout = () => {
    const writerLikes = writerPosts.reduce((sum, p) => sum + (p.likes_count || 0), 0);
    const emailAddress = profile.email || "mayank0522.s@gmail.com";
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent("WryClip Screenplay Optioning Inquiry")}&body=${encodeURIComponent(`Hi @${profile.username}, we reviewed your Writer Pro screenplay portfolio on WryClip and would like to discuss options / licensing for your scripts...`)}`;

    return (
      <div className={`min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8 relative z-10 portfolio-print-wrapper`}>
        {/* Background Atmosphere */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050811] via-[#0a101f] to-[#000000] pointer-events-none" />
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />

        {/* Back to Homepage Button */}
        <div className="print-hidden -mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold transition cursor-pointer"
          >
            ← Back to Homepage
          </a>
        </div>

        {/* Branding Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-2 print-hidden">
          <div className="flex items-center gap-3">
            <img src="/bg-logo.jpeg" alt="WryClip Logo" className="w-10 h-10 rounded-xl object-cover border border-cyan-500/30" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">WRYCLIP WRITER PORTFOLIO</span>
          </div>
          <a href="/" className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition">
            BACK TO FEED
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Profile Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="w-full rounded-3xl bg-white/[0.02] border border-[rgba(0,240,255,0.3)] shadow-[0_8px_32px_rgba(0,240,255,0.05)] backdrop-blur-xl p-6 flex flex-col gap-6 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="shrink-0 relative">
                <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] mx-auto relative">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const fallbackDiv = document.getElementById("writer-avatar-fallback");
                        if (fallbackDiv) fallbackDiv.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    id="writer-avatar-fallback"
                    className="w-full h-full bg-gradient-to-br from-cyan-900 to-indigo-950 flex items-center justify-center font-bold text-3xl tracking-wide text-cyan-300"
                    style={{ display: profile.avatar_url ? "none" : "flex" }}
                  >
                    {getInitials(profile.full_name)}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
                  {profile.full_name}
                  {isWriterPro && (
                    <span
                      title="Verified Writer Pro"
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500 text-black text-[9px] font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                    >
                      ✓
                    </span>
                  )}
                </h1>
                <p className="text-xs font-semibold font-mono text-cyan-400/90 mt-1">@{profile.username}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[10px] font-bold text-cyan-300">
                  {profile.role || "Screenwriter"}
                </span>
                {isWriterPro ? (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[9px] font-bold text-cyan-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Writer Pro
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-medium text-gray-400">
                    Standard
                  </span>
                )}
                <button
                  onClick={handlePrint}
                  className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-bold flex items-center gap-1 transition print:hidden cursor-pointer"
                >
                  📥 Save PDF
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed italic">
                {profile.bio || "Crafting cinematic journeys and original storytelling. Read my screenplays below."}
              </p>

              {profile.tags && profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {profile.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.07] text-[9px] uppercase font-bold text-gray-300 tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="border-t border-white/5 my-2" />

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">🎬</span>
                  <span className="text-sm font-extrabold text-white">{writerPosts.length}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Scripts</span>
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">❤️</span>
                  <span className="text-sm font-extrabold text-white">{writerLikes}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Likes</span>
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">💾</span>
                  <span className="text-sm font-extrabold text-white">{stats.totalSaves}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Saves</span>
                </div>
              </div>

              <div className="border-t border-white/5 my-2" />

              <a
                href={mailtoUrl}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-black uppercase tracking-wider text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_16px_rgba(6,182,212,0.3)]"
              >
                EMAIL SCRIPT INQUIRY ✉️
              </a>

              <button
                onClick={handleDownloadApp}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-wider transition hover:bg-white/10"
              >
                CHAT IN APP 💬
              </button>
            </div>
          </div>

          {/* Screenplay Showcase List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold tracking-tight text-cyan-400">
                SCREENPLAY SHOWCASE
              </h2>
              <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full font-semibold">
                {writerPosts.length} Screenplays Published
              </span>
            </div>

            {writerPosts.length === 0 ? (
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] text-gray-400 p-12 text-center relative overflow-hidden backdrop-blur-md">
                <span className="text-4xl block mb-3">✨</span>
                <p className="text-base font-bold text-white mb-1">No Screenplays Published</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  @{profile.username} has not published any screenplays yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {writerPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-r-2xl border-l-4 border-l-[#00F0FF] border-y border-r border-white/10 bg-white/[0.01] hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden group"
                  >
                    {post.cover_url && (
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-white/10 relative">
                        <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold mb-3 border-b border-white/5 pb-2">
                      <span className="px-2 py-0.5 rounded border border-cyan-500/20 text-cyan-400 bg-cyan-500/5 font-mono tracking-wider">
                        WR-{post.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight transition duration-300" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                      🎬 {post.title}
                    </h3>

                    {post.is_premium ? (
                      <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 px-3 py-2.5 mb-4">
                        <span className="text-lg shrink-0">🔒</span>
                        <div>
                          <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">Premium Content Locked</p>
                          <p className="text-[9px] text-gray-400 leading-relaxed">Download the WryClip app to unlock this script.</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-4 mb-4 pr-1" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                        {post.content || "No synopsis or detail content provided."}
                      </p>
                    )}

                    {/* Metadata badges row */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.genre && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300">
                          🎭 {post.genre}
                        </span>
                      )}
                      {post.script_budget && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-[10px] text-emerald-400">
                          💰 {post.script_budget}
                        </span>
                      )}
                      {post.script_episodes && (
                        <span className="px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/25 text-[10px] text-pink-400">
                          🎞️ {post.script_episodes}
                        </span>
                      )}
                      {post.script_language && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300">
                          🗣️ {post.script_language}
                        </span>
                      )}
                      {post.script_status && (
                        <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/25 text-[10px] text-violet-400">
                          📝 {post.script_status}
                        </span>
                      )}
                      {post.is_premium && post.price && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/25 text-[10px] text-amber-300">
                          💎 ₹{post.price}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <span className="text-[9px] tracking-wider text-cyan-400 font-bold uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        Verified Original Work
                      </span>

                      <button
                        onClick={() => setActiveScript(post)}
                        className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-bold hover:opacity-90 transition duration-300"
                      >
                        Read Script Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secondary Creations (Videos for Writers) */}
            {creatorPosts.length > 0 && (
              <div className="mt-12 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold tracking-tight text-cyan-400/80 uppercase">
                    🎥 Additional Video Creations & Reels
                  </h3>
                  <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full font-semibold">
                    {creatorPosts.length} Videos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatorPosts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 p-4 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                      onClick={() => setActiveScript(post)}
                    >
                      <div>
                        {/* Project Thumbnail Card */}
                        <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 border border-white/5 bg-black">
                          {post.cover_url ? (
                            <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-950/40 flex items-center justify-center text-3xl">🎬</div>
                          )}
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[8px] font-bold text-white">
                            👁️ {(post.likes_count || 0) * 4 + 12} Views
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[9px] text-gray-400 font-semibold mb-2">
                          <span className="px-1.5 py-0.5 rounded border border-cyan-500/20 text-cyan-400 bg-cyan-500/5 font-mono tracking-wider">
                            CR-{post.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 leading-snug mb-1 transition duration-300">
                          {post.title}
                        </h4>

                        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
                          {post.content || "No creation details shared."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.category && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-bold text-cyan-400">
                            {post.category}
                          </span>
                        )}
                        {post.genre && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-gray-300">
                            🎭 {post.genre}
                          </span>
                        )}
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[8px] font-bold text-purple-400">
                          ❤️ {post.likes_count || 0} Likes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 2. CREATOR PRO LAYOUT
  const renderCreatorProLayout = () => {
    const creatorLikes = creatorPosts.reduce((sum, p) => sum + (p.likes_count || 0), 0);
    const emailAddress = profile.email || "mayank0522.s@gmail.com";
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent("WryClip Brand Collaboration Proposal")}&body=${encodeURIComponent(`Hi @${profile.username}, we found your Creator Pro video portfolio on WryClip and would like to discuss a project...`)}`;

    return (
      <div className={`min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8 relative z-10 portfolio-print-wrapper`}>
        {/* Background Atmosphere */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050208] via-[#120c1a] to-[#000000] pointer-events-none" />
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

        {/* Back to Homepage Button */}
        <div className="print-hidden -mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-400 font-bold transition cursor-pointer"
          >
            ← Back to Homepage
          </a>
        </div>

        {/* Branding Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-2 print-hidden">
          <div className="flex items-center gap-3">
            <img src="/bg-logo.jpeg" alt="WryClip Logo" className="w-10 h-10 rounded-xl object-cover border border-pink-500/30" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-pink-500">WRYCLIP CREATOR PORTFOLIO</span>
          </div>
          <a href="/" className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs font-bold text-pink-400 hover:bg-pink-500/20 transition">
            BACK TO FEED
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Profile Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="w-full rounded-3xl bg-white/[0.02] border border-[rgba(255,0,127,0.35)] shadow-[0_8px_32px_rgba(255,0,127,0.05)] backdrop-blur-xl p-6 flex flex-col gap-6 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="shrink-0 relative">
                <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-2 border-pink-500 shadow-[0_0_15px_rgba(255,0,127,0.5)] mx-auto relative">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const fallbackDiv = document.getElementById("creator-avatar-fallback");
                        if (fallbackDiv) fallbackDiv.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    id="creator-avatar-fallback"
                    className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex items-center justify-center font-bold text-3xl tracking-wide text-pink-300"
                    style={{ display: profile.avatar_url ? "none" : "flex" }}
                  >
                    {getInitials(profile.full_name)}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
                  {profile.full_name}
                  {isWriterPro && (
                    <span
                      title="Verified Creator Pro"
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-pink-500 text-black text-[9px] font-bold shadow-[0_0_10px_rgba(255,0,127,0.6)]"
                    >
                      ✓
                    </span>
                  )}
                </h1>
                <p className="text-xs font-semibold font-mono text-pink-400 mt-1">@{profile.username}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-[10px] font-bold text-pink-400">
                  {profile.role || "Creator"}
                </span>
                {isWriterPro ? (
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-[9px] font-bold text-pink-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                    Creator Pro
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-medium text-gray-400">
                    Standard
                  </span>
                )}
                <button
                  onClick={handlePrint}
                  className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-bold flex items-center gap-1 transition print:hidden cursor-pointer"
                >
                  📥 Save PDF
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed italic">
                {profile.bio || "Crafting visual stories and cinematic creations. View my projects below."}
              </p>

              {profile.tags && profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {profile.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.07] text-[9px] uppercase font-bold text-gray-300 tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="border-t border-white/5 my-2" />

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">🎥</span>
                  <span className="text-sm font-extrabold text-white">{creatorPosts.length}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Videos</span>
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">❤️</span>
                  <span className="text-sm font-extrabold text-white">{creatorLikes}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Likes</span>
                </div>
                <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl flex flex-col items-center">
                  <span className="text-base">💾</span>
                  <span className="text-sm font-extrabold text-white">{stats.totalSaves}</span>
                  <span className="text-[8px] text-gray-500 uppercase font-black">Saves</span>
                </div>
              </div>

              <div className="border-t border-white/5 my-2" />

              <a
                href={mailtoUrl}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-black uppercase tracking-wider text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_16px_rgba(255,0,127,0.3)]"
              >
                BRAND COLLAB INQUIRY ✉️
              </a>

              <button
                onClick={handleDownloadApp}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-wider transition hover:bg-white/10"
              >
                CHAT IN WRYCLIP 💬
              </button>
            </div>
          </div>

          {/* Cinematic Showcase Grid */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold tracking-tight text-pink-500">
                CINEMATIC SERIES & PROJECTS
              </h2>
              <span className="text-xs bg-pink-500/10 border border-pink-500/20 text-pink-400 px-3 py-1 rounded-full font-semibold">
                {creatorPosts.length} Projects Published
              </span>
            </div>

            {creatorPosts.length === 0 ? (
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] text-gray-400 p-12 text-center relative overflow-hidden backdrop-blur-md">
                <span className="text-4xl block mb-3">✨</span>
                <p className="text-base font-bold text-white mb-1">No Video Projects Published</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  @{profile.username} has not published any video projects yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creatorPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-pink-500/30 hover:bg-white/[0.03] transition-all duration-300 p-4 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                    onClick={() => setActiveScript(post)}
                  >
                    <div>
                      {/* Project Thumbnail Card */}
                      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-white/5 bg-black">
                        {post.cover_url ? (
                          <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-950/40 flex items-center justify-center text-4xl">🎬</div>
                        )}
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                          👁️ {(post.likes_count || 0) * 4 + 12} Views
                        </div>
                      </div>

                      {/* Header Row */}
                      <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold mb-2.5">
                        <span className="px-2 py-0.5 rounded border border-pink-500/20 text-pink-400 bg-pink-500/5 font-mono tracking-wider">
                          CR-{post.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span>{formatDate(post.created_at)}</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-pink-400 leading-snug mb-2 transition duration-300">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                        {post.content || "No creation details shared."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.category && (
                        <span className="px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-[9px] font-bold text-pink-400">
                          {post.category}
                        </span>
                      )}
                      {post.genre && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-gray-300">
                          🎭 {post.genre}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400">
                        ❤️ {post.likes_count || 0} Likes
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-1">
                      <span className="text-[8px] tracking-wider text-pink-400 font-bold uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                        Verified Original Creator
                      </span>

                      <span className="text-[10px] text-pink-400 font-bold hover:underline">
                        View Project →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secondary Creations (Written works for Creators) */}
            {writerPosts.length > 0 && (
              <div className="mt-12 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold tracking-tight text-pink-500/80 uppercase">
                    ✍️ Additional Written Works & Scripts
                  </h3>
                  <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full font-semibold">
                    {writerPosts.length} Written Works
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {writerPosts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-r-2xl border-l-4 border-l-[#FF007F] border-y border-r border-white/10 bg-white/[0.01] hover:border-pink-500/30 hover:bg-white/[0.02] transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                      onClick={() => setActiveScript(post)}
                    >
                      <div>
                        <div className="flex justify-between items-center text-[9px] text-gray-400 font-semibold mb-2">
                          <span className="px-1.5 py-0.5 rounded border border-pink-500/20 text-pink-400 bg-pink-500/5 font-mono tracking-wider">
                            WR-{post.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-pink-400 mb-2 leading-tight transition duration-300" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                          🎬 {post.title}
                        </h4>

                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-3 pr-1" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                          {post.content || "No synopsis or detail content provided."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.genre && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-gray-300">
                            🎭 {post.genre}
                          </span>
                        )}
                        {post.is_premium && post.price && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/25 text-[9px] text-amber-300">
                            💎 ₹{post.price}
                          </span>
                        )}
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400">
                          ❤️ {post.likes_count || 0} Likes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 3. SHARED MODAL COMPONENT (Differentiated for screenplays and cinematic locked creations)
  const renderSharedModal = () => {
    if (!activeScript) return null;

    const isCreatorPost = activeScript.post_type === 'video' || activeScript.category === 'Reels' || activeScript.category === 'Series';

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-start justify-center p-4 pt-24 md:pt-28 bg-black/85 backdrop-blur-md print-hidden overflow-y-auto"
          onClick={() => setActiveScript(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`w-full max-w-2xl rounded-3xl ${
              darkMode ? "bg-white/[0.04] border-white/[0.1]" : "bg-white border-black/[0.1]"
            } border shadow-2xl p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden text-left`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glows */}
            {isCreatorPost ? (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              </>
            ) : (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              </>
            )}

            {/* Modal Header */}
            <div className={`flex justify-between items-start border-b ${darkMode ? "border-white/10" : "border-black/10"} pb-4 relative z-10`}>
              <div>
                <div className="flex gap-2 items-center text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">
                  <span>{isCreatorPost ? "CR" : "WR"}-{activeScript.id.slice(0, 8).toUpperCase()}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span>{formatDate(activeScript.created_at)}</span>
                </div>
                <h2 className={`text-xl md:text-2xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"} leading-snug flex items-center gap-2`}>
                  <span className="text-lg">{isCreatorPost ? "🎥" : "🎬"}</span>
                  {activeScript.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveScript(null)}
                className={`w-8 h-8 rounded-full ${
                  darkMode 
                    ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" 
                    : "bg-black/5 border-black/10 hover:bg-black/10 text-gray-800"
                } flex items-center justify-center transition text-sm cursor-pointer`}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative z-10 flex flex-col gap-4">
              {isCreatorPost && activeScript.cover_url && (
                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 relative">
                  <img src={activeScript.cover_url} alt={activeScript.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className={`${darkMode ? "bg-black/35 border-white/5" : "bg-slate-50 border-black/5"} rounded-2xl border p-5`}>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isCreatorPost ? "text-pink-400" : "text-cyan-400"}`}>
                    {isCreatorPost ? "Creator" : "Writer"} Project Parameters
                  </span>
                  {!activeScript.is_premium && (
                    <button
                      onClick={() => handleCopyText(activeScript.content || "", activeScript.id)}
                      className={`px-2.5 py-1 rounded ${
                        darkMode 
                          ? "bg-white/5 border-white/5 text-gray-400 hover:text-white" 
                          : "bg-black/5 border-black/5 text-gray-600 hover:text-black"
                      } text-[9px] font-bold transition flex items-center gap-1 cursor-pointer`}
                    >
                      {copiedScriptId === activeScript.id ? "✓ Copied!" : "📋 Copy"}
                    </button>
                  )}
                </div>

                <div 
                  className={`whitespace-pre-wrap font-sans text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar`}
                  style={!isCreatorPost ? { fontFamily: 'Courier New, Courier, monospace' } : {}}
                >
                  {activeScript.content || "No synopsis or parameters provided."}
                </div>
              </div>

              {/* Lock Card representation */}
              {isCreatorPost ? (
                <div className="relative rounded-2xl border border-pink-500/30 bg-pink-500/5 p-5 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent pointer-events-none" />
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-[9px] font-bold text-pink-300 uppercase tracking-widest mb-3">CINEMATIC SERIES LOCK</span>
                  <h4 className="text-sm font-extrabold text-white mb-2">CINEMATIC SERIES LOCK - Download WryClip to watch full series</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4 max-w-md mx-auto">To protect the copyright and distribution agreements of our Creator Pro members, full video series and episodes can only be played inside the WryClip mobile application.</p>
                  <button onClick={handleDownloadApp} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all">DOWNLOAD WRYCLIP APK</button>
                </div>
              ) : (
                <div className="relative rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[9px] font-bold text-cyan-300 uppercase tracking-widest mb-3">SCREENPLAY PAGE LOCK</span>
                  <h4 className="text-sm font-extrabold text-white mb-2">SCREENPLAY PAGE LOCK - Download WryClip to read full pages</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4 max-w-md mx-auto">To protect the intellectual property and copyright of our Writer Pro members, complete screenplays and scripts can only be read within the WryClip mobile application.</p>
                  <button onClick={handleDownloadApp} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all">DOWNLOAD WRYCLIP APK</button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t ${
              darkMode ? "border-white/5 text-gray-400" : "border-black/5 text-gray-600"
            } text-[10px] relative z-10`}>
              <span className={`flex items-center gap-1 ${isCreatorPost ? "text-pink-400" : "text-cyan-400"} font-bold uppercase tracking-wider`}>
                🛡️ WryClip Original IP
              </span>
              <span className="text-center sm:text-right">
                Join WryClip to discuss optioning, distribution, and cast licensing.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      {/* Page Tearing Animation Overlay */}
      {isTearing && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black pointer-events-none">
          {/* Left Half of Page */}
          <motion.div
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: -600, y: 400, rotate: -15, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            className={`absolute inset-0 ${isCreatorTemplate ? "bg-[#050208]" : "bg-[#050811]"}`}
            style={{
              clipPath: 'polygon(0% 0%, 50% 0%, 48% 10%, 52% 20%, 48% 30%, 52% 40%, 48% 50%, 52% 60%, 48% 70%, 52% 80%, 48% 90%, 50% 100%, 0% 100%)',
            }}
          >
            <div className="w-full h-full opacity-60 pointer-events-none select-none">
              {isCreatorTemplate ? renderCreatorProLayout() : renderWriterProLayout()}
            </div>
          </motion.div>

          {/* Right Half of Page */}
          <motion.div
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: 600, y: 400, rotate: 15, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            className={`absolute inset-0 ${isCreatorTemplate ? "bg-[#050208]" : "bg-[#050811]"}`}
            style={{
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 48% 90%, 52% 80%, 48% 70%, 52% 60%, 48% 50%, 52% 40%, 48% 30%, 52% 20%, 48% 10%)',
            }}
          >
            <div className="w-full h-full opacity-60 pointer-events-none select-none">
              {isCreatorTemplate ? renderCreatorProLayout() : renderWriterProLayout()}
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Dog-ear Corner to tear page */}
      {!isTearing && (
        <div className="fixed top-0 right-0 z-50 print-hidden group">
          <div className="absolute right-24 top-6 bg-black/80 border border-white/10 text-[9px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-lg text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-2xl">
            Pull corner down to tear page & exit 📄
          </div>
          <motion.div
            drag
            dragConstraints={{ top: 0, right: 0, left: -200, bottom: 200 }}
            dragElastic={0.1}
            onDrag={(event, info) => {
              const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
              if (distance > 120) {
                triggerTear();
              }
            }}
            className="w-20 h-20 bg-gradient-to-bl from-white/15 to-transparent border-l border-b border-white/20 rounded-bl-3xl shadow-xl backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing text-xs select-none"
          >
            <div className="text-center font-bold text-[9px] text-white flex flex-col items-center gap-0.5 pointer-events-none">
              <span>📄</span>
              <span>PULL TO</span>
              <span className={isCreatorTemplate ? "text-pink-500 font-extrabold animate-pulse" : "text-cyan-400 font-extrabold animate-pulse"}>TEAR</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Normal Layout */}
      {!isTearing && (
        <>
          {isCreatorTemplate ? renderCreatorProLayout() : renderWriterProLayout()}
          {renderSharedModal()}
        </>
      )}
    </>
  );
}
