import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Container, Card, Button, Badge, Table } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import UpdateEnrollmentModal from "./UpdateEnrollmentModal";
import { downloadCertificate } from '../../../common-functions/certificate.js';
import {
    useGetAllEnrolmentByAdminQuery,
} from "../../../slices/enrollmentApiSlice";


const EnrollmentList = () => {
    const [showGalleryModal, setShowGalleryModal] = useState(false);

    const handleCloseGalleryModal = () => setShowGalleryModal(false);

    const handleOpenGalleryModal = () => setShowGalleryModal(true);


    const {
        data: admissionBatches,
        isLoading,
        error,
    } = useGetAllEnrolmentByAdminQuery();


    console.log("admissionBatches...", admissionBatches)

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
                    <Link className="btn btn-light my-3" to="/admin/dashboard">
                        Go Back
                    </Link>
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
                                    <strong>Admission Fee:</strong>{" "}
                                    {admissionB?.batch?.admissionFee}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Certificate Available:</strong>{" "}
                                    <Badge
                                        bg={admissionB?.batch?.certificate ? "success" : "danger"}
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
                                <h1>Track Enrollment record.</h1>
                                <Table hover responsive className="table-sm">
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
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {admissionB?.enrollments?.map((enrollment) => (
                                            <tr>
                                                <td>{enrollment?.courseId?.title}</td>
                                                <td>{enrollment?.courseId?.totalDuration}</td>
                                                <td>{enrollment?.firstName}</td>
                                                <td>{enrollment?.lastName}</td>
                                                <td>{enrollment?.fatherName}</td>

                                                <td>
                                                {enrollment?.courseId?.price} {enrollment?.courseFeePaid ? (
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

                                                <td> <UpdateEnrollmentModal
                                                    show={showGalleryModal}
                                                    handleClose={handleCloseGalleryModal}
                                                    updateEnrollUser={enrollment}
                                                />
                                                    <Button
                                                        variant="light"
                                                        className="btn-sm"
                                                        onClick={() => {
                                                            handleOpenGalleryModal(true);
                                                        }}>
                                                        <FaEdit />
                                                    </Button></td>

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





