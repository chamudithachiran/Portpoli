'use client';

import React, { useEffect, useState } from 'react';
import {
  Database, PlayCircle, Layout, Clock, Globe, Cpu, Code2, Layers,
  Github, Loader2, RefreshCw, ExternalLink, Star, GitFork, Terminal, Box
} from 'lucide-react';

// ── Config ──────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'chamudithachiran';

// ── Types ───────────────────────────────────────────────────────────────────
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const getRepoIcon = (repo: GitHubRepo): React.ReactNode => {
  const name = repo.name.toLowerCase();
  const lang = (repo.language ?? '').toLowerCase();
  if (lang === 'python' || name.includes('ml') || name.includes('ai'))               return <Cpu size={24} />;
  if (lang === 'html' || lang === 'css' || name.includes('web') || name.includes('portfolio')) return <Globe size={24} />;
  if (name.includes('db') || name.includes('data'))                                   return <Database size={24} />;
  if (name.includes('api') || name.includes('server') || name.includes('backend'))   return <Terminal size={24} />;
  if (name.includes('video') || name.includes('stream'))                              return <PlayCircle size={24} />;
  if (name.includes('schedule') || name.includes('task') || name.includes('clock'))  return <Clock size={24} />;
  if (name.includes('ui') || name.includes('layout') || name.includes('dashboard'))  return <Layout size={24} />;
  if (lang === 'javascript' || lang === 'typescript')                                 return <Layers size={24} />;
  if (lang === 'java' || lang === 'kotlin')                                           return <Box size={24} />;
  return <Code2 size={24} />;
};

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
};

// ── Error State ──────────────────────────────────────────────────────────────
const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-5">
    <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
      <Github size={32} className="text-red-400/60" />
    </div>
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-1">Could not load GitHub repositories</p>
      <p className="text-gray-600 text-xs">Check your connection or GitHub API rate limit</p>
    </div>
    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-700
                 text-sm text-gray-400 hover:text-orange-400 hover:border-orange-500/50
                 transition-all duration-200"
    >
      <RefreshCw size={13} /> Retry
    </button>
    <a
      href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs text-gray-600 hover:text-orange-400 transition-colors"
    >
      <Github size={12} /> View on GitHub directly
    </a>
  </div>
);

// ── Main Section ─────────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    setError(false);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=18&type=public`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

      const data: GitHubRepo[] = await res.json();
      const filtered = data
        .filter((r) => !r.fork)
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .slice(0, 12);

      setRepos(filtered);
    } catch (err) {
      console.error('[ProjectsSection] Failed to fetch repos:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRepos(); }, []);

  return (
    <section className="min-h-screen text-white p-6 md:p-12 relative overflow-hidden">

      {/* Background Decorative Mesh/Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f97316" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">

        {/* Header Section */}
        <div className="mb-12 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">My Creations</p>
          <h2 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4">Projects</h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700
                       text-sm text-gray-400 hover:text-orange-400 hover:border-orange-500/50
                       transition-all duration-200"
          >
            <Github size={15} />
            github.com/{GITHUB_USERNAME}
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={30} className="text-orange-500 animate-spin" />
            <p className="text-gray-500 text-sm">Loading repositories…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && <ErrorState onRetry={fetchRepos} />}

        {/* ── Cards Grid — original card design ── */}
        {!loading && !error && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#1a1a1a] rounded-2xl border-2 border-orange-500/40 p-6
                             transition-all duration-300 hover:border-orange-500 hover:scale-[1.02]
                             hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] block"
                >
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon Container */}
                    <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-orange-500
                                    group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      {getRepoIcon(repo)}
                    </div>

                    {/* Date + external link icon */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-orange-400">
                        {formatDate(repo.updated_at)}
                      </span>
                      <ExternalLink
                        size={13}
                        className="text-gray-600 group-hover:text-orange-400 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-bold group-hover:text-orange-500 transition-colors truncate">
                      {repo.name}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {repo.description ?? 'No description provided.'}
                    </p>
                  </div>

                  {/* Language + stars + forks */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-neutral-800">
                    {repo.language && (
                      <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500/70" />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Star size={11} />{repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <GitFork size={11} />{repo.forks_count}
                      </span>
                    )}
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  </div>
                </a>
              ))}
            </div>

            {/* View all repositories */}
            <div className="mt-10 text-center">
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-orange-500/40
                           text-sm text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500
                           transition-all duration-200"
              >
                <Github size={15} />
                View all repositories
              </a>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm">No public repositories found.</div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;