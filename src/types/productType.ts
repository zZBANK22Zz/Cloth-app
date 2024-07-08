export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    color: string[];
    sizes: string[];
    material: string;
    brand: string;
    inStock: boolean;
    imageUrl: string;
    imageUrls: string[];
    seller: User;
}

export type User = {
    email: string;
    name: string;
    imageURL: string;
}

export type createProductDTO = {
    name: string;
    category: string;
    description: string;
    price: number;
    color: string[];
    sizes: string[];
    imageUrl: string;
    imageUrls: string[];
}

export type UpdateProductDTO = Partial<createProductDTO>;