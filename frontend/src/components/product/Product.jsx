import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../rating/Rating";
import "./product.css"
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-2 pt-4 rounded">
      <Link to={`/product/${product?._id}`}>
        <div
          style={{
            width: "170px",
            height: "170px",
            margin: "auto",
          }}
        >
          <Card.Img src={product?.image} variant="top" style={{width:"170px", height: "170px",}}/>
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product?._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product?.name}</strong>
          </Card.Title>
        </Link>

         </Card.Body>
    </Card>
  );
};

export default Product;
