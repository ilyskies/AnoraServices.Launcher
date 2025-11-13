"use client";

import { useSocketErrors } from "@/lib/hooks/useSocketErrors";

export const GlobalSocketErrorHandler = () => {
  useSocketErrors();
  return null;
};
