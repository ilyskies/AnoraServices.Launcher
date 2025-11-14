"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/navigation";
import { useNavigate } from "@/lib/hooks/useNavigate";
import { useAuth } from "@/lib/stores/auth";
import { useSocketErrors } from "@/lib/hooks/useSocketErrors";
import { SocketBanner } from "@/components/shared/banners/socket_banner";
import { ContentArea } from "@/components/layout/content-area";

export default function HomeView() {
  const [activeTab, setActiveTab] = useState<"home" | "library" | "settings">(
    "home"
  );
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  useSocketErrors();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SocketBanner />
      <div className="flex flex-1 overflow-hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <ContentArea activeTab={activeTab} user={user} />
      </div>
    </>
  );
}
