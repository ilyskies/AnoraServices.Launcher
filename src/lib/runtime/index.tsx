"use client";

import { useAuth } from "@/lib/stores/auth";
import { useConfig } from "@/lib/stores/config";
import { useSocketStore } from "@/lib/socket";
import { getVersion } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnoraUser } from "@/types/anora";
import { useErrorBanners } from "../stores/error_banner";

interface RuntimeProps {
  children: React.ReactNode;
}

const DISABLED_ROUTES = ["/updater", "/login"];

export const Runtime = ({ children }: RuntimeProps) => {
  const { token, isAuthenticated, updateUser } = useAuth();
  const { config, isDev } = useConfig();
  const { add } = useErrorBanners();
  const { initialize, connect, disconnect, isConnected, send } =
    useSocketStore();
  const [version, setVersion] = useState<string>("...");
  const pathname = usePathname();

  const shouldEnableSocket = !DISABLED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  useEffect(() => {
    const { on, off } = useSocketStore.getState();

    const handleSocketError = (errorData: {
      message: string;
      critical: boolean;
      type?: string;
    }) => {
      if (
        errorData.message.includes("unknown message") ||
        errorData.type === "unknown_message"
      ) {
        add({
          type: "warning",
          title: "Connection Issue",
          message:
            "There was a problem communicating with the server. Some features may not work correctly.",
          autoDismiss: false,
        });
      }
    };

    on("error", handleSocketError);

    return () => {
      off("error", handleSocketError);
    };
  }, [add]);

  useEffect(() => {
    if (isConnected && isAuthenticated) {
      send("request_user", undefined);
    }
  }, [isConnected, isAuthenticated, send]);

  useEffect(() => {
    const { on, off } = useSocketStore.getState();

    const handleUserData = (data: AnoraUser) => {
      if (data) {
        updateUser(data);
      }
    };

    on("user", handleUserData);

    return () => {
      off("user", handleUserData);
    };
  }, [updateUser]);

  useEffect(() => {
    if (!shouldEnableSocket || !isAuthenticated || !token) {
      disconnect();
      return;
    }

    const socketConfig = {
      url: `${config.wsEndpoint}?token=${btoa(token)}`,
      version: version,
      token: token,
      maxReconnectAttempts: 5,
      reconnectDelay: 2000,
    };

    initialize(socketConfig);
  }, [
    isAuthenticated,
    token,
    config,
    initialize,
    disconnect,
    version,
    shouldEnableSocket,
  ]);

  useEffect(() => {
    if (!shouldEnableSocket) {
      disconnect();
      return;
    }

    if (isAuthenticated && token) {
      connect().catch((error) => {
        if (isDev) {
          console.warn("[Runtime] Socket connection failed:", error);
        }
      });
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, token, connect, disconnect, isDev, shouldEnableSocket]);

  return <>{children}</>;
};

export default Runtime;
