import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  CardTitle,
  Col,
} from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { formatDateWithTime } from '../../common-functions/formatDate.js';
import { useGetBlogDetailsQuery } from "../../slices/blogApiSlice";

const BlogDetailsScreen = () => {
  const { id: blogId } = useParams();
  const {
    data: blog,
    isLoading,
    refetch,
    error,
  } = useGetBlogDetailsQuery(blogId);


  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.blog?.message || error?.error}
        </Message>
      ) : (
        <Container className="my-5">
          <Link className="btn btn-light my-3" to="/blogs">
            Go Back
          </Link>
          <Row md={12}>
            <Row
              className="mx-auto text-secondary"
              style={{ maxWidth: "700px", top: "-80px" }}
            >
              <Col>
                <CardTitle as="h2" className="blogTitleHome">
                  {blog.title}
                </CardTitle>
                <p className="my-2" style={{ lineHeight: "2" }}>
                  {blog.content}
                </p>
                <div className="my-3 d-flex align-items-center justify-content-between">
                  <div
                    className="d-flex align-items-center"
                    style={{ width: "198px" }}
                  >
                    <img
                      src={blog.user.image}
                      style={{ width: "50px", marginRight: "20px" }}
                    />
                    <small className="ml-2">
                      <a
                        href="#"
                        className="d-block "
                        style={{ textDecoration: "none" }}
                      >
                        {blog.user.name}
                      </a>
                      <small className="text-muted">{blog.user.email}</small>
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
            <img
              alt="Card image cap"
              className="blodImgHome"
              width="100%"
              src={blog.image}
            />
            <Row
              className="mx-auto text-secondary"
              style={{ maxWidth: "700px", top: "-80px" }}
            >
              <Col>
                <p className="my-2" style={{ lineHeight: "2" }}>
                  {blog.content}
                </p>
                <br />
                <br />
                <h3 className="font-weight-bold text-dark">#1. {blog.title}</h3>
                <p className="my-2" style={{ lineHeight: "2" }}>
                  {blog.content}
                </p>
                <br />
                <blockquote
                  className="text-primary p-3 font-italic"
                  style={{ borderLeft: "4px solid black", lineHeight: "2" }}
                >
                  {blog.content}
                </blockquote>
                <br />
                <p className="my-2" style={{ lineHeight: "2" }}>
                  {blog.content}
                </p>
              </Col>
              <small className="text-muted">
                {formatDateWithTime(blog.updatedAt)}
              </small>
            </Row>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};
export default BlogDetailsScreen;