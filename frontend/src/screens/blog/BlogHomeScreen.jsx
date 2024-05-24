import React from "react";
import { useGetActiveBlogsQuery } from "../../slices/blogApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  Container,
  Row,
  Col,
  CardImg,
  CardTitle,
} from "react-bootstrap";
import "./blogHomeScreen.css";
import { formatDateWithTime } from '../../common-functions/formatDate.js';

const BlogHomeScreen = () => {
  const { data, isLoading, error } = useGetActiveBlogsQuery();

  function getFiveHunderedCharacters(inputString) {
    if (inputString?.length <= 300) {
      return inputString + "...";
    } else {
      return inputString?.slice(0, 300) + "...";
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <section id="gallery" className="gallery">
          <Container data-aos="fade-up">
            <div className="section-title">
              <h2>Blogs</h2>
              <p>Check our Blogs</p>
            </div>
            <Row md={12}>
              <Row
                className="mx-auto text-secondary"
                style={{ maxWidth: "700px", top: "-80px" }}
              >
                <Col>
                  <CardTitle as="h2" className="blogTitleHome">
                    {data[data?.length - 1]?.title}
                  </CardTitle>
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "198px" }}
                    >
                      <img
                        src={data[data?.length - 1]?.user?.image}
                        style={{ width: "50px", marginRight: "20px" }}
                      />
                      <small className="ml-2">
                        <a
                          href="#"
                          className="d-block "
                          style={{ textDecoration: "none" }}
                        >
                          {data[data?.length - 1]?.user?.name}
                        </a>
                        <small className="text-muted">{data[data?.length - 1]?.user?.email}</small>
                      </small>
                    </div>
                  </div>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  alt="Card image cap"
                  className="blodImgHome"
                  style={{ minWidth: "50%", height: "auto", maxWidth: "900px" }}
                  src={data[data?.length - 1]?.image}
                />
              </div>

              <Row
                className="mx-auto text-secondary"
                style={{ maxWidth: "700px", top: "-80px" }}
              >
                <Col>
                  <p className="my-2" style={{ lineHeight: "2" }}>
                    {data[data?.length - 1]?.content}
                  </p>
                </Col>
                <small className="text-muted text-end">
                  {formatDateWithTime(data[data?.length - 1]?.updatedAt)}
                </small>
              </Row>
            </Row>
           
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};
export default BlogHomeScreen;