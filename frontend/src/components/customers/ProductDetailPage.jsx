import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../admin/ProductManagement/ProductContext";
import { CartContext } from "./CartContext";
import CartPage from "./CartPage";

function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useContext(ProductContext);
  const { cartItems, addToCart, removeFromCart, clearCart, totalPrice, increaseQty, decreaseQty } =
    useContext(CartContext);

  const product = products.find((p) => p._id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
  {product.images && product.images.length > 0 ? (
    product.images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`${product.name} ${index + 1}`}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
    ))
  ) : (
    <p>No image available</p>
  )}
</div>
<h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> Rs. {product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>

     <CartPage/>
     </div>
  );
}

export default React.memo(ProductDetail);
