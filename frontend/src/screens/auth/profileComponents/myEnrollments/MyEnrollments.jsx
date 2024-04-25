import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Badge, Table } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import jsPDF from "jspdf";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { useGetMyEnrolmentsQuery } from "../../../../slices/enrollmentApiSlice";
import certificateImage from "./certificate.png";
const MyEnrollments = () => {
  const { id } = useParams();
  const {
    data: admissionBatches,
    isLoading,
    error,
  } = useGetMyEnrolmentsQuery(id);


  const downloadTxtFile = (admissionB, enrollment) => {

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [20, 10],
    });
    doc.addImage(admissionB.batch.image || certificateImage, "PNG", 0, 0, 20, 11);
    const firstText = `${enrollment?.firstName} ${enrollment?.lastName}`;
    doc.setFont("Noto Serif");
    doc.setFontSize(77);
    const firstTextWidth =
      (doc.getStringUnitWidth(firstText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const firstTextX = (19.5 - firstTextWidth) / 2;
    const firstTextY = 5.1;
    doc.text(firstText, firstTextX, firstTextY);
    const secondText = `For ${enrollment?.gender === "Male" ? "his" : "her"} great achievements and being the Outstanding Sales Manager ${admissionB.batch.startDate}  great achievements and being the Outstanding Sales Manager to the company Larana, Inc.for the month of May 2022`;
    doc.setFont("Noto Serif");
    doc.setFontSize(22);
    doc.setFillColor(255, 255, 255);
    const secondTextWidth =
      (doc.internal.pageSize.getWidth() * 35.7) / doc.internal.scaleFactor;
    const secondTextX = (26.3 - firstTextWidth) / 2;
    const secondTextY = 6;
    doc.text(secondText, secondTextX, secondTextY, {
      align: "center",
      maxWidth: secondTextWidth,
    });
    doc.save("certificate.pdf");
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
                              downloadTxtFile(admissionB, enrollment);
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