import { Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { useGetProductsQuery } from "../../slices/productApiSlice";

const ListProductScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber });
 
  return (
    <Container className="mt-1 mb-4 pt-2">
    
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
        <Row className="">
           <h1 className="titleTopCategories text-center bold py-3" style={{color:"var(--mainBgColor)"}}>Our Product</h1>
      
            {data.products.map((product, i) => (
              <Col sm={12} md={6} xl={3} key={i}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="flex justify-content-center">
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </div>
        </>
      )}
    </Container>
  );
};

export default ListProductScreen;
