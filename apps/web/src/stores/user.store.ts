"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ThemeMode, UserPreferences, UserProfile } from "@/types/user";

type UserStore = {
  profile: UserProfile;
  preferences: UserPreferences;
  setDensity: (density: UserPreferences["density"]) => void;
  setCampus: (campus: string) => void;
  setExamMode: (value: boolean) => void;
  setPingPreference: (
    key: keyof UserPreferences["pingSettings"],
    value: boolean,
  ) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleEmailPings: () => void;
  togglePushPings: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: {
        campus: "NYU",
        clout: 1240,
        email: "ari@ayco.store",
        firstName: "Ari",
        semester: "Spring Sprint",
        tier: "Silver",
      },
      preferences: {
        density: "default",
        emailPings: true,
        examMode: false,
        pingSettings: {
          claimUpdates: true,
          heatAlerts: false,
          marketing: false,
          receiptResponses: true,
          stealsAlerts: true,
        },
        pushPings: true,
        theme: "system",
      },
      setDensity: (density) =>
        set((state) => ({
          preferences: { ...state.preferences, density },
        })),
      setCampus: (campus) =>
        set((state) => ({
          profile: { ...state.profile, campus },
        })),
      setExamMode: (value) =>
        set((state) => ({
          preferences: { ...state.preferences, examMode: value },
        })),
      setPingPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            pingSettings: {
              ...state.preferences.pingSettings,
              [key]: value,
            },
          },
        })),
      setTheme: (theme) =>
        set((state) => ({
          preferences: { ...state.preferences, theme },
        })),
      toggleEmailPings: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            emailPings: !state.preferences.emailPings,
          },
        })),
      togglePushPings: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            pushPings: !state.preferences.pushPings,
          },
        })),
    }),
    {
      name: "ayco-user",
    },
  ),
);
