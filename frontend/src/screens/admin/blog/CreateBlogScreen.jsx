import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useUploadBlogImageMutation,
  useGetBlogDetailsQuery,
  useUpdateBlogMutation,
} from "../../../slices/blogApiSlice";

const CreateBlogScreen = () => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: blog, isLoading, error } = useGetBlogDetailsQuery(blogId);

  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.image);
      setContent(blog.content);
      setIsActive(blog.isActive);
    }
  }, [blog]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
  
    };

    const result = await updateBlog(updatedProduct);

    if(result.error){
        toast.error(result.error)
    }else{
        toast.success("Product updated successfully");
        navigate("/admin/productlist");
    }

  }

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
    <div>
      <div className="space" style={{ paddingTop: "3%", paddingBottom: "3%" }}>
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

                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  className="mt-3"
                  onChange={(e) => setImage}
                ></Form.Control>
              </Form.Group>

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
            
              {!isActive ? (
                <Button
                  type="submit"
                  className="btnAllScreen"
                  size="lg"
                  style={{ margin: "3% 0" }}
                >
                  Submit Blog
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="btnAllScreen"
                  disabled
                  size="lg"
                  style={{ margin: "3% 0" }}
                >
                  Adding Blog
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlogScreen;
