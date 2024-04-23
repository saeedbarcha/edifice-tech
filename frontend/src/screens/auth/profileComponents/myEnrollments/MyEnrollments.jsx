import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Carousel, Card, Image, Button, Badge, Table } from "react-bootstrap";
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
    const [courses, setCourses] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [admissionBatchId, setAdmissionBatchId] = useState(null);

    const navigate = useNavigate();

    const {
        data: admissionBatch,
        isLoading,
        error,
    } = useGetMyEnrolmentsQuery(id);


    console.log("ssssssssssssssssss.........", admissionBatch)

    const [enrollCourse, { isLoading: loadingEnroll }] =
        useCreateEnrollmentMutation();

    useEffect(() => {
        if (admissionBatch) {
            setAdmissionBatchId(admissionBatch._id);
        }
    }, [admissionBatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const enrollUser = {
                admissionBatchId,
                firstName,
                lastName,
                fatherName,
                courses
            };
            const result = await enrollCourse(enrollUser);
            if (result.error) {
                toast.error(result.error.data.error);
            } else {
                toast.success(result.data.message);
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
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

                        <br />
                        <br />

                        <hr />
                        <br />

                        <Form onSubmit={submitHandler}>
                            <h1>Please submit this from to Enroll.</h1>
                            <br />
                            <p>Please submit your actual information below. This data will be used for your certificate.</p>

                            <Form.Group controlId="firstName" className="my-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="lastName" className="my-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="fatherName" className="my-3">
                                <Form.Label>Father Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Father Name"
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="my-4">
                                <Form.Label>Selected Courses</Form.Label>
                                {admissionBatch?.courses?.map((course, index) => {
                                    return (
                                        <Form.Check
                                            key={course?._id}
                                            type="checkbox"
                                            id={`course-checkbox-${course?.courseId?.title}`}
                                            label={course?.courseId?.title}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCourses([...courses, course?._id]);
                                                } else {
                                                    setCourses(
                                                        courses.filter(
                                                            (selectedCourse) => selectedCourse !== course?._id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    );
                                })}
                                {/* {course.isEnrolled ? (
                                    <Button variant="primary" disabled>
                                        Enrolled
                                    </Button>
                                ) : ( */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="my-3"
                                    disabled={loadingEnroll}
                                // onClick={() => handleEnrollCourse(course?.courseId?._id)}
                                >
                                    {loadingEnroll ? "Enrolling..." : "Enroll"}
                                </Button>
                                {/* )} */}
                            </Form.Group>
                        </Form>


                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default MyEnrollments;








