export type ClaimStatus =
  | "Prepping"
  | "Dispatched"
  | "En Route"
  | "Landed"
  | "Bounced"
  | "Pulled";

export type DispatchEvent = {
  at: string;
  label: string;
  note: string;
};

export type Claim = {
  eta: string;
  id: string;
  items: number;
  placedAt?: string;
  status: ClaimStatus;
  total: number;
  tracking: DispatchEvent[];
};
