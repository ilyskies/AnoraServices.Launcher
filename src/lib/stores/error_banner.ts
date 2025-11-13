import { create } from "zustand";

export type ErrorType = "error" | "warning" | "info" | "success";

interface ErrorBanner {
  id: string;
  type: ErrorType;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoDismiss?: boolean;
  dismissAfter?: number;
}

interface ErrorBannerStore {
  banners: ErrorBanner[];

  add: (banner: Omit<ErrorBanner, "id">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useErrorBannerStore = create<ErrorBannerStore>((set) => ({
  banners: [],

  add: (banner) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      banners: [...state.banners, { ...banner, id }],
    }));
  },

  remove: (id) => {
    set((state) => ({
      banners: state.banners.filter((banner) => banner.id !== id),
    }));
  },

  clear: () => {
    set({ banners: [] });
  },
}));

export const useErrorBanners = () => {
  const store = useErrorBannerStore();

  return {
    banners: store.banners,
    add: store.add,
    remove: store.remove,
    clear: store.clear,
  };
};
