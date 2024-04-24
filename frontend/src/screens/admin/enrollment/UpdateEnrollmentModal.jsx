import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateGalleryItemMutation } from "../../../slices/galleryApiSlice";

const UpdateEnrollmentModal = ({ show, handleClose, updateEnrollUser}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [performance, setPerformance] = useState("Average");
  const [issueCertificate, setIssueCertificate] = useState(false);

  const [updateEnrollment, { isLoading: loadingUpdate }] =
    useUpdateGalleryItemMutation();

  useEffect(() => {
    if (updateEnrollUser) {
      setFirstName(updateEnrollUser.firstName || "");
      setLastName(updateEnrollUser.lastName || "");
      setFatherName(updateEnrollUser.fatherName || "");
      setPerformance(updateEnrollUser.performance || "Average");
      setIssueCertificate(updateEnrollUser.issueCertificate || false);
    }
  }, [updateEnrollUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateEnrollmentData = {
      firstName,
      lastName,
      fatherName,
      performance,
      issueCertificate,
    };

    console.log("updateEnrollmentData.........", updateEnrollmentData)
    const result = await updateEnrollment(updateEnrollmentData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Gallery entry updated successfully");
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
            <Form.Check
              type="checkbox"
              id="issueCertificateCheckbox"
              label={
                <span onClick={() => setIssueCertificate(!issueCertificate)}>
                  Issue Certificate
                </span>
              }
              checked={issueCertificate}
              onChange={(e) => setIssueCertificate(e.target.checked)}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEnrollmentModal;
