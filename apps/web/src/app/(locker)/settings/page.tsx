"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/cn";
import { CAMPUSES } from "@/lib/constants";
import { useUserStore } from "@/stores/user.store";

export default function SettingsPage() {
  const campus = useUserStore((state) => state.profile.campus);
  const setCampus = useUserStore((state) => state.setCampus);
  const preferences = useUserStore((state) => state.preferences);
  const setPingPreference = useUserStore((state) => state.setPingPreference);
  const setTheme = useUserStore((state) => state.setTheme);
  const setExamMode = useUserStore((state) => state.setExamMode);
  const themes = [
    { icon: Moon, label: "Dark", value: "dark" },
    { icon: Sun, label: "Light", value: "light" },
    { icon: Monitor, label: "System", value: "system" },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="section-heading">
        <p className="eyebrow">Settings</p>
        <h1 className="font-[var(--font-heading)] text-[var(--text-h1)] font-bold">
          Tune the Locker to your life.
        </h1>
      </div>

      <section className="glass-panel space-y-5 rounded-[var(--radius-xl)] p-6">
        <div>
          <h2 className="font-[var(--font-heading)] text-2xl font-bold">
            Campus
          </h2>
          <p className="text-sm text-[var(--ayco-text-secondary)]">
            We use this for Campus Heat and sharper Picks.
          </p>
        </div>
        <select
          className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3"
          onChange={(event) => setCampus(event.target.value)}
          value={campus}
        >
          {CAMPUSES.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </section>

      <section className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-6">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold">
          Appearance
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {themes.map((theme) => {
            const Icon = theme.icon;

            return (
              <button
                className={cn(
                  "rounded-[var(--radius-lg)] border px-4 py-4 text-left transition",
                  preferences.theme === theme.value
                    ? "border-[var(--ayco-brand-indigo)] bg-[var(--ayco-brand-indigo-muted)]"
                    : "border-white/10 bg-white/5",
                )}
                key={theme.value}
                onClick={() => setTheme(theme.value)}
                type="button"
              >
                <Icon className="mb-3 size-5" />
                <p className="font-medium">{theme.label}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-6">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold">
          Study Mode
        </h2>
        <Toggle
          checked={preferences.examMode}
          description="When active, we rerank Picks around study supplies, focus gear, and lock-in essentials."
          label="Exam Mode"
          onCheckedChange={setExamMode}
        />
      </section>

      <section className="glass-panel space-y-4 rounded-[var(--radius-xl)] p-6">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold">
          Ping Settings
        </h2>
        <Toggle
          checked={preferences.pingSettings.claimUpdates}
          description="Dispatched, En Route, Landed, and Bounce updates."
          label="Claim Updates"
          onCheckedChange={(checked) =>
            setPingPreference("claimUpdates", checked)
          }
        />
        <Toggle
          checked={preferences.pingSettings.stealsAlerts}
          description="Fresh daily Steals and time-sensitive budget drops."
          label="Steals Alerts"
          onCheckedChange={(checked) =>
            setPingPreference("stealsAlerts", checked)
          }
        />
        <Toggle
          checked={preferences.pingSettings.heatAlerts}
          description="When something starts popping off on your campus."
          label="Heat Alerts"
          onCheckedChange={(checked) =>
            setPingPreference("heatAlerts", checked)
          }
        />
        <Toggle
          checked={preferences.pingSettings.receiptResponses}
          description="Reactions and responses on your Receipts."
          label="Receipt Responses"
          onCheckedChange={(checked) =>
            setPingPreference("receiptResponses", checked)
          }
        />
        <Toggle
          checked={preferences.pingSettings.marketing}
          description="New features, promos, and insider drops."
          label="Marketing"
          onCheckedChange={(checked) => setPingPreference("marketing", checked)}
        />
      </section>
    </div>
  );
}
