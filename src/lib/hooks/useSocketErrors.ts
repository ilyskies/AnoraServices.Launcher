import { useEffect } from "react";
import { useSocketStore } from "@/lib/socket";
import { useErrorBanners } from "../stores/error_banner";

export const useSocketErrors = () => {
  const { add } = useErrorBanners();

  useEffect(() => {
    const { on, off } = useSocketStore.getState();

    const handleSocketError = (errorData: {
      message: string;
      critical: boolean;
      type?: string;
    }) => {
      const errorMap = {
        "unknown message": {
          type: "warning" as const,
          title: "Connection Issue",
          message:
            "There was a problem communicating with the server. Some features may not work correctly.",
        },
        "authentication failed": {
          type: "error" as const,
          title: "Authentication Failed",
          message: "Your session has expired. Please log in again.",
        },
        "connection lost": {
          type: "error" as const,
          title: "Connection Lost",
          message: "Lost connection to the server. Attempting to reconnect...",
        },
        "rate limited": {
          type: "warning" as const,
          title: "Rate Limited",
          message: "You're sending too many requests. Please slow down.",
        },
      };

      const lowerMessage = errorData.message.toLowerCase();
      const matchedError = Object.entries(errorMap).find(([key]) =>
        lowerMessage.includes(key)
      );

      if (matchedError) {
        const [, errorConfig] = matchedError;
        add({
          ...errorConfig,
          autoDismiss: !errorData.critical,
          dismissAfter: errorData.critical ? undefined : 5000,
        });
      } else {
        add({
          type: errorData.critical ? "error" : "warning",
          title: "Connection Error",
          message: errorData.message,
          autoDismiss: !errorData.critical,
          dismissAfter: errorData.critical ? undefined : 5000,
        });
      }
    };

    on("error", handleSocketError);

    return () => {
      off("error", handleSocketError);
    };
  }, [add]);
};
