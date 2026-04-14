export type StashItem = {
  color: string;
  id: string;
  image: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  size: string;
};

export type StashState = {
  hydrated: boolean;
  items: StashItem[];
};
