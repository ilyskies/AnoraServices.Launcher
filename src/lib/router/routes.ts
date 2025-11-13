import Login from "@/app/routes/login";
import Home from "@/app/routes/home";
import { Route } from "@/types/router";
import AppLayout from "@/components/layout/layout";
import TermsView from "@/app/routes/views/onboarding/terms";
import UsernameView from "@/app/routes/views/onboarding/username";
import OnboardingCompleteView from "@/app/routes/views/onboarding/complete";

export const routes: Route[] = [
  {
    path: "/login",
    component: Login,
    layout: AppLayout,
    meta: { title: "Login" },
  },
  {
    path: "/home",
    component: Home,
    layout: AppLayout,
    meta: { title: "Home" },
  },

  // Onboarding
  {
    path: "/onboarding/terms",
    component: TermsView,
    layout: AppLayout,
    meta: { title: "Terms of Service" },
  },
  {
    path: "/onboarding/username",
    component: UsernameView,
    layout: AppLayout,
    meta: { title: "Choose Username" },
  },
  {
    path: "/onboarding/complete",
    component: OnboardingCompleteView,
    layout: AppLayout,
    meta: { title: "Onboarding Complete" },
  },
];
