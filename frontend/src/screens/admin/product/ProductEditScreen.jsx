import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from "../../../slices/productApiSlice";
import { useUploadImageMutation } from "../../../slices/uploadImageApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);


  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setUrl(product.url);
      setImage(product.image);
      setDescription(product.description);
      setIsActive(product.isActive)
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      url,
      image,
      description,
      isActive
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
      setTimeout(() => {
        navigate("/admin/productlist");
      }, 1000);
      
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container className="py-3">
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>

        <FormContainer>
          <h1>Edit Product</h1>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="url" className="my-2">
                <Form.Label>url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image" className="mt-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>

              {image &&
                <Form.Group className="mt-3">
                  <img src={image} alt="Selected" className="w-100" />
                </Form.Group>}
              {loadingUpload && <Loader />}
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
              <Form.Group controlId="isActive" className="my-3">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>
              <div style={{ textAlign: "right" }}>
                <Button type="submit" variant="primary" className="my-2 btnAllScreen">
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

export default ProductEditScreen;
