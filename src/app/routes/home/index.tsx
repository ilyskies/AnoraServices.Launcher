"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/navigation";
import { useNavigate } from "@/lib/hooks/useNavigate";
import { useAuth } from "@/lib/stores/auth";
import { useSocketErrors } from "@/lib/hooks/useSocketErrors";
import { SocketBanner } from "@/components/shared/banners/socket_banner";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState<"home" | "library" | "settings">(
    "home"
  );
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useSocketErrors();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SocketBanner />
      <div className="flex flex-1 overflow-hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-6"></main>
      </div>
    </>
  );
}
