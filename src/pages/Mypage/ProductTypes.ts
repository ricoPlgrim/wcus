// src/types.ts

export interface Product {
    checkboxId: string;
    status: string;
    link: string;
    imageSrc: string;
    brand: string;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: string;
    hasReturnOption: boolean;  // hasReturnOption을 사용하여 반품 기능을 제어
    reasonPopupId: string;
    reasonId: string;
    reasonText: string;
    isSelected: boolean;
  }
  
  export interface CartItem {
    selectAllId: string;
    products: Product[];
  }