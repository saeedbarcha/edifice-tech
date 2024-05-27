import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useUpdateGalleryItemMutation,
  useCreateGalleryMutation,
} from "../../../slices/galleryApiSlice";
import {useUploadImageMutation} from "../../../slices/uploadImageApiSlice";


const AddAndUpdateGalleryModal = ({ show, handleClose, editGallery }) => {
  const navigate = useNavigate();
 
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [_id, setId] = useState("");

  const [createGallery, { isLoading: loadingCreate }] =
    useCreateGalleryMutation();
  const [updateGallery, { isLoading: loadingUpdate }] =
    useUpdateGalleryItemMutation();
    const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadImageMutation();
  useEffect(() => {
    if (editGallery) {
      setCaption(editGallery.caption || "");
      setImage(editGallery.image || "");
      setIsActive(editGallery.isActive || true);
      setId(editGallery._id || "");
    }
  }, [editGallery]);

  const handelAddGallery = async (e) => {
    e.preventDefault();
    const addGallery = {
      caption,
      image,
      isActive,
    };

    const result = await createGallery(addGallery);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Image added successfully");

      handleClose(); 
      setTimeout(() => {
        navigate("/admin/galleries-list/page/1");
      }, 1000);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedGallery = {
      _id,
      caption,
      image,
      isActive,
    };

    const result = await updateGallery(updatedGallery);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Image updated successfully");
      handleClose(); 
      setTimeout(() => {
        navigate("/admin/galleries-list/page/1");
      }, 1000);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try{
        const res = await uploadBlogImage(formData).unwrap();
        toast.success(res?.message);
        setImage(res.image);
    }catch(err){
        toast.error(err?.data?.message || err.error)
    }
    
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editGallery ? "Update" : "Add"} Gallery
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              label="Choose file"
              onChange={uploadFileHandler}
            ></Form.Control>

            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              className="mt-3"
              onChange={(e) => setImage}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>
        
          <Form.Group controlId="isActive">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
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
          onClick={editGallery ? handleUpdate : handelAddGallery}
        >
          {editGallery ? (loadingUpdate ? "Updating..." : "Update") : (loadingCreate ? "Creating..." : "Create")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAndUpdateGalleryModal;
