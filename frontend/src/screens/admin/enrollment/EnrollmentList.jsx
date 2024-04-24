import React from "react";
import { useParams } from "react-router-dom";
import { Container, Card,Button, Badge, Table } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import jsPDF from "jspdf";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
    useGetMyEnrolmentsQuery,
} from "../../../slices/enrollmentApiSlice";

const EnrollmentList = () => {
    const { id } = useParams();

    const {
        data: admissionBatches,
        isLoading,
        error,
    } = useGetMyEnrolmentsQuery(id);

    let downloadTxtFile = (enrollment) => {
        console.log("res............", enrollment);
        var doc = new jsPDF('p', 'pt');
        const imgData = 'https://picsum.photos/800/600';
    
        doc.addImage(imgData, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    
        const titleText = 'This is the first title.';
        const patientInfo = `
            Patient Name: ${enrollment.courseId.title}\n
            Age :\n
            Gender :\n
            Illness :\n
            Status : ....
        `;
    
        // Calculate vertical position for text
        const titleVerticalPosition = 50;
        const patientInfoVerticalPosition = 100;
    
        // Add title text
        doc.text(titleText, doc.internal.pageSize.getWidth() / 2, titleVerticalPosition, { align: 'center' });
    
        // Add patient information
        doc.text(patientInfo, doc.internal.pageSize.getWidth() / 2, patientInfoVerticalPosition, { align: 'center' });
    
        // Save the PDF
        doc.save('demo.pdf');
    }
    


    return (
        <Container>
            <h1>sssssssssssssssssssss</h1>
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
                                <Card.Title className="mb-4">{admissionB?.batch?.title}</Card.Title>
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
                                    <Badge
                                        bg={admissionB?.certificate ? "success" : "danger"}
                                    >
                                        {admissionB?.batch?.certificate ? "Yes" : "No"}
                                    </Badge>
                                </Card.Text>
                                <Card.Text>
                                    <strong>Active:</strong>{" "}
                                    <Badge bg={admissionB?.batch?.isActive ? "success" : "danger"}>
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
                                            <tr >
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
                                                <td> {id ? <Button onClick={() => {downloadTxtFile(enrollment)}}>llllGenerate Report</Button> : <Button style={{ background: "#393a3f" }}>Generate Report</Button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )
                    )}

                </div>
            )}
        </Container>
    )
}

export default EnrollmentList;





