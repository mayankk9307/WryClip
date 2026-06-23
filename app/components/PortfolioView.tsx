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
}

interface Stats {
  scriptsCount: number;
  totalLikes: number;
  totalSaves: number;
}

export default function PortfolioView({ username }: { username: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>({ scriptsCount: 0, totalLikes: 0, totalSaves: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeScript, setActiveScript] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

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
          .select("id, username, full_name, bio, role, avatar_url, tags, subscription_status")
          .ilike("username", username)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData) {
          setProfile(null);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // 2. Fetch public, published creations created by this writer (excluding video reels/series)
        const { data: postsData, error: postsError } = await client
          .from("posts")
          .select("*")
          .eq("user_id", profileData.id)
          .eq("status", "published")
          .eq("visibility", "public")
          .neq("post_type", "video")
          .neq("category", "Reels")
          .neq("category", "Series")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;

        const fetchedPosts = (postsData || []) as Post[];
        setPosts(fetchedPosts);

        // 3. Aggregate stats:
        // - saves: fetched from `saves` table, counted per-post (same as mobile app getFeedCounts)
        // - likes: fetched from `likes` table
        // NOTE: saves_count on posts table is only an in-memory counter in the app; it is never
        //       persisted back to Supabase, so the saves table is the authoritative source.
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

          setStats({
            scriptsCount: fetchedPosts.length,
            totalLikes: likesRes.data?.length || 0,
            totalSaves: savesRes.data?.length || 0,
          });
        } else {
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

  const getPostTypeLabel = (post: Post) => {
    const type = post.post_type?.toLowerCase() || "script";
    const cat = post.category?.toLowerCase() || "";
    
    if (type === "script") return "Script";
    if (type === "collab") return "Collab";
    if (type === "story") {
      if (cat === "poem" || cat === "poetry") return "Poem";
      if (cat === "ghazal") return "Ghazal";
      return "Story";
    }
    return "Creation";
  };

  const getPostTypeIcon = (post: Post) => {
    const type = post.post_type?.toLowerCase() || "script";
    const cat = post.category?.toLowerCase() || "";
    
    if (type === "script") return "🎬";
    if (type === "collab") return "🤝";
    if (type === "story") {
      if (cat === "poem" || cat === "poetry" || cat === "ghazal") return "✍️";
      return "📖";
    }
    return "📝";
  };

  const getPostTypeColor = (post: Post) => {
    const type = post.post_type?.toLowerCase() || "script";
    const cat = post.category?.toLowerCase() || "";
    
    if (type === "script") return "text-cyan-400 border-cyan-500/20 bg-cyan-500/10";
    if (type === "collab") return "text-pink-400 border-pink-500/20 bg-pink-500/10";
    if (type === "story") {
      if (cat === "poem" || cat === "poetry" || cat === "ghazal") return "text-violet-400 border-violet-500/20 bg-violet-500/10";
      return "text-purple-400 border-purple-500/20 bg-purple-500/10";
    }
    return "text-blue-400 border-blue-500/20 bg-blue-500/10";
  };

  const getPostIdPrefix = (post: Post) => {
    const type = post.post_type?.toLowerCase() || "script";
    if (type === "script") return "WR-";
    if (type === "collab") return "CL-";
    if (type === "story") return "ST-";
    return "CR-";
  };

  const getScriptId = (post: Post) => {
    const prefix = getPostIdPrefix(post);
    const segment = post.id.split("-")[0] || post.id;
    return `${prefix}${segment.toUpperCase()}`;
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

  // Determine if profile is verified under "Writer Pro" or standard tier
  const isWriterPro =
    profile?.role?.toLowerCase() === "writer pro" ||
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "expiring_soon";

  // Loading State (Shimmer Effect)
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent text-white pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-10">
        {/* Profile Card Shimmer */}
        <div className="w-full h-64 rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 flex flex-col md:flex-row gap-6 items-center animate-pulse">
          <div className="w-28 h-28 rounded-full bg-white/10 shrink-0" />
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="h-8 bg-white/10 rounded w-[40%]" />
            <div className="h-4 bg-white/10 rounded w-[25%]" />
            <div className="h-12 bg-white/10 rounded w-full mt-2" />
          </div>
        </div>

        {/* Stats Row Shimmer */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-center items-center animate-pulse">
              <div className="h-8 bg-white/10 rounded w-16 mb-2" />
              <div className="h-3 bg-white/10 rounded w-20" />
            </div>
          ))}
        </div>

        {/* Script Cards Shimmer */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 animate-pulse flex flex-col gap-4">
              <div className="h-6 bg-white/10 rounded w-[70%]" />
              <div className="h-16 bg-white/10 rounded w-full" />
              <div className="h-8 bg-white/10 rounded w-[40%] mt-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error / Error Fallback
  if (error) {
    return (
      <div className="min-h-screen bg-transparent text-white pt-40 pb-20 px-4 flex flex-col items-center justify-center max-w-md mx-auto text-center">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-xl font-bold mt-3 mb-2">Something Went Wrong</h2>
          <p className="text-sm text-gray-400">{error}</p>
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
      <div className="min-h-screen bg-transparent text-white pt-40 pb-20 px-4 flex flex-col items-center justify-center max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-3xl mb-4">
            🔍
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Writer Profile Not Found
          </h1>
          <p className="text-sm text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
            We couldn't locate any writer profile registered with the username <span className="text-purple-400 font-bold font-mono">@{username}</span>.
          </p>

          {/* Fallback Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search writer username (e.g. mayank9307)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition shadow-inner font-semibold"
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

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-8 relative z-10 portfolio-print-wrapper">
      
      {/* Back to Homepage Button */}
      <div className="print-hidden -mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold transition cursor-pointer"
        >
          ← Back to Homepage
        </a>
      </div>

      {/* 1. Header Card (Glassmorphic) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center relative overflow-hidden portfolio-header-card"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Profile Avatar / Initials */}
        <div className="shrink-0 relative">
          <div
            className={`w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-2 ${
              isWriterPro
                ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                : "border-white/10"
            }`}
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const fallbackDiv = document.getElementById("avatar-fallback");
                  if (fallbackDiv) fallbackDiv.style.display = "flex";
                }}
              />
            ) : null}
            <div
              id="avatar-fallback"
              className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex items-center justify-center font-bold text-3xl tracking-wide text-cyan-300"
              style={{ display: profile.avatar_url ? "none" : "flex" }}
            >
              {getInitials(profile.full_name)}
            </div>
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
              {profile.full_name}
              
              {/* Verified Badge */}
              {isWriterPro && (
                <span
                  title="Verified Writer Pro"
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-black text-[10px] font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                >
                  ✓
                </span>
              )}
            </h1>
            
            <span className="text-sm font-semibold font-mono text-cyan-400/90 align-middle">
              @{profile.username}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start items-center">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-xs font-bold text-purple-300">
              {profile.role || "Screenwriter"}
            </span>

            {isWriterPro ? (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-bold text-cyan-300 flex items-center gap-1 shadow-[0_0_8px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Writer Pro member
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                Standard tier
              </span>
            )}

            {/* Download Portfolio Button */}
            <button
              onClick={handlePrint}
              className="px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 transition print:hidden cursor-pointer"
              title="Download Portfolio as PDF"
            >
              📥 Save PDF
            </button>
          </div>

          <p className="text-sm text-gray-300 max-w-xl leading-relaxed italic">
            {profile.bio || "Crafting cinematic journeys and original storytelling. Read my screenplays below."}
          </p>

          {/* Creative Tags */}
          {profile.tags && profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center md:justify-start">
              {profile.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.07] text-[10px] uppercase font-bold text-gray-300 tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* 2. Analytics Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-3 gap-4 md:gap-6 portfolio-stats-row"
      >
        {[
          { label: "Total Creations", value: stats.scriptsCount, icon: "🎨", glow: "rgba(168,85,247,0.2)" },
          { label: "Total Likes", value: stats.totalLikes, icon: "❤️", glow: "rgba(236,72,153,0.2)" },
          { label: "Total Saves", value: stats.totalSaves, icon: "💾", glow: "rgba(6,182,212,0.2)" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.06] p-4 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group hover:border-white/10 transition-all duration-300 portfolio-stat-card"
            style={{ boxShadow: `inset 0 0 12px ${stat.glow}` }}
          >
            <span className="text-lg md:text-xl mb-1 group-hover:scale-110 transition duration-300">{stat.icon}</span>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 3. Creations Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Creations Showcase
          </h2>
          <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full font-semibold">
            {posts.length} {posts.length === 1 ? "Creation" : "Creations"} Published
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] p-12 text-center text-gray-400 relative overflow-hidden backdrop-blur-md">
            <span className="text-4xl block mb-3">✨</span>
            <p className="text-base font-bold text-white mb-1">No Public Creations Yet</p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              @{profile.username} has not published any public stories, scripts, or collaborations yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 portfolio-creations-grid">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.01, y: -2 }}
                className="rounded-2xl bg-white/[0.03] backdrop-blur-lg border border-white/[0.08] p-5 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)] transition-all duration-300 relative overflow-hidden group portfolio-creation-card"
              >
                {/* Micro background gradient */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-500"></div>

                <div>
                  {/* Cover Image if present */}
                  {post.cover_url && (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-white/10 relative">
                      <img
                        src={post.cover_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* ID & Stamp */}
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold mb-3 border-b border-white/5 pb-2">
                    <span className={`px-2 py-0.5 rounded border font-mono tracking-wider ${getPostTypeColor(post)}`}>
                      {getScriptId(post)}
                    </span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>

                  {/* Title & Logline */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition duration-300 flex items-center gap-2">
                    <span className="text-base">{getPostTypeIcon(post)}</span>
                    {post.title}
                  </h3>

                  {/* Content / Paywall Lock */}
                  {post.is_premium ? (
                    <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 px-3 py-2.5 mb-4">
                      <span className="text-lg shrink-0">🔒</span>
                      <div>
                        <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">Premium Content Locked</p>
                        <p className="text-[9px] text-gray-400 leading-relaxed">Download the WryClip app to unlock this creation.</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-4 mb-4 pr-1">
                      {post.content || "No synopsis or detail content provided."}
                    </p>
                  )}
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* Script Metadata (Only render if it is a script and has metadata) */}
                  {(post.script_budget || post.script_episodes || post.script_language || post.script_status) && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.script_budget && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-300 flex items-center gap-1">
                          💰 Budget: {post.script_budget}
                        </span>
                      )}
                      {post.script_episodes && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-300 flex items-center gap-1">
                          🎬 {post.script_episodes}
                        </span>
                      )}
                      {post.script_language && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-300 flex items-center gap-1">
                          🗣️ {post.script_language}
                        </span>
                      )}
                      {post.script_status && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-300 flex items-center gap-1">
                          ⚡ {post.script_status}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Monetized Badge (is_premium post) */}
                  {post.is_premium && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full border text-[9px] font-bold flex items-center gap-1 bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.15)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        💎 Monetized
                        {post.price && post.price > 0 && (
                          <span className="ml-1 text-amber-200 font-extrabold">· ₹{post.price}</span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Category Badge (For stories/collabs/vlogs) */}
                  {post.post_type !== "script" && post.category && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-purple-300 flex items-center gap-1">
                        📁 Category: {post.category}
                      </span>
                    </div>
                  )}

                  {/* Verified Original Work Stamp & Read Screenplay Button */}
                  <div className="flex justify-between items-center pt-2.5 border-t border-white/5 mt-1">
                    <span className="text-[8px] tracking-wider text-cyan-400 font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Verified Original Work
                    </span>

                    <button
                      onClick={() => setActiveScript(post)}
                      className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-bold shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      Read {getPostTypeLabel(post)}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 4. Call to Action Banner (Glassmorphic) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden print-hidden portfolio-cta-banner"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center md:text-left flex-1">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20 shadow-sm">
            WryClip Ecosystem
          </span>
          <h3 className="text-lg md:text-xl font-bold mt-3 mb-2">
            Follow {profile.full_name} on the WryClip Mobile App
          </h3>
          <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
            Read complete drafts, unlock premium screenplays, request collaborations, or follow the writer for real-time updates. Scan or download the app today!
          </p>
        </div>

        {/* Download Badges (Beautiful Styled SVGs) */}
        <div className="flex gap-3 shrink-0 flex-wrap justify-center">
          {/* iOS App Store Button */}
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert("Coming soon! iOS build is currently under App Store review.");
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black hover:bg-black/80 border border-white/10 hover:border-purple-500/30 transition shadow-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
            </svg>
            <div className="text-left">
              <span className="block text-[8px] uppercase tracking-wide text-gray-400">Download on the</span>
              <span className="block text-[11px] font-bold text-white leading-tight">App Store</span>
            </div>
          </a>

          {/* Google Play Store Button */}
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert("Coming soon! Android build is currently under Play Store review.");
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black hover:bg-black/80 border border-white/10 hover:border-cyan-500/30 transition shadow-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3.25c-.02.04-.05.08-.05.13v17.24c0 .05.03.09.05.13L14.81 12 5 3.25zM15.75 11.2l-2.47-2.22L5.8 4.05c-.32-.23-.62-.25-.86-.06l10.81 9.61v-2.4zM5.8 19.95l7.48-4.93 2.47-2.22v-2.4L5 20.01c.24.19.54.17.8-.06zM16.56 12.87l3.8-2.19c.73-.42.73-1.09 0-1.51l-3.8-2.19L14.28 12l2.28.87z" />
            </svg>
            <div className="text-left">
              <span className="block text-[8px] uppercase tracking-wide text-gray-400">Get it on</span>
              <span className="block text-[11px] font-bold text-white leading-tight">Google Play</span>
            </div>
          </a>
        </div>
      </motion.div>

      {/* 5. Read Screenplay Modal (AnimatePresence Glass Card) */}
      <AnimatePresence>
        {activeScript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md print-hidden"
            onClick={() => setActiveScript(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl rounded-3xl bg-white/[0.04] border border-white/[0.1] shadow-2xl p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-4 relative z-10">
                <div>
                  <div className="flex gap-2 items-center text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">
                    <span>{getScriptId(activeScript)}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    <span>{formatDate(activeScript.created_at)}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug flex items-center gap-2">
                    <span className="text-lg">{getPostTypeIcon(activeScript)}</span>
                    {activeScript.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveScript(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="relative z-10">
                <div className="bg-black/35 rounded-2xl border border-white/5 p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                      {getPostTypeLabel(activeScript)} Content
                    </span>
                    {!activeScript.is_premium && (
                      <button
                        onClick={() => handleCopyText(activeScript.content || "", activeScript.id)}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        {copiedScriptId === activeScript.id ? "✓ Copied!" : "📋 Copy"}
                      </button>
                    )}
                  </div>

                  {activeScript.is_premium ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl shadow-[0_0_24px_rgba(251,191,36,0.15)]">
                        🔒
                      </div>
                      <div>
                        <p className="text-sm font-bold text-amber-300 mb-1">Premium Content</p>
                        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                          This is a monetized creation. Download the WryClip app to unlock and read the full content.
                        </p>
                        {activeScript.price && activeScript.price > 0 && (
                          <p className="mt-2 text-xs font-extrabold text-amber-200">Unlock for ₹{activeScript.price}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap font-sans text-sm text-gray-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                      {activeScript.content || "No script detail content is provided."}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer / Download Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-white/5 text-[10px] text-gray-400 relative z-10">
                <span className="flex items-center gap-1 text-cyan-400 font-bold uppercase tracking-wider">
                  🛡️ WryClip Original IP
                </span>
                <span className="text-center sm:text-right">
                  Upgrade to Writer Pro on the mobile app to read full drafts and dialogues
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
