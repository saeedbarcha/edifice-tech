import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "../../../../slices/experienceApiSlice";
import { formatDateMothFormat } from '../../../../common-functions/formatDate.js';


const AddUpdateExpModal = ({ show, handleClose, editExperience }) => {
  const [designation, setDesignation] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [_id, setId] = useState("");

  const [createExperience, { isLoading: loadingCreate }] =
    useCreateExperienceMutation();
  const [updateExperience, { isLoading: loadingUpdate }] =
    useUpdateExperienceMutation();

  useEffect(() => {
    if (editExperience) {
      setDesignation(editExperience.designation || "");
      setInstituteName(editExperience.instituteName || "");
      setJoiningDate(formatDateMothFormat(editExperience.joiningDate) || "");
      setEndingDate(formatDateMothFormat(editExperience.endingDate) || "");
      setId(editExperience._id || "");
    }
  }, [editExperience]);

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const newExperience = {
      designation,
      instituteName,
      joiningDate,
      endingDate,
    };

    const result = await createExperience(newExperience);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Experience added successfully");
      handleClose();
    }
  };

  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    let updatedExperience = {
      _id,
      designation,
      instituteName,
      joiningDate,
      endingDate,
    };

    for (let key in updatedExperience) {
      if (!updatedExperience[key]) {
        updatedExperience[key] = editExperience[key];
      }
    }

    const result = await updateExperience(updatedExperience);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Experience updated successfully");
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editExperience ? "Update" : "Add"} Experience
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
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
          <Form.Group controlId="joiningDate">
            <Form.Label>Joining Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter joining date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="endingDate">
            <Form.Label>Ending Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter ending date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={editExperience ? handleUpdateExperience : handleAddExperience}
        >
          {editExperience ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUpdateExpModal;
