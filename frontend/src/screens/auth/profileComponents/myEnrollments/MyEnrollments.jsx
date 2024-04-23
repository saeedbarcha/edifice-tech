import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Form, Carousel, Card, Image, Button, Badge, Table } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import {
    useUpdateAdmissionBatchToEnrollMutation,
} from "../../../../slices/admissionBatchApiSlice";
import {
    useCreateEnrollmentMutation
} from "../../../../slices/enrollmentApiSlice"
import { toast } from "react-toastify";
import {
    useGetAdmissionBatchDetailsQuery,
} from "../../../../slices/admissionBatchApiSlice";
import {
    useGetMyEnrolmentsQuery,
} from "../../../../slices/enrollmentApiSlice";

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

export default MyEnrollments;








