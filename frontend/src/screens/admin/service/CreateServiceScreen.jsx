import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useCreateServiceMutation
} from "../../../slices/serviceApiSlice";
import Loader from "../../../components/Loader";
import { useUploadImageMutation } from "../../../slices/uploadImageApiSlice";

const CreateServiceScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconImage, setIconImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [createService, { isLoading: loadingCreate }] = useCreateServiceMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newService = {
      title,
      description,
      iconImage,
      bannerImage,
      youtubeVideoUrl,
      isActive,
    };

    const result = await createService(newService);

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Service created successfully");
      setTimeout(() => {
        navigate("/admin/services-List/page/1");
      }, 1000);
    }

  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res?.message);
      setIconImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }

  };

  const uploadBannerHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res?.message);
      setBannerImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }

  };
  return (
    <div>
      <div className="space" style={{ paddingTop: "3%", paddingBottom: "3%" }}>
        <Card style={{ maxWidth: 650, margin: "0% auto" }}>
          <Card.Body>
            <Card.Title>Create a New Service!</Card.Title>
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
                <Button type="submit" className="btn-sm m-3 btnAllScreen">
                {loadingCreate ? "Creating..." : "Create"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CreateServiceScreen;
