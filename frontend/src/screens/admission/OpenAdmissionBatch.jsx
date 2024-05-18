import React from "react";
import { Container, Row, Col, Carousel, Image, Button } from "react-bootstrap";
import Message from "./../../components/Message";
import Loader from "./../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
import {formatDateWithTime } from '../../common-functions/formatDate.js';

import "./style.css"
const OpenAdmissionBatch = () => {
  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetRecentAdmissionBatchQuery();

  console.log("llllllllll.........", admissionBatch?.lastDateToApply)
  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.data || error?.error}
        </Message>
      ) : (
        <section className="admission-section ">
          <Container>
            <Row className="">
              <Col md={7}>
                <div className="section-title">
                  <h2>Admission</h2>
                  <p>Admission Open Now</p>
                </div>
                <div className="heading-text">
                <div className="section-batch">
                 
                </div>
                  {/* <p className="enroll-info">Enroll yourself today and start your journey towards success!</p> */}
                  <h1 className="admission-title my-3">{admissionBatch?.title}</h1>
                </div>
                <h5 className="">{formatDateWithTime(admissionBatch?.lastDateToApply)}</h5>

                <LinkContainer to={`/activeadmissionbatch/${admissionBatch?._id}`}>
                  <Button className="btn-sm my-3 btnAllScreen">
                    Enroll Now
                  </Button>
                </LinkContainer>
              </Col>
              <Col md={5}>
                <Carousel className="course-carousel" interval={3000} indicators={false}>
                  {admissionBatch?.selectedCourses?.map((course) => (
                    <Carousel.Item key={course?.courseId}>
                      <div className="card">
                        <Image src={course?.courseId?.image} alt="Course" fluid />
                        <div className="card-body">
                          <h3>{course?.courseId?.title}</h3>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </section>)}
    </React.Fragment>
  );
};
export default OpenAdmissionBatch;











