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
  const downloadTxtFile = (enrollment) => {
    // const doc = new jsPDF('landscape', 'in', 'letter');
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [20, 10],
    });
    doc.addImage(certificateImage, "PNG", 0, 0, 20, 11);
    // Add first text block
    const firstText = `${enrollment.firstName} ${enrollment.lastName}`;
    doc.setFont("Noto Serif");
    doc.setFontSize(77);
    const firstTextWidth =
      (doc.getStringUnitWidth(firstText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const firstTextX = (19.5 - firstTextWidth) / 2;
    const firstTextY = 5.1;
    doc.text(firstText, firstTextX, firstTextY);
    // Add second text block
    const secondText = `For her great achievements and being the Outstanding Sales Manager to the company Larana, Inc.for the month of May 2022`;
    doc.setFont("Noto Serif");
    doc.setFontSize(30);
    doc.setFillColor(255, 255, 255); // Set fill color to pink (255, 25, 205)
    const secondTextWidth =
      (doc.internal.pageSize.getWidth() * 35.7) / doc.internal.scaleFactor;
    const secondTextX = (26.3 - firstTextWidth) / 2;
    const secondTextY = 6;
    doc.text(secondText, secondTextX, secondTextY, {
      align: "center",
      maxWidth: secondTextWidth,
    });
    // Save the PDF
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
                  <strong>Certificate Available:</strong>{" "}
                  <Badge bg={admissionB?.certificate ? "success" : "danger"}>
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
                      <th>COURSE TITLE</th>
                      <th>TOTAL DURATION</th>
                      <th>COURSE FEE</th>
                      <th>PERFORMANCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissionB?.enrollments?.map((enrollment) => (
                      <tr>
                        {/* <td><Image src={blog.image} fluid style={{ width: "60px", height: "60px" }} /></td> */}
                        <td>{enrollment?.courseId?.title}</td>
                        <td>{enrollment?.courseId?.totalDuration}</td>
                        <td>
                          {enrollment?.courseFeePaid ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>{enrollment?.performance}</td>
                        <td>
                          <Button
                            className="btnAllScreen  m-1"
                            onClick={() => {
                              downloadTxtFile(enrollment);
                            }}
                          >
                            Generate certificate
                          </Button>
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