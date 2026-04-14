import { Flame } from "lucide-react";

import { Badge } from "../ui/Badge";

export function HeatBadge({ score }: { score: number }) {
  return (
    <Badge tone="amber">
      <Flame className="size-3" />
      {score} Heat
    </Badge>
  );
}
