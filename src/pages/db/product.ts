export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    color: string;
    sizes: string[];
    material: string;
    brand: string;
    inStock: boolean;
    imageUrl: string;
    tags: string[];
    shop: Shop;
  };
  
  export type Shop = {
    name: string;
    imageUrl: string;
  };
  
  
export const list: Product[] = [
    {
      id: "001",
      name: "Classic White T-Shirt",
      category: "T-Shirts",
      description: "A versatile white t-shirt made from 100% organic cotton.",
      price: 19.99,
      color: "White",
      sizes: ["XS", "S", "M", "L", "XL"],
      material: "100% Organic Cotton",
      brand: "EcoWear",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/254b702be6394f824aebb13e307af5bb579dbaf8_xxl-1.jpg",
      tags: ["casual", "basic", "summer"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "002",
      name: "Slim Fit Jeans",
      category: "Pants",
      description: "Comfortable slim fit jeans with a modern wash.",
      price: 59.99,
      color: "Blue",
      sizes: ["28", "30", "32", "34", "36"],
      material: "98% Cotton, 2% Elastane",
      brand: "DenimCo",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/e18a35ea330b02b4688768c03f194f6b8e53b6ef_xxl-1.jpg",
      tags: ["denim", "casual", "everyday"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "003",
      name: "Floral Summer Dress",
      category: "Dresses",
      description:
        "A light and breezy floral print dress perfect for summer days.",
      price: 45.99,
      color: "Multicolor",
      sizes: ["XS", "S", "M", "L"],
      material: "100% Viscose",
      brand: "SummerChic",
      inStock: false,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/be0c40fb194f20efd8f29cf1c0b121bb5018e2bf_xxl-1.jpg",
      tags: ["summer", "floral", "feminine"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "004",
      name: "Wool Blend Sweater",
      category: "Sweaters",
      description: "A warm and cozy wool blend sweater for colder days.",
      price: 79.99,
      color: "Navy",
      sizes: ["S", "M", "L", "XL"],
      material: "70% Wool, 30% Polyester",
      brand: "WarmEssentials",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/f03ce0bdd2e9c92fc749c287a429410a1714d5f0_xxl-1.jpg",
      tags: ["winter", "warm", "cozy"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "005",
      name: "Leather Jacket",
      category: "Outerwear",
      description: "A classic leather jacket with a modern twist.",
      price: 199.99,
      color: "Black",
      sizes: ["S", "M", "L", "XL"],
      material: "100% Genuine Leather",
      brand: "UrbanEdge",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/751480d60f1d943f4864bc11478f5d5600495697_xxl-1.jpg",
      tags: ["leather", "edgy", "autumn"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "001",
      name: "Classic White T-Shirt",
      category: "T-Shirts",
      description: "A versatile white t-shirt made from 100% organic cotton.",
      price: 19.99,
      color: "White",
      sizes: ["XS", "S", "M", "L", "XL"],
      material: "100% Organic Cotton",
      brand: "EcoWear",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/81513e9a3bc49606e2e27b16f879bd59bcc52e13_xxl-1.jpg",
      tags: ["casual", "basic", "summer"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "002",
      name: "Slim Fit Jeans",
      category: "Pants",
      description: "Comfortable slim fit jeans with a modern wash.",
      price: 59.99,
      color: "Blue",
      sizes: ["28", "30", "32", "34", "36"],
      material: "98% Cotton, 2% Elastane",
      brand: "DenimCo",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/15c114080d102a3571c7b5bc7dfd1298304419bd_xxl-1.jpg",
      tags: ["denim", "casual", "everyday"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "003",
      name: "Floral Summer Dress",
      category: "Dresses",
      description:
        "A light and breezy floral print dress perfect for summer days.",
      price: 45.99,
      color: "Multicolor",
      sizes: ["XS", "S", "M", "L"],
      material: "100% Viscose",
      brand: "SummerChic",
      inStock: false,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/235b63e67fafbdafc52d8356522627721b4b8181_xxl-1.jpg",
      tags: ["summer", "floral", "feminine"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "004",
      name: "Wool Blend Sweater",
      category: "Sweaters",
      description: "A warm and cozy wool blend sweater for colder days.",
      price: 79.99,
      color: "Navy",
      sizes: ["S", "M", "L", "XL"],
      material: "70% Wool, 30% Polyester",
      brand: "WarmEssentials",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/d2f1b5e18afde144b5c1473025adc89e512d1e71_xxl-1.jpg",
      tags: ["winter", "warm", "cozy"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
    {
      id: "005",
      name: "Leather Jacket",
      category: "Outerwear",
      description: "A classic leather jacket with a modern twist.",
      price: 199.99,
      color: "Black",
      sizes: ["S", "M", "L", "XL"],
      material: "100% Genuine Leather",
      brand: "UrbanEdge",
      inStock: true,
      imageUrl: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/medium/c468d129b60cb01705d61ed33716a0c3b021cf55_xxl-1.jpg",
      tags: ["leather", "edgy", "autumn"],
      shop: {
        name: "Shop",
        imageUrl: "/images/classic-white-tshirt.jpg",
      },
    },
  ];