export type ThemeMode = "dark" | "light" | "system";

export type CloutTier = "Bronze" | "Silver" | "Gold";

export type PingSettings = {
  claimUpdates: boolean;
  heatAlerts: boolean;
  marketing: boolean;
  receiptResponses: boolean;
  stealsAlerts: boolean;
};

export type UserPreferences = {
  density: "compact" | "default";
  emailPings: boolean;
  examMode: boolean;
  pingSettings: PingSettings;
  pushPings: boolean;
  theme: ThemeMode;
};

export type UserProfile = {
  campus: string;
  clout: number;
  email: string;
  firstName: string;
  semester: string;
  tier: CloutTier;
};
