export type CartItem = {
  id: number;
  qty: number;
};

export type CartLine = {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
  lineTotal: number;
};
