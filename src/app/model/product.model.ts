export interface Product {
  products: {
    id: number;
    title: string;
    handle: string;
    images: {
      id: number;
      src: string;
      position: number;
    };
    variants: {
      id: string;
      title: string;
      option1: string;
      option2: string;
      price: number;
    };
  };
}
