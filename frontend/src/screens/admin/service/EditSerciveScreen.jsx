import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetServiceDetailsQuery,
  useUpdateServiceMutation,
} from "../../../slices/serviceApiSlice";
import { useUploadImageMutation } from "../../../slices/uploadImageApiSlice";

const EditSerciveScreen = () => {
  const { id: serviceId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconImage, setIconImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const {
    data: service,
    isLoading,
    error,
  } = useGetServiceDetailsQuery(serviceId);

  const navigate = useNavigate();


  const [updateService, { isLoading: loadingUpdate }] =
    useUpdateServiceMutation();

  const [uploadServiceImage, { isLoading: loadingUpload }] =
    useUploadImageMutation();

  useEffect(() => {
    if (service) {
      setTitle(service?.title);
      setDescription(service?.description);
      setIconImage(service?.iconImage);
      setBannerImage(service?.bannerImage);
      setYoutubeVideoUrl(service?.youtubeVideoUrl);
      setIsActive(service?.isActive);
    }
  }, [service]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedservice = {
      serviceId,
      title,
      iconImage,
      bannerImage,
      youtubeVideoUrl,
      description,
      isActive,
    };

    const result = await updateService(updatedservice);

    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Service updated successfully");
      setTimeout(() => {
        navigate("/admin/service-list");
      }, 1000);
    }
  };


  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadServiceImage(formData).unwrap();
      toast.success(res?.message);
      setIconImage(res?.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }

  };

  const uploadBannerHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadServiceImage(formData).unwrap();
      toast.success(res?.message);
      setBannerImage(res?.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }

  };
  return (
    <>
      <Container className="py-3">
        <Link to="/admin/course-list" className="btn btn-light my-3">
          Go Back
        </Link>

        <FormContainer>
          <h1>Edit Service</h1>

          {loadingUpdate && <Loader />}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title" className="my-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="iconImage" className="mt-3">
                <Form.Label>Icon Image</Form.Label>
                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>

              {iconImage &&
                <Form.Group className="mt-3">
                  <img src={iconImage} alt="Selected" className="w-100" />
                </Form.Group>}

              <Form.Group controlId="bannerImage" className="mt-3">
                <Form.Label>Banner Image</Form.Label>
                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadBannerHandler}
                ></Form.Control>
              </Form.Group>

              {bannerImage &&
                <Form.Group className="mt-3">
                  <img src={bannerImage} alt="Selected" className="w-100" />
                </Form.Group>}

              <Form.Group controlId="youtubeVedioUrl" className="my-2">
                <Form.Label>Youtube Vedio Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter youtube url"
                  value={youtubeVideoUrl}
                  onChange={(e) => setYoutubeVideoUrl(e.target.value)}
                />
              </Form.Group>



              <Form.Group controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isActive" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>

              {loadingUpload && <Loader />}

              <div style={{ textAlign: "right" }}>
                <Button type="submit" className="btn my-2 btnAllScreen">
                  {loadingUpdate ? "Updating..." : "Update"}
                </Button>
              </div>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default EditSerciveScreen;
