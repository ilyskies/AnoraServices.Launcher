import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LauncherConfig {
  wsEndpoint: string;
  environment: "development" | "production";
}

const defaultConfig: LauncherConfig = {
  wsEndpoint: process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000",

  environment:
    (process.env.NEXT_PUBLIC_ENV as "development" | "production") ||
    "production",
};

interface ConfigState {
  config: LauncherConfig;

  updateConfig: (updates: Partial<LauncherConfig>) => void;
  resetToDefaults: () => void;

  isDev: boolean;
  isProduction: boolean;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,

      updateConfig: (updates) => {
        set((state) => ({
          config: {
            ...state.config,
            ...updates,
          },
        }));
      },

      resetToDefaults: () => {
        set({ config: defaultConfig });
      },

      get isDev() {
        return get().config.environment === "development";
      },

      get isProduction() {
        return get().config.environment === "production";
      },
    }),
    {
      name: "anora-config",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        config: state.config,
      }),
      version: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            config: {
              ...defaultConfig,
              ...persistedState.config,
            },
          };
        }
        return persistedState;
      },
    }
  )
);

export const useConfig = () => {
  const store = useConfigStore();

  return {
    config: store.config,
    isDev: store.isDev,
    isProduction: store.isProduction,

    setConfig: store.updateConfig,
    resetConfig: store.resetToDefaults,
  };
};
