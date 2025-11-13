"use client";

import { useSocketStore } from "@/lib/socket";
import { useAuth } from "@/lib/stores/auth";
import { NotificationBanner } from "./notification_banner";

export const SocketBanner = () => {
  const { isConnected, isConnecting, connect, connectionError } =
    useSocketStore();
  const { isAuthenticated } = useAuth();

  const showBanner = isAuthenticated && !isConnected && !isConnecting;

  const handleRetry = () => {
    connect().catch(console.error);
  };

  if (!showBanner) return null;

  return (
    <NotificationBanner
      type={connectionError ? "error" : "warning"}
      title={connectionError ? "Connection Failed" : "Connection Issue"}
      message={connectionError || "Unable to connect to Anora services"}
      onDismiss={() => {}}
      action={{
        label: "Retry Connection",
        onClick: handleRetry,
      }}
      autoDismiss={false}
    />
  );
};
