export interface Product {
    brand: string;
    title: string;
    image: string;
    originalPrice?: string;
    specialPrice: string;
    sale: string;
    tags?: string[];
    likes: number;
    colors: string;
    wished: boolean;
    soldout: boolean;
  }