import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import Rating from "../../components/rating/Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";
import { useGetCourseDetailsQuery } from "../../slices/courseApiSlice";
const CourseDetails = () => {
  const { id: courseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: course,
    isLoading,
    refetch,
    error,
  } = useGetCourseDetailsQuery(courseId);


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
            <Meta title={course.name} />
            <Row>
              <Col md={5}>
                <Image
                  src={course.image}
                  alt={course.name}
                  style={{ with: "100%" }}
                  fluid
                />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{course.name}</h3>
                  </ListGroup.Item>

                  {/* <ListGroup.Item>
                  <Rating
                    value={course.rating}
                    text={`${course.numReviews} reviews`}
                  />
                </ListGroup.Item> */}

                  <ListGroup.Item>
                    <h1>{course.title}</h1>
                    <h4>{course.skillSet}</h4>
                    <p>{course.preRequisites}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{course.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>hours In Day:</Col>
                        <Col>
                          <strong>{course.hoursInDay}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Days In Week:</Col>
                        <Col>
                          <strong>{course.daysInWeek}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total Duration:</Col>
                        <Col>
                          <strong>{course.totalDuration}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {course.isActive ? "Active" : "Not available"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {course.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Form.Control
                            as="select"
                            // value={qty}
                            // onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(course.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {" "}
                                {x + 1}{" "}
                              </option>
                            ))}
                          </Form.Control>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block btnAllScreen"
                        type="button"
                        disabled={course.countInStock === 0}
                        // onClick={addToCartHandler}
                      >
                        Enroll now
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className="my-4">
              <h5>{course.description}</h5>
            </Row>
            <Row className="review my-5">
              <Col md={6}>
                <h2>Reviews</h2>
                {/* {course.reviews.length === 0 && <Message>No Reviews</Message>} */}

                <ListGroup variant="flush">
                  {/* {course.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p style={{fontSize:"12px"}}>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}

                  <ListGroup.Item>
                    {/* <h3>Write a Customer Review</h3> */}

                    {/* {loadingProductReview && <Loader />} */}

                    {/* {userInfo ? (
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
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )} */}
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

export default CourseDetails;
