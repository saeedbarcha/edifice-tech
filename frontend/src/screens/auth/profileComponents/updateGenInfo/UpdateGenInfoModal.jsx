import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateUserProfileMutation } from "../../../../slices/usersApiSlice";

const UpdateGenInfoModal = ({ show, handleClose, userInfo }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    skill: "",
    designation: "",
    description: "",
    fiverrUrl: "",
    upworkUrl: "",
    githubUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedInUrl: ""
  });

  useEffect(() => {
    if (userInfo && userInfo.user) {
      setFormData({
        name: userInfo.user.name || "",
        email: userInfo.user.email || "",
        phone: userInfo.user.phone || "",
        dateOfBirth: userInfo.user.dateOfBirth || "",
        gender: userInfo.user.gender || "",
        address: userInfo.user.address || "",
        skill: userInfo.user.skill || "",
        designation: userInfo.user.designation || "",
        description: userInfo.user.description || "",
        fiverrUrl: userInfo.user.fiverrUrl || "",
        upworkUrl: userInfo.user.upworkUrl || "",
        githubUrl: userInfo.user.githubUrl || "",
        facebookUrl: userInfo.user.facebookUrl || "",
        instagramUrl: userInfo.user.instagramUrl || "",
        linkedInUrl: userInfo.user.linkedInUrl || ""
      });
    }
  }, [userInfo]);

  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateUserProfileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update General Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="skill">
            <Form.Label>Skill</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter skill"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fiverrUrl">
            <Form.Label>Fiverr URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Fiverr URL"
              name="fiverrUrl"
              value={formData.fiverrUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="upworkUrl">
            <Form.Label>Upwork URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Upwork URL"
              name="upworkUrl"
              value={formData.upworkUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="githubUrl">
            <Form.Label>GitHub URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter GitHub URL"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="facebookUrl">
            <Form.Label>Facebook URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Facebook URL"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="instagramUrl">
            <Form.Label>Instagram URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Instagram URL"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="linkedInUrl">
            <Form.Label>LinkedIn URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter LinkedIn URL"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateGenInfoModal;
