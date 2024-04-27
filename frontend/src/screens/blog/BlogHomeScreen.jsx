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
                    {data[data?.length - 1]?.title}{" "}
                  </CardTitle>
                  <p className="my-2" style={{ lineHeight: "2" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </p>
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={data[data?.length - 1]?.user?.image}
                        style={{ width: "50px", marginRight: "15px" }}
                      />
                      <small className="ml-2">
                        <a
                          href="#"
                          className="d-block "
                          style={{ textDecoration: "none" }}
                        >
                          {data[data?.length - 1]?.user?.name}
                        </a>
                        <small className="text-muted">
                          {data[data?.length - 1]?.user?.email}
                        </small>
                      </small>

                    </div>
                  </div>
                </Col>
              </Row>
              <CardImg
                alt="Card image cap"
                className="blodImgHome"
                src={data[data?.length - 1]?.image}
                width="100%"
              />
              <Row
                className="mx-auto text-secondary"
                style={{ maxWidth: "700px", top: "-80px" }}
              >
                <Col>
                  <p className="my-2" style={{ lineHeight: "2" }}>
                    {getFiveHunderedCharacters(data[data?.length - 1]?.content)}
                  </p>
                  <br />
                  <br />
                  <h3 className="font-weight-bold text-dark">
                    #1.{data[data?.length - 1]?.title}{" "}
                  </h3>
                  <p className="my-2" style={{ lineHeight: "2" }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Obcaecati possimus veniam libero voluptas asperiores quia
                    impedit cum nihil voluptates exercitationem. Neque aut,
                    labore ipsam numquam doloremque unde eligendi rem velit!
                  </p>
                  <br />
                  <blockquote
                    className="text-primary p-3 font-italic"
                    style={{ borderLeft: "4px solid black", lineHeight: "2" }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Obcaecati possimus veniam libero voluptas asperiores quia
                    impedit cu
                  </blockquote>
                  <br />
                  <p className="my-2" style={{ lineHeight: "2" }}>
                    {getFiveHunderedCharacters(data[data?.length - 1]?.content)}
                  </p>
                </Col>
                <small className="text-muted">
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