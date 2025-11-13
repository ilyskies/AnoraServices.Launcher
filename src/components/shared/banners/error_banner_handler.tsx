"use client";

import { useEffect } from "react";
import { useSocketStore } from "@/lib/socket";
import { useErrorBanners } from "@/lib/stores/error_banner";

export const ErrorBannerHandler = () => {
  const { add } = useErrorBanners();

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
          title: "Unknown Message",
          message:
            "The server received an unexpected message. This might be a version compatibility issue.",
          autoDismiss: true,
          dismissAfter: 5000,
        });
      }
    };

    on("error", handleSocketError);

    return () => {
      off("error", handleSocketError);
    };
  }, [add]);

  return null;
};
