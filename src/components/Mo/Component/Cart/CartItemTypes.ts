export interface CartItemType {
  brand: string;
  title: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  specialPrice: string;
  originalPrice?: string;
  soldout: boolean;
  version?: number;
  couponApplied?: boolean;
  notifications?: string[];
  tags?: string[];
  tooltip?: {
    text: string;
    description: string;
  };
}