import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../../components/rating/Rating.jsx";
import { useGetActiveCoursesQuery } from "../../slices/courseApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { FaHeart } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import "./Course.css";

const CourseScreen = () => {
  const {
    data: allActiveCourses,
    isLoading,
    error,
  } = useGetActiveCoursesQuery();

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.data || error?.error}
        </Message>
      ) : (
        <section id="contact" className="contact">
          <Container>
            <div className="section-title">
              <h2>Courses</h2>
              <p>CHECK OUR COURSES</p>
            </div>
            <Row className="wrapper">
              {allActiveCourses?.map((course, index) => (
                <Col sm={6} lg={3} className="mt-4" key={index}>
                  <Link to={`/course/${course._id}`} style={{ textDecoration: "none" }}>
                  <Card className="my-3 p-2 pt-4 rounded showCourcesCard">
                    <div className="image-container">

                      <Card.Img src={course?.image} fluid variant="top" className="course-image" />

                    </div>
                    <Card.Body>
                      <Card.Title as="div" className="titleCources">
                        <strong>{course?.title}</strong>
                      </Card.Title>
                      <Card.Title as="div" className="skillAndDuration">
                        <strong><span style={{ fontSize: "14px" }}>Skills: </span>{course?.skillSet}</strong>
                        <br />
                        <strong><span style={{ fontSize: "14px" }}>Duration: </span>{course?.totalDuration}</strong>
                      </Card.Title>
                      <Card.Text as="div" className="my-2">
                        <Rating value={course?.rating} text={`${course?.numReviews} reviews`} />
                      </Card.Text>
                      <Card.Text as="h4" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: "18px" }}>PKR:</span> {course?.price}
                        </div>
                        <div className="certificate-icon">
                          <LiaCertificateSolid style={{ width: "40px", height: "40px" }} />
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                </Col>
              ))}
          </Row>
        </Container>
        </section>
  )
}
    </React.Fragment >
  );
};

export default CourseScreen;
