import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        indigo: "0 0 40px rgba(108, 63, 255, 0.3)",
        cyan: "0 0 30px rgba(0, 212, 255, 0.25)",
      },
      maxWidth: {
        shell: "1400px",
      },
    },
  },
};

export default config;
