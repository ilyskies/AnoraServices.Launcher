"use client";

import { useState } from "react";
import { Settings, Trash, Lock, Play, FolderOpen } from "lucide-react";
import Image from "next/image";
import { useBuildStore } from "@/lib/stores/builds";

interface LibraryItemProps {
  title: string;
  version: string;
  image?: string;
  id: string;
  season?: string;
  size?: string;
  supported?: boolean;
  dateAdded?: string;
}

export function LibraryItem({
  title,
  version,
  image,
  id,
  season,
  size,
  supported = true,
  dateAdded,
}: LibraryItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeBuild, setSelectedBuild } = useBuildStore();

  const handlePlay = () => {
    if (!supported) return;
    setSelectedBuild(id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      removeBuild(id);
    } catch (error) {
      console.error("Failed to delete build:", error);
    } finally {
      setIsDeleting(false);
      setIsMenuOpen(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group relative cursor-pointer aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)]">
      <div className="absolute inset-0">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-1">{season || "S?"}</div>
              <div className="text-xs opacity-80">No Image</div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {!supported && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-not-allowed">
          <Lock className="h-12 w-12 text-gray-400" />
        </div>
      )}

      <div className="absolute right-3 top-3 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110"
        >
          <Settings className="h-5 w-5 text-white transition-transform duration-300" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#1a1d24] shadow-2xl ring-1 ring-black animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs text-zinc-400 space-y-1 cursor-default">
                <div className="flex items-center justify-between">
                  <span>Size:</span>
                  <span className="font-mono">{size || "Unknown"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Added:</span>
                  <span>{formatDate(dateAdded)}</span>
                </div>
              </div>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex cursor-pointer w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isDeleting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                ) : (
                  <Trash className="h-4 w-4 transition-transform duration-300" />
                )}
                {isDeleting ? "Deleting..." : "Delete Build"}
              </button>
            </div>
          </div>
        )}
      </div>

      {supported && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 cursor-pointer"
        >
          <div className="bg-black/60 rounded-full p-4 border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-black/70">
            <Play className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white leading-tight truncate">
              {title}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-400 truncate">
              {version}
            </p>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10 cursor-pointer animate-in fade-in-0 duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
