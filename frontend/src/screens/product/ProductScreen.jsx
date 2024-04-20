import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../../components/rating/Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../slices/productApiSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>

        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md={5}>
                <Image
                  src={product.image}
                  alt={product.name}
                  style={{ with: "100%" }}
                  fluid
                />
              </Col>
              <Col md={7}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name} </h3>
                    <a href={product.url}>{product.url} </a>
                  </ListGroup.Item>


                  <ListGroup.Item>
                    Description:${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <Row className="review my-5">
              <Col md={6}>
                <h2>Reviews</h2>
                {/* {product.reviews.length === 0 && <Message>No Reviews</Message>} */}

                <ListGroup variant="flush">
                  {/* {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p style={{fontSize:"12px"}}>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}

                  <ListGroup.Item>
                    <h3>Write a Customer Review</h3>

                    {loadingProductReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-2">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="4">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment" className="my-2">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
