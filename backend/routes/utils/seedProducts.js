
const products = [
  // === MEN: JACKETS ===
  {
    name: "Men's Classic Leather Jacket",
    description: "Premium genuine leather jacket with quilted inner lining for all-day comfort.",
    price: 11999,
    category: "jackets",
    gender: "Male",
    size: ["M", "L", "XL"],
    color: ["Black", "Brown"],
    images: [
      "https://images.unsplash.com/photo-1593032457862-7b2a3a65f1dc?w=600",
      "https://images.unsplash.com/photo-1617551296722-4ed58a642d5a?w=600",
    ],
    stock: 12,
    rating: { average: 4.7, count: 58 },
    isFeatured: true,
  },
  {
    name: "Men's Denim Jacket",
    description: "Blue washed denim jacket with button closure and vintage look.",
    price: 7499,
    category: "jackets",
    gender: "Male",
    size: ["S", "M", "L", "XL"],
    color: ["Blue"],
    images: [
      "https://images.unsplash.com/photo-1520975918318-3b2c58b5e8ad?w=600",
    ],
    stock: 18,
    rating: { average: 4.5, count: 41 },
    isFeatured: false,
  },

  // === WOMEN: JACKETS ===
  {
    name: "Women's Long Winter Coat",
    description: "Elegant long coat with faux-fur collar and full-sleeve warmth.",
    price: 13999,
    category: "jackets",
    gender: "Female",
    size: ["S", "M", "L"],
    color: ["Beige", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1600180758890-6ff20b6b35a3?w=600",
    ],
    stock: 10,
    rating: { average: 4.8, count: 32 },
    isFeatured: true,
  },
  {
    name: "Women's Cropped Denim Jacket",
    description: "Trendy cropped denim jacket perfect for spring outfits.",
    price: 5999,
    category: "jackets",
    gender: "Female",
    size: ["S", "M", "L"],
    color: ["Light Blue"],
    images: [
      "https://images.unsplash.com/photo-1602810317173-d0ad6c7dce77?w=600",
    ],
    stock: 20,
    rating: { average: 4.4, count: 27 },
    isFeatured: false,
  },

  // === MEN: T-SHIRTS ===
  {
    name: "Men's Polo Shirt",
    description: "Casual polo shirt made of breathable cotton, ideal for everyday wear.",
    price: 2499,
    category: "t-shirts",
    gender: "Male",
    size: ["S", "M", "L", "XL"],
    color: ["Navy Blue", "White"],
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
    ],
    stock: 30,
    rating: { average: 4.6, count: 49 },
    isFeatured: false,
  },
  {
    name: "Men's Printed Graphic Tee",
    description: "Trendy oversized graphic tee made from 100% cotton.",
    price: 1999,
    category: "t-shirts",
    gender: "Male",
    size: ["M", "L", "XL"],
    color: ["Black", "White"],
    images: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=600",
    ],
    stock: 22,
    rating: { average: 4.5, count: 37 },
    isFeatured: true,
  },

  // === WOMEN: TOPS / T-SHIRTS ===
  {
    name: "Women's Floral Cotton Top",
    description: "Soft floral print top for summer casual looks.",
    price: 2299,
    category: "t-shirts",
    gender: "Female",
    size: ["S", "M", "L"],
    color: ["White", "Pink"],
    images: [
      "https://images.unsplash.com/photo-1520974735194-6a1c08f69a9e?w=600",
    ],
    stock: 25,
    rating: { average: 4.3, count: 21 },
    isFeatured: false,
  },
  {
    name: "Women's Ribbed Crop Tee",
    description: "Stylish ribbed crop t-shirt with stretch fabric and fitted shape.",
    price: 1899,
    category: "t-shirts",
    gender: "Female",
    size: ["S", "M"],
    color: ["Black", "White"],
    images: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=600",
    ],
    stock: 28,
    rating: { average: 4.6, count: 29 },
    isFeatured: true,
  },

  // === SHOES ===
  {
    name: "Men's Sports Sneakers",
    description: "Comfortable sneakers with lightweight sole for running and daily wear.",
    price: 6999,
    category: "shoes",
    gender: "Male",
    size: ["7", "8", "9", "10", "11"],
    color: ["White", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be0a3e27f0?w=600",
    ],
    stock: 26,
    rating: { average: 4.7, count: 54 },
    isFeatured: true,
  },
  {
    name: "Women's Casual Sneakers",
    description: "Comfortable canvas sneakers perfect for casual walks.",
    price: 5999,
    category: "shoes",
    gender: "Female",
    size: ["6", "7", "8", "9"],
    color: ["White", "Pink"],
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    ],
    stock: 18,
    rating: { average: 4.5, count: 23 },
    isFeatured: false,
  },

  // === CAPS ===
  {
    name: "Men's Baseball Cap",
    description: "Adjustable cotton cap with breathable mesh design.",
    price: 1299,
    category: "caps",
    gender: "Male",
    size: ["Free Size"],
    color: ["Black", "Navy Blue"],
    images: [
      "https://images.unsplash.com/photo-1621361365424-06f0e3b720d6?w=600",
    ],
    stock: 50,
    rating: { average: 4.4, count: 17 },
    isFeatured: false,
  },
  {
    name: "Women's Summer Cap",
    description: "Lightweight sun-protective cap with adjustable strap.",
    price: 999,
    category: "caps",
    gender: "Female",
    size: ["Free Size"],
    color: ["Beige", "White"],
    images: [
      "https://images.unsplash.com/photo-1618354691318-15d3f94f0b50?w=600",
    ],
    stock: 35,
    rating: { average: 4.2, count: 14 },
    isFeatured: false,
  },

];

module.exports =products;
