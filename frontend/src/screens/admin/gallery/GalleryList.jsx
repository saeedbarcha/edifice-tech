import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import AddAndUpdateGalleryModal from "./AddAndUpdateGalleryModal";
import { useGetGalleryQuery, useDeleteGalleryItemMutation } from "../../../slices/galleryApiSlice";


const GalleryList = () => {
  const { pageNumber } = useParams();
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleCloseGalleryModal = () => setShowGalleryModal(false);

  const handleOpenGalleryModal = () => setShowGalleryModal(true);


  const { data, isLoading, error, refetch } = useGetGalleryQuery();

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteGalleryItemMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteProduct(id);
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to delete product");
        } else {
          toast.success("Product deleted");
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
      <Link className="btn btn-light my-3" to="/admin/dashboard">
          Go Back
        </Link>
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
              Create 
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {error?.data?.message || error?.data || error?.error}</Message>

        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Caption</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {data?.length === 0 &&
                <p>No any Gallery found</p>}

                {data?.map((imageItem) => (
                  <tr key={imageItem._id}>
                    <td><Image src={imageItem.image} fluid style={{ width: "60px", height: "60px" }} /></td>
                    <td>{imageItem.caption}</td>
                    <td>
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
