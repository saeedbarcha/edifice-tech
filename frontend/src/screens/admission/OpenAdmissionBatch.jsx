// import { Container, Card, Button, Badge, Table } from "react-bootstrap";
// import Message from "./../../components/Message";
// import Loader from "./../../components/Loader";
// import {
//   useDeleteAdmissionBatchMutation,
// } from "./../../slices/admissionBatchApiSlice";

// import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
// import { toast } from "react-toastify";

// const OpenAdmissionBatch = () => {

//   const {
//     data: admissionBatch,
//     isLoading,
//     error,
//   } = useGetRecentAdmissionBatchQuery();
//   const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
//     useDeleteAdmissionBatchMutation();

//     console.log("addddddd,,,,,,,,", admissionBatch)

//   const deleteHandler = async () => {
//     if (
//       window.confirm("Are you sure you want to delete this admission batch?")
//     ) {
//       try {
//         const res = await deleteAdmissionBatch();
//         if (res && res.error) {
//           toast.error(
//             res.error.data.message || "Failed to delete admission batch"
//           );
//         } else {
//           toast.success("Admission Batch deleted");
//         }
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
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
//               <Badge
//                 bg={admissionBatch?.certificate ? "success" : "danger"}
//               >
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

//                   </tr>
//                 </thead>
//                 <tbody>
//                   {admissionBatch?.courses?.map((course) => (
//                     <tr key={course?.courseId}>
//                       <td>{course?.courseId?.title}</td>

//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default OpenAdmissionBatch;

import React, { useState, useEffect } from "react";
import { Container, Card, Button, Badge, Table } from "react-bootstrap";
import Message from "./../../components/Message";
import Loader from "./../../components/Loader";
import {
  useDeleteAdmissionBatchMutation,
  useUpdateAdmissionBatchToEnrollMutation,
} from "./../../slices/admissionBatchApiSlice";
import { useGetRecentAdmissionBatchQuery } from "./../../slices/admissionBatchApiSlice";
import { toast } from "react-toastify";

const OpenAdmissionBatch = () => {
  const [admissionBatchId, setAdmissionBatchId] = useState(null);


  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetRecentAdmissionBatchQuery();
  const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
    useDeleteAdmissionBatchMutation();
  const [enrollCourse, { isLoading: loadingEnroll }] =
    useUpdateAdmissionBatchToEnrollMutation(); // Assuming you have a mutation for enrolling in a course

  const [enrollmentError, setEnrollmentError] = useState(null);
console.log("lllllllllll", admissionBatch)
  useEffect(() => {
    if (admissionBatch) {
      setAdmissionBatchId(admissionBatch._id);
    }
  }, [admissionBatch]);

  // console.log("lllllllllladmissionBatch._id", admissionBatch._id);
  const handleEnrollCourse = async (courseId) => {
    try {
      const dummyData = {
        // Replace with any dummy data you want to send
        admissionBatchId: admissionBatchId,
        courseId: courseId,
        userId: "dummyUserId",
      };
  
      // Simulate enrolling in the course by calling the enrollCourse mutation with the dummy data
      const res = await enrollCourse(dummyData);

      if (res && res.error) {
        setEnrollmentError(
          res.error.data.message || "Failed to enroll in course"
        );
      } else {
        toast.success("Enrolled in course successfully");
        // Optionally, you can refetch the data after enrollment
        // Refetch data here if needed
      }
    } catch (err) {
      setEnrollmentError(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">{admissionBatch?.title}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.data || error?.error}
        </Message>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title className="mb-4">{admissionBatch?.title}</Card.Title>
            <Card.Text>
              <strong>Start Date:</strong> {admissionBatch?.startDate}
            </Card.Text>
            <Card.Text>
              <strong>End Date:</strong> {admissionBatch?.endDate}
            </Card.Text>
            <Card.Text>
              <strong>Last Date To Apply:</strong>{" "}
              {admissionBatch?.lastDateToApply}
            </Card.Text>
            <Card.Text>
              <strong>Certificate Available:</strong>{" "}
              <Badge bg={admissionBatch?.certificate ? "success" : "danger"}>
                {admissionBatch?.certificate ? "Yes" : "No"}
              </Badge>
            </Card.Text>
            <Card.Text>
              <strong>Active:</strong>{" "}
              <Badge bg={admissionBatch?.isActive ? "success" : "danger"}>
                {admissionBatch?.isActive ? "Yes" : "No"}
              </Badge>
            </Card.Text>
            <div className="mb-4">
              <h5>Courses</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionBatch?.courses?.map((course) => (
                    
                    <tr key={course?.courseId}>
                      <td>{course?.courseId?.title}</td>
                      <td>
                        {/* <Button
                          variant="primary"
                          disabled={loadingEnroll}
                          onClick={() => handleEnrollCourse(course?.courseId)}
                        >
                          {loadingEnroll ? "Enrolling..." : "Enroll"}
                        </Button> */}

                        <Button
                          variant="primary"
                          disabled={loadingEnroll}
                          onClick={() => handleEnrollCourse(course?.courseId?._id)} // Pass courseId here
                        >
                          {loadingEnroll ? "Enrolling..." : "Enroll"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {enrollmentError && (
              <Message variant="danger">{enrollmentError}</Message>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default OpenAdmissionBatch;
