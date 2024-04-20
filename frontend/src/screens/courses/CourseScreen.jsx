import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Course.css";
import { Link } from "react-router-dom";
import { useGetActiveCoursesQuery } from "../../slices/courseApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";

const CourseScreen = () => {
  const { data: allActiveCourses, isLoading, error } = useGetActiveCoursesQuery();
  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>

      ) : (
        <section id="contact" className="contact">
          <Container>
            <div className="section-title">
              <h2>Courses</h2>
              <p>CHECK OUR COURSES</p>
            </div>
            <Row className="wrapper">
              {allActiveCourses?.map((course, index) => {
                return (
                  <Col sm={6} lg={4} className="mt-4" key={index}>
                    <Link
                      to={`/course/${course._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="showCourcesCard">
                        <p className="discountPara">{course?.discount}% <sup>0ff</sup></p>
                        <h4 className="titleCources">{course?.title}</h4>
                        <p className="serviceHeading">{course?.skillSet}</p>
                        <p className="serviceHeading">Duration: {course?.totalDuration}</p>
                        <h4 className="titleCources">Price: {course?.price}</h4>     
                        <p className="certificateCont">certificate {course?.certificate}</p>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};
export default CourseScreen;
