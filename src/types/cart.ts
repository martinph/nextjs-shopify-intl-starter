export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  description?: string;
}

export type Cart = {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}
