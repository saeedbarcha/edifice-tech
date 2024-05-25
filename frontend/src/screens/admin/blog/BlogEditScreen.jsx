import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  useGetBlogDetailsQuery,
  useUpdateBlogMutation,
} from "../../../slices/blogApiSlice";
import {useUploadImageMutation} from "../../../slices/uploadImageApiSlice";

const BlogEditScreen = () => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: blog, isLoading, error } = useGetBlogDetailsQuery(blogId);

  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
  useUploadImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.image);
      setSelectedImage(blog.image);
      setContent(blog.content);
      setIsActive(blog.isActive);
    }
  }, [blog]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      blogId,
      title,
      image,
      content,
      isActive,
    };
    const result = await updateBlog(updatedBlog);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Blog updated successfully");
      setTimeout(() => {
        navigate("/admin/bloglist");
      }, 1000);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res.image);
      setSelectedImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="space" style={{ paddingTop: "3%", paddingBottom: "3%" }}>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Card style={{ maxWidth: 650, margin: "0% auto" }}>
            <Card.Body>
              <Card.Title>My Blog Post!</Card.Title>
              <Form onSubmit={submitHandler}>


                <Form.Group controlId="blogTitle" className="mt-3">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="image" className="mt-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    label="Choose file"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                </Form.Group>

                {selectedImage &&
                  <Form.Group className="mt-3">
                    <img src={selectedImage} alt="Selected" className="w-100" />
                  </Form.Group>}


                <Form.Group controlId="blogBody" className="mt-3">
                  <Form.Label>Blog Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="isActive" className="mt-4">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>

                <div style={{ textAlign: "right" }}>
                  <Button type="submit"  className="my-2 btnAllScreen">
                  {loadingUpdate ? "Updating..." : "Update"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};
export default BlogEditScreen;
