"use client";

import { useState, useEffect } from "react";
import { Users, Heart } from "lucide-react";

export function WelcomeHeader({ username }: { username: string }) {
  const [showPlayers, setShowPlayers] = useState(true);
  const [playersOnline, setPlayersOnline] = useState(5);
  const [friendsOnline, setFriendsOnline] = useState(3);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlayers((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();

      if (rand > 0.6) {
        const isPlayerChange = Math.random() > 0.5;
        const isIncrease = Math.random() > 0.4;

        if (isPlayerChange) {
          setPlayersOnline((prev) => Math.max(0, prev + (isIncrease ? 1 : -1)));
        } else {
          setFriendsOnline((prev) => Math.max(0, prev + (isIncrease ? 1 : -1)));
        }

        setAnimate(true);
        setTimeout(() => setAnimate(false), 600);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold text-primary">
          Welcome back, <span className="text-accent">{username}</span>. Ready
          to play?
        </h2>
        <div className="text-accent text-lg mt-2 h-7 relative overflow-hidden flex items-center gap-2">
          <div className="relative w-5 h-5 flex-shrink-0">
            <Users
              className={`absolute inset-0 transition-all duration-500 ${
                showPlayers
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-90"
              }`}
            />
            <Heart
              className={`absolute inset-0 transition-all duration-500 ${
                !showPlayers
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 rotate-90"
              }`}
            />
          </div>

          <div
            className="absolute left-7 transition-all duration-500 ease-in-out"
            style={{
              transform: showPlayers ? "translateY(0)" : "translateY(-100%)",
              opacity: showPlayers ? 1 : 0,
            }}
          >
            <span
              className={`inline-block font-semibold transition-transform duration-300 ${
                animate && showPlayers ? "scale-125" : "scale-100"
              }`}
            >
              {playersOnline}
            </span>{" "}
            {playersOnline == 1 ? "player" : "players"} online
          </div>
          <div
            className="absolute left-7 transition-all duration-500 ease-in-out"
            style={{
              transform: showPlayers ? "translateY(100%)" : "translateY(0)",
              opacity: showPlayers ? 0 : 1,
            }}
          >
            <span
              className={`inline-block font-semibold transition-transform duration-300 ${
                animate && !showPlayers ? "scale-125" : "scale-100"
              }`}
            >
              {friendsOnline}
            </span>{" "}
            {friendsOnline == 1 ? "friend" : "friends"} online
          </div>
        </div>
      </div>
    </div>
  );
}
