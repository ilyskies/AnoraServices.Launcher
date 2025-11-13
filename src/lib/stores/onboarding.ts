import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type OnboardingStep = "terms" | "username" | "complete";

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  username: string | null;

  setStep: (step: OnboardingStep) => void;
  completeStep: (step: OnboardingStep) => void;
  setUsername: (username: string) => void;
  resetOnboarding: () => void;
  isStepCompleted: (step: OnboardingStep) => boolean;
  getProgress: () => number;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: "terms",
      completedSteps: [],
      username: null,

      setStep: (step) => {
        set({ currentStep: step });
      },

      completeStep: (step) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(step)) {
          set({
            completedSteps: [...completedSteps, step],
            currentStep: step,
          });
        }
      },

      setUsername: (username) => {
        set({ username });
      },

      resetOnboarding: () => {
        set({
          currentStep: "terms",
          completedSteps: [],
          username: null,
        });
      },

      isStepCompleted: (step) => {
        return get().completedSteps.includes(step);
      },

      getProgress: () => {
        const { completedSteps } = get();
        const totalSteps = 3;
        return (completedSteps.length / totalSteps) * 100;
      },
    }),
    {
      name: "anora-onboarding",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export const useOnboarding = () => {
  const store = useOnboardingStore();

  return {
    currentStep: store.currentStep,
    completedSteps: store.completedSteps,
    username: store.username,
    progress: store.getProgress(),

    setStep: store.setStep,
    completeStep: store.completeStep,
    setUsername: store.setUsername,
    resetOnboarding: store.resetOnboarding,
    isStepCompleted: store.isStepCompleted,
  };
};
