export type ReceiptReaction = "👍" | "🔥" | "💀" | "😍" | "🤔" | "💰";

export type Receipt = {
  author: string;
  avatar: string;
  id: string;
  productId: string;
  rating: number;
  reactions: Array<{ emoji: ReceiptReaction; count: number }>;
  text: string;
  verified: boolean;
};
