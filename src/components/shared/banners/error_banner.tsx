"use client";

import { useErrorBanners } from "@/lib/stores/error_banner";
import { NotificationBanner } from "./notification_banner";

export const ErrorBanner = () => {
  const { banners, remove } = useErrorBanners();

  if (banners.length === 0) return null;

  const latestBanner = banners[banners.length - 1];

  return (
    <NotificationBanner
      {...latestBanner}
      onDismiss={() => remove(latestBanner.id)}
    />
  );
};
