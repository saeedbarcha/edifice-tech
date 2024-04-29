import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Card, Button, Badge } from "react-bootstrap";
import Message from "./../../components/Message";
import Loader from "./../../components/Loader";
import {
    useCreateEnrollmentMutation
} from "./../../slices/enrollmentApiSlice";
import { toast } from "react-toastify";
import {
    useGetAdmissionBatchDetailsQuery,
} from "./../../slices/admissionBatchApiSlice";


const EnrollAdmissionBatchScreen = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [gender, setGender] = useState("Male")
    const [admissionBatchId, setAdmissionBatchId] = useState(null);

    const navigate = useNavigate();

    const {
        data: admissionBatch,
        isLoading,
        error,
    } = useGetAdmissionBatchDetailsQuery(id);



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
                gender,
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
                            <strong>Admission Fee:</strong>{" "}
                            {admissionBatch?.admissionFee}
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
                            <Form.Group controlId="gender" className="my-2">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="my-4">
                                <Form.Label>Selected Courses</Form.Label>

                                {admissionBatch?.selectedCourses?.map((course, index) => {
                                    return (
                                        <Form.Check
                                            key={course?._id}
                                            type="checkbox"
                                            id={`course-checkbox-${course?.courseId?.title}`}
                                            label={course?.courseId?.title}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCourses([...courses, course?.courseId?._id]);
                                                } else {
                                                    setCourses(
                                                        courses.filter(
                                                            (sCourse) => sCourse !== course?.courseId?._id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    );
                                })}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="my-3 btnAllScreen"
                                    disabled={loadingEnroll}
                                >
                                    {loadingEnroll ? "Enrolling..." : "Enroll"}
                                </Button>
                            </Form.Group>
                        </Form>


                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default EnrollAdmissionBatchScreen;
