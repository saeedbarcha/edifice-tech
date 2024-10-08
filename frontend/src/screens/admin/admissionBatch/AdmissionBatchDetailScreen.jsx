import { useParams, useState } from "react-router-dom";
import { Container, Card, Button, Badge, Table } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  useGetAdmissionBatchDetailsQuery,
  useDeleteAdmissionBatchMutation,
} from "../../../slices/admissionBatchApiSlice";
import { toast } from "react-toastify";

const AdmissionBatchDetailScreen = () => {
  const { id } = useParams();

  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetAdmissionBatchDetailsQuery(id);
  const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
    useDeleteAdmissionBatchMutation();
  const deleteHandler = async () => {
    if (
      window.confirm("Are you sure you want to delete this admission batch?")
    ) {
      try {
        const res = await deleteAdmissionBatch(id);
        if (res && res.error) {
          toast.error(
            res.error.data.message || "Failed to delete admission batch"
          );
        } else {
          toast.success("Admission Batch deleted");
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.data || error?.error}
        </Message>
      ) : (
        <Card className="my-4">
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
              <Badge
                bg={admissionBatch?.certificate ? "success" : "danger"}
              >
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
                    <th>
                      Enrolled Users
                      <tr style={{ display: "flex" }}>
                        <th style={{ flex: 1 }}> Name </th>
                        <th style={{ flex: 1 }}> Course Status </th>
                        <th style={{ flex: 1 }}> Admission Fee </th>
                        <th style={{ flex: 1 }}> Course Fee </th>
                        <th style={{ flex: 1 }}>Performance</th>
                        <th style={{ flex: 1 }}>Action</th>

                      </tr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                 
                  {admissionBatch?.selectedCourses?.map((course) => (
                    <tr key={course?.courseId}>
                      <td>{course?.courseId?.title}</td>
                      <td>
                        <Table responsive>
                          <tbody>
                            {course?.enrolledUsers?.map((user) => (
                              <tr key={user?.user}>
                                <td>{user?.user}</td>
                                <td>{user?.completed?.toString()}</td>
                                <td>{user?.courseFeePaid?.toString()}</td>
                                <td>{user?.performance}</td>
                                <td>
                                  <button className="btn btn-primary">Update</button>
                                  <button  className="btn btn-danger">Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AdmissionBatchDetailScreen;
