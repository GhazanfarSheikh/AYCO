import { zoneSlugSchema } from "@ayco/contracts";
import { z } from "zod";

export const zoneSlugParamsSchema = z.object({
  slug: zoneSlugSchema,
});

export type ZoneSlugParamsDto = z.infer<typeof zoneSlugParamsSchema>;
