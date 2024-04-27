import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useUpdateProjectMutation,
  useCreateProjectMutation,
} from "../../../../slices/projectApiSlice";
import {useUploadImageMutation} from "../../../../slices/uploadImageApiSlice";


const AddUpdateProjectModal = ({ show, handleClose, editProject }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [_id, setId] = useState("");

  const [createProject, { isLoading: loadingCreate }] =
    useCreateProjectMutation();

  const [updateProject, { isLoading: loadingUpdate }] =
    useUpdateProjectMutation();

  const [uploadProjectImage, { isLoading: loadingUploadImg }] =
  useUploadImageMutation();

  useEffect(() => {
    if (editProject) {
      setTitle(editProject.title || "");
      setUrl(editProject.url || "");
      setDescription(editProject.description || "");
      setImage(editProject.image || "");
      setId(editProject._id || "");
    }
  }, [editProject]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const newProject = {
      title,
      url,
      description,
      image,
    };
    const result = await createProject(newProject);
    toast.success("Project added successfully");
    handleClose();
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    let updatedProject = {
      _id,
      title,
      url,
      description,
      image,
    };

    const result = await updateProject(updatedProject);
    toast.success("Project updated successfully");
    handleClose();
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProjectImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editProject ? "Update" : "Add"} Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              label="Choose file"
              onChange={uploadFileHandler}
            ></Form.Control>

            <Form.Control
              type="text"
              className="mt-2"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          onClick={editProject ? handleUpdateProject : handleAddProject}
        >
          {editProject ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUpdateProjectModal;
