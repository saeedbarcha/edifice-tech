import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Badge, Table } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { useGetMyEnrolmentsQuery } from "../../../../slices/enrollmentApiSlice";
import { downloadCertificate } from '../../../../common/certificate.js';

const MyEnrollments = () => {
  const { id } = useParams();
  const {
    data: admissionBatches,
    isLoading,
    error,
  } = useGetMyEnrolmentsQuery(id);


  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.data || error?.error}
        </Message>
      ) : (
        <div>
          {admissionBatches?.admissionBatches.map((admissionB) => (
            <Card className="my-4">
              <Card.Body>
                <Card.Title className="mb-4">
                  {admissionB?.batch?.title}
                </Card.Title>
                <Card.Text>
                  <strong>Start Date:</strong> {admissionB?.batch?.startDate}
                </Card.Text>
                <Card.Text>
                  <strong>End Date:</strong> {admissionB?.batch?.endDate}
                </Card.Text>
                <Card.Text>
                  <strong>Last Date To Apply:</strong>{" "}
                  {admissionB?.batch?.lastDateToApply}
                </Card.Text>
                <Card.Text>
                  <strong>Admission Fee:</strong>{" "}
                  {admissionB?.batch?.admissionFee}
                </Card.Text>
                <Card.Text>
                  <strong>Certificate Available:</strong>{" "}
                  <Badge bg={admissionB?.batch?.certificate ? "success" : "danger"}>
                    {admissionB?.batch?.certificate ? "Yes" : "No"}
                  </Badge>
                </Card.Text>
                <Card.Text>
                  <strong>Active:</strong>{" "}
                  <Badge
                    bg={admissionB?.batch?.isActive ? "success" : "danger"}
                  >
                    {admissionB?.batch?.isActive ? "Yes" : "No"}
                  </Badge>
                </Card.Text>
                <br />
                <br />
                <hr />
                <br />
                <h1>Track your courses record.</h1>
                <Table striped hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Course Title</th>
                      <th>Total Duration</th>
                      <th>F-Name</th>
                      <th>L-Name</th>
                      <th>Father Name</th>
                      <th>Course Fee</th>
                      <th>Performance</th>
                      <th>Certificate</th>

                    </tr>
                  </thead>
                  <tbody>
                    {admissionB?.enrollments?.map((enrollment) => (
                      <tr>
                        <td>{enrollment?.courseId?.title}</td>
                        <td>{enrollment?.courseId?.totalDuration}</td>
                        <td>{enrollment?.firstName}</td>
                        <td>{enrollment?.lastName}</td>
                        <td>{enrollment?.firstName}</td>

                        <td>
                          {enrollment?.courseFeePaid ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>{enrollment?.performance}</td>
                        <td>{enrollment?.issueCertificate &&
                          <Button
                            className="btnAllScreen  m-1"
                            onClick={() => {
                              downloadCertificate(admissionB, enrollment);
                            }}
                          >
                            Download
                          </Button>
                        }

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};
export default MyEnrollments;