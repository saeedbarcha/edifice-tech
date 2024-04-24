import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import {Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import { toast } from "react-toastify";
import AddAndUpdateGalleryModal from "./AddAndUpdateGalleryModal";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation
} from "../../../slices/productApiSlice";

import { useGetGalleryQuery, useUpdateGalleryItemMutation, useDeleteGalleryItemMutation } from "../../../slices/galleryApiSlice";


const GalleryList = () => {
  const { pageNumber } = useParams();
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleCloseGalleryModal = () => setShowGalleryModal(false);

  const handleOpenGalleryModal = () => setShowGalleryModal(true);


  const { data, isLoading, error, refetch } = useGetGalleryQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, {isLoading:loadingDelete}] = useDeleteGalleryItemMutation();

  const deleteHandler = async(id) => {
    if(window.confirm("Are you sure?")){
      try{
        const res = await deleteProduct(id);
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to delete product");
        } else {
          toast.success("Product deleted");
          refetch();
        }
      } catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
       const pro = await createProduct();
       if(pro){
        toast.success("Image added successfully");
        refetch();
       }
       
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
    <Container className="py-3"> 
      <Row className="align-items-center">
        <Col>
          <h1>Gallery</h1>
        </Col>
        <Col className="text-end">
        <AddAndUpdateGalleryModal
            show={showGalleryModal}
            handleClose={handleCloseGalleryModal}
            editGallery={selectedGallery}
          />
          <Button className="btn-sm btnAllScreen"
            onClick={() => {
              handleOpenGalleryModal(true);
            }}>
                <FaEdit /> Add new Image
            {/* <IoMdAddCircle
              style={{ fontSize: "22px", color: "blue" }}
            
            /> */}
          </Button>
          {/* <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Add new Image
          </Button> */}
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>

      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>CAPTION</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((imageItem) => (
                  <tr key={imageItem._id}>
                  <td><Image src={imageItem.image} fluid style={{width:"60px", height:"60px"}} /></td>
                  <td>{imageItem.caption}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${imageItem._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(imageItem._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
    </>
  );
};

export default GalleryList;
