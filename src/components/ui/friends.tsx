"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type FriendStatus = "online" | "away" | "offline";

interface Friend {
  name: string;
  status: FriendStatus;
  presence: string;
}

const mockFriends: Friend[] = [
  { name: "skies", status: "online", presence: "test" },
  { name: "skies", status: "online", presence: "test" },
  { name: "skies", status: "away", presence: "test" },
  { name: "skies", status: "offline", presence: "Offline" },
  { name: "skies", status: "offline", presence: "Offline" },
];

export function FriendsList() {
  const onlineFriends = mockFriends.filter((f) => f.status === "online");
  const awayFriends = mockFriends.filter((f) => f.status === "away");
  const offlineFriends = mockFriends.filter((f) => f.status === "offline");

  const statusColor: Record<FriendStatus, string> = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-500",
  };

  const renderFriendGroup = (friends: Friend[], label: string) => {
    if (friends.length === 0) return null;

    return (
      <motion.div
        key={label}
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-3 mb-2 select-none">
          {label} — {friends.length}
        </p>

        <div className="space-y-2">
          {friends.map((friend, index) => (
            <motion.div
              key={`${friend.name}-${index}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="relative flex-shrink-0">
                <Image
                  src="https://images-ext-1.discordapp.net/external/p5NQHE8NtLUwViEvwKMUaFOR3r9OGvWNDzUc7YI8NAU/%3Fsize%3D512/https/cdn.discordapp.com/avatars/1280623796352450643/cfca70f8334ef83eecae16002a2eafc3.png"
                  alt={`${friend.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                    statusColor[friend.status]
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {friend.name}
                </p>
                <p className="text-xs text-muted-foreground/70 truncate">
                  {friend.presence}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-muted/20 hover:scrollbar-thumb-muted/40 transition-colors">
        {renderFriendGroup(onlineFriends, "Online")}
        {renderFriendGroup(awayFriends, "Away")}
        {renderFriendGroup(offlineFriends, "Offline")}
      </div>
    </div>
  );
}
