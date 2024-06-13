import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateEducationMutation, useCreateEducationMutation} from "../../../../slices/educationApiSlice";
import { formatDateMothFormat } from '../../../../common-functions/formatDate.js';


const AddUpdateEduModal = ({ show, handleClose, editEducation, refetchAll }) => { 
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [date, setDate] = useState("");
  const [_id, setId] = useState("");

  const [createEducation, { isLoading: loadingCreate }] =
  useCreateEducationMutation();

  const [updateEducation, { isLoading: loadingAdding }] =
  useUpdateEducationMutation();

  useEffect(() => {
    if (editEducation) {
      setDegree(editEducation.degree || "");
      setCourse(editEducation.course || "");
      setInstituteName(editEducation.instituteName || "");
      setDate(formatDateMothFormat(editEducation.date) || "");
      setId(editEducation._id || ""); 
    }
  }, [editEducation]);
  

  

  const handelAddEdu = async (e) => {
    e.preventDefault();
    const addEdu = {
      degree,
      course,
      instituteName,
      date
    };

    const result = await createEducation(addEdu);
  
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Education added successfully");
      handleClose();
      refetchAll()
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedEdu = {
      _id,
      degree,
      course,
      instituteName,
      date
    };
  
    const result = await updateEducation(updatedEdu);
  
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Education updated successfully");
      handleClose(); 
      refetchAll()
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {editEducation ? "Update" : "Add"} Education</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="degree">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="course">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="instituteName">
            <Form.Label>Institute Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter institute name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={ editEducation ? handleUpdate : handelAddEdu }>
         {editEducation ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUpdateEduModal;
