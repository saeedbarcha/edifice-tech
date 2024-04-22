// import React, { useState, useEffect } from "react";
// import { Container, Card, Button, Badge, Table } from "react-bootstrap";
// import Message from "./../../components/Message";
// import Loader from "./../../components/Loader";
// import {
//   useDeleteAdmissionBatchMutation,
//   useUpdateAdmissionBatchToEnrollMutation,
// } from "./../../slices/admissionBatchApiSlice";
// import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
// import { toast } from "react-toastify";

// const OpenAdmissionBatch = () => {
//   const [admissionBatchId, setAdmissionBatchId] = useState(null);


//   const {
//     data: admissionBatch,
//     isLoading,
//     error,
//   } = useGetRecentAdmissionBatchQuery();
//   const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
//     useDeleteAdmissionBatchMutation();
//   const [enrollCourse, { isLoading: loadingEnroll }] =
//     useUpdateAdmissionBatchToEnrollMutation(); 

//   const [enrollmentError, setEnrollmentError] = useState(null);
// console.log("lllllllllll", admissionBatch)
//   useEffect(() => {
//     if (admissionBatch) {
//       setAdmissionBatchId(admissionBatch._id);
//     }
//   }, [admissionBatch]);

//   const handleEnrollCourse = async (courseId) => {
//     try {
//       const dummyData = {
//         admissionBatchId: admissionBatchId,
//         courseId: courseId,
//         userId: "dummyUserId",
//       };

//       const res = await enrollCourse(dummyData);

//       if (res && res.error) {
//         setEnrollmentError(
//           res.error.data.message || "Failed to enroll in course"
//         );
//       } else {
//         toast.success("Enrolled in course successfully");
//       }
//     } catch (err) {
//       setEnrollmentError(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <Container>
//       <h2 className="my-4">{admissionBatch?.title}</h2>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error?.data || error?.error}
//         </Message>
//       ) : (
//         <Card>
//           <Card.Body>
//             <Card.Title className="mb-4">{admissionBatch?.title}</Card.Title>
//             <Card.Text>
//               <strong>Start Date:</strong> {admissionBatch?.startDate}
//             </Card.Text>
//             <Card.Text>
//               <strong>End Date:</strong> {admissionBatch?.endDate}
//             </Card.Text>
//             <Card.Text>
//               <strong>Last Date To Apply:</strong>{" "}
//               {admissionBatch?.lastDateToApply}
//             </Card.Text>
//             <Card.Text>
//               <strong>Certificate Available:</strong>{" "}
//               <Badge bg={admissionBatch?.certificate ? "success" : "danger"}>
//                 {admissionBatch?.certificate ? "Yes" : "No"}
//               </Badge>
//             </Card.Text>
//             <Card.Text>
//               <strong>Active:</strong>{" "}
//               <Badge bg={admissionBatch?.isActive ? "success" : "danger"}>
//                 {admissionBatch?.isActive ? "Yes" : "No"}
//               </Badge>
//             </Card.Text>
//             <div className="mb-4">
//               <h5>Courses</h5>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Course Title</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {admissionBatch?.courses?.map((course) => (

//                     <tr key={course?.courseId}>
//                       <td>{course?.courseId?.title}</td>
//                       <td>
//                         <Button
//                           variant="primary"
//                           disabled={loadingEnroll}
//                           onClick={() => handleEnrollCourse(course?.courseId?._id)}
//                         >
//                           {loadingEnroll ? "Enrolling..." : "Enroll"}
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//             {enrollmentError && (
//               <Message variant="danger">{enrollmentError}</Message>
//             )}
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default OpenAdmissionBatch;

















/////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Image, Button, Badge, Table } from "react-bootstrap";
import Message from "./../../components/Message";
import Loader from "./../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useUpdateAdmissionBatchToEnrollMutation,
} from "./../../slices/admissionBatchApiSlice";
import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
import { toast } from "react-toastify";
import "./style.css"

const OpenAdmissionBatch = () => {


  const [admissionBatchId, setAdmissionBatchId] = useState(null);


  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetRecentAdmissionBatchQuery();

  const [enrollCourse, { isLoading: loadingEnroll }] =
    useUpdateAdmissionBatchToEnrollMutation();

  const [enrollmentError, setEnrollmentError] = useState(null);
  useEffect(() => {
    if (admissionBatch) {
      setAdmissionBatchId(admissionBatch?._id);
    }
  }, [admissionBatch]);

  const handleEnrollCourse = async (courseId) => {
    try {
      const dummyData = {
        admissionBatchId: admissionBatchId,
        courseId: courseId,
        userId: "dummyUserId",
      };

      const res = await enrollCourse(dummyData);

      if (res && res.error) {
        setEnrollmentError(
          res.error.data.message || "Failed to enroll in course"
        );
      } else {
        toast.success("Enrolled in course successfully");
      }
    } catch (err) {
      setEnrollmentError(err?.data?.message || err.error);
    }
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
        <section className="admission-section">
          <Container>

            <Row className="align-items-center">

              <Col md={7}>
                <div className="section-title">
                  <h2>Admission</h2>
                  <p>Admission Open Now</p>
                  {/* <p>{admissionBatch?.title}</p> */}

                </div>
                <div className="heading-text">
                  {/* <p className="enroll-info">Enroll yourself today and start your journey towards success!</p> */}
                  <h1 className="admission-title">{admissionBatch?.title}</h1>

                </div>
                <Image src={admissionBatch?.image} alt="Course" fluid />
                activeadmissionbatch
                <LinkContainer to={`/activeadmissionbatch/${admissionBatch?._id}`}>
                  <Button className="btn-sm m-3">
                  Enroll Now
                  </Button>
                </LinkContainer>
              </Col>
              <Col md={5}>
                <Carousel className="course-carousel" interval={3000} indicators={false}>
                  {admissionBatch?.courses?.map((course) => (
                    <Carousel.Item key={course?.courseId}>
                      <div className="card">
                        <Image src={course?.courseId?.image} alt="Course" fluid />
                        <div className="card-body">
                          <h3>{course?.courseId?.title}</h3>
                          <div className="d-flex justify-content-center">
                            {course.isEnrolled ? (
                              <Button variant="primary" disabled>
                                Enrolled
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                className="enroll-button"
                                disabled={loadingEnroll}
                                onClick={() => handleEnrollCourse(course?.courseId?._id)}
                              >
                                {loadingEnroll ? "Enrolling..." : "Enroll"}
                              </Button>
                            )}
                          </div>
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
