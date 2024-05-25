import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useGetActiveBlogsQuery } from "../../slices/blogApiSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { formatDateWithTime } from '../../common-functions/formatDate.js';


function AllBlogsScreen() {
  const { data, isLoading, error } = useGetActiveBlogsQuery();
  console.log("blog data", data);


  return (
    <section id="gallery" className="gallery">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>Blogs</h2>
          <p>Check our Blogs</p>
        </div>
        <Row>
          <Col>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error?.error}
              </Message>
            ) : (
              <Row md={12}>
                {data?.length === 0 &&
                <p>No any blog found</p>}
                {data.map((blog) => (
                  <Col md={6} lg={4} className="d-flex mb-4">
                    <Link
                      to={`/blogs/${blog._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card key={blog.id} className="mb-8">
                        <Card.Img
                          variant="top"
                          style={{minWidth:"258px", height: "200px" }}
                          src={blog.image}
                        />
                        <Card.Body>
                          <Card.Title>{blog.title}</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                            {formatDateWithTime(blog.createdAt)}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col xs={12} md={3}>
            <Card>
              <Card.Body>
                <Card.Title>3Beez Recent Blogs Posts </Card.Title>
                <hr />
                <Card.Text>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate amet ullam excepturi odio impedit saepe nemo
                  repellendus, aut suscipit voluptas omnis quas quisquam
                  accusamus illo laboriosam rerum, totam ea eaque.
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Our YouTube Chennal</Card.Title>
                <hr />
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/ZEyAs3NWH4A"
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default AllBlogsScreen;