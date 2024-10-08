import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Rating from "../../components/rating/Rating.jsx";
import { useGetActiveCoursesQuery } from "../../slices/courseApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { LiaCertificateSolid } from "react-icons/lia";
import "./Course.css";

const CourseScreen = () => {
  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const {
    data: responseData,
    isLoading,
    error,
  } = useGetActiveCoursesQuery({ pageNumber: page });


  const cardVariants = {
    hidden: { opacity: 0.6, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };
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
              {responseData?.activeCourses?.length === 0 &&
                <p>No any active course found</p>}
              {responseData?.activeCourses?.map((course, index) => (
                <Col sm={6} lg={3} className="mt-4" key={index}>
                  <Link to={`/course/${course._id}`} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                    >
                      <Card className="my-3 p-2 pt-4  showCourcesCard">
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
                    </motion.div>
                  </Link>
                </Col>
              ))}

              {responseData?.activeCourses?.length > 0 &&
                <Link to={`/course/page/${1}`} style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    <Button className="btn-sm my-3 btnSeeMore px-3 m-auto">
                      See More
                    </Button>
                  </motion.div>
                </Link>
              }
            </Row>


          </Container>
        </section>
      )
      }
    </React.Fragment >
  );
};

export default CourseScreen;

