import React from "react";
import { Container, Row, Col, Card, Carousel, Image, Button } from "react-bootstrap";
import Message from "./../../components/Message";
import Rating from "../../components/rating/Rating.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "./../../components/Loader";
import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
import { formatDate } from '../../common-functions/formatDate.js';
import { LiaCertificateSolid } from "react-icons/lia";
import "./style.css"
const OpenAdmissionBatch = () => {
  const navigate = useNavigate();


  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetRecentAdmissionBatchQuery();

  const enrollHandler = (id) => {
    navigate(`/login?redirect=/activeadmissionbatch/${id}`)

  }

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
                {admissionBatch == undefined ? <p>No any active Admission batch found</p> : (
                  <div>
                    <div className="heading-text">
                      <h1 className="admission-title my-3">{admissionBatch?.title}</h1>
                    </div>
                    <h5 className="">Last Date to Apply: {formatDate(admissionBatch?.lastDateToApply)}</h5>

                    <Button className="btn-sm my-3 btnAllScreen" onClick={() => enrollHandler(admissionBatch?._id)}>
                      Enroll Now
                    </Button>
                  </div>

                )}
              </Col>
              <Col md={5}>
                {admissionBatch == !undefined &&
                <Carousel className="course-carousel" interval={3000} indicators={false}>
                  {admissionBatch?.selectedCourses?.map((course) => (
                    
                    <Carousel.Item key={course?.courseId} >

                      <Card className="m-auto" style={{ width: "75%" }}>
                        <div className="image-container">

                          <Card.Img src={course?.courseId?.image} fluid variant="top" className="course-image" />

                        </div>
                        <Card.Body>
                          <Card.Title as="div" className="titleCources">
                            <strong>{course?.courseId?.title}</strong>
                          </Card.Title>
                          <Card.Title as="div" className="skillAndDuration">
                            <strong><span style={{ fontSize: "14px" }}>Skills: </span>{course?.courseId?.skillSet}</strong>
                            <br />
                            <strong><span style={{ fontSize: "14px" }}>Duration: </span>{course?.courseId?.totalDuration}</strong>
                          </Card.Title>
                          <Card.Text as="div" className="my-2">
                            <Rating value={course?.courseId?.rating} text={`${course?.courseId?.numReviews} reviews`} />
                          </Card.Text>
                          <Card.Text as="h4" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <span style={{ fontSize: "18px" }}>PKR:</span> {course?.courseId?.price}
                            </div>
                            <div className="certificate-icon">
                              <LiaCertificateSolid style={{ width: "40px", height: "40px" }} />
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Carousel.Item>
                  ))}
                </Carousel>
                }
              </Col>
            </Row>
          </Container>
        </section>)}
    </React.Fragment>
  );
};
export default OpenAdmissionBatch;











