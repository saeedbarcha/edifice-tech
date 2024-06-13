import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateEnrollmentMutation } from "../../../slices/enrollmentApiSlice";

const UpdateEnrollmentModal = ({ show, handleClose, updateEnrollUser }) => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("Male")
  const [performance, setPerformance] = useState("Average");
  const [courseFeePaid, setCourseFeePaid] = useState(false)
  const [admissionFeePaid, setAdmissionFeePaid] = useState(false)
  const [issueCertificate, setIssueCertificate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [updateEnrollment, { isLoading: loadingUpdate }] =
    useUpdateEnrollmentMutation();

  useEffect(() => {
    if (updateEnrollUser) {
      setEnrollmentId(updateEnrollUser._id || "")
      setFirstName(updateEnrollUser.firstName || "");
      setLastName(updateEnrollUser.lastName || "");
      setFatherName(updateEnrollUser.fatherName || "");
      setGender(updateEnrollUser.gender || "Male")
      setPerformance(updateEnrollUser.performance || "Average");
      setAdmissionFeePaid(updateEnrollUser.admissionFeePaid || false);
      setCourseFeePaid(updateEnrollUser.courseFeePaid || false);
      setIssueCertificate(updateEnrollUser.issueCertificate || false);
      setCompleted(updateEnrollUser.completed || false)
    }
  }, [updateEnrollUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateEnrollmentData = {
      enrollmentId,
      firstName,
      lastName,
      fatherName,
      performance,
      gender,
      courseFeePaid,
      admissionFeePaid,
      issueCertificate,
      completed
    };

    const result = await updateEnrollment(updateEnrollmentData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.data.message);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Enrollment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstName" className="my-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="my-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fatherName" className="my-2">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter father's name"
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
          <Form.Group controlId="performance" className="my-2">
            <Form.Label>Performance</Form.Label>
            <Form.Control
              as="select"
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="issueCertificate" className="my-3">
            <label className="d-flex">
              <Form.Check
                type="checkbox"
                id="issueCertificateCheckbox"
                checked={issueCertificate}
                onChange={(e) => setIssueCertificate(e.target.checked)}
              />
              <span style={{ marginLeft: '8px' }}>Issue Certificate</span>
            </label>
          </Form.Group>
          <Form.Group controlId="admissionFeePaid" className="my-3">
            <label className="d-flex">
              <Form.Check
                type="checkbox"
                id="admissionFeePaid"
                checked={admissionFeePaid}
                onChange={(e) => setAdmissionFeePaid(e.target.checked)}
              />
              <span style={{ marginLeft: '8px' }}>Admission Fee Paid</span>
            </label>
          </Form.Group>
          <Form.Group controlId="courseFeePaid" className="my-3">
            <label className="d-flex">
              <Form.Check
                type="checkbox"
                id="courseFeePaid"
                checked={courseFeePaid}
                onChange={(e) => setCourseFeePaid(e.target.checked)}
              />
              <span style={{ marginLeft: '8px' }}>Course Fee Paid</span>
            </label>
          </Form.Group>
          <Form.Group controlId="completed" className="my-3">
            <label className="d-flex">
              <Form.Check
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <span style={{ marginLeft: '8px' }}>Course Completed</span>
            </label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="btn btnAllScreen" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEnrollmentModal;
