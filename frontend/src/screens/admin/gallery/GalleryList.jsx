import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import { toast } from "react-toastify";
import AddAndUpdateGalleryModal from "./AddAndUpdateGalleryModal";
import { useGetGalleryQuery, useDeleteGalleryItemMutation } from "../../../slices/galleryApiSlice";

const GalleryList = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState(null);

  const { data: responseData, isLoading, error, refetch } = useGetGalleryQuery({ keyword: "", pageNumber: page });

  const handleCloseGalleryModal = () => setShowGalleryModal(false);
  const handleOpenGalleryModal = () => setShowGalleryModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (id) => {
    setGalleryToDelete(id);
    setShowDeleteModal(true);
  };

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteGalleryItemMutation();

  const deleteHandler = async () => {
    try {
      const res = await deleteProduct(galleryToDelete);
      if (res && res.error) {
        toast.error(res.error.data.message || "Failed to delete product");
      } else {
        toast.success("Product deleted");
        refetch();
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    handleCloseDeleteModal();
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
            <Button className="btn-sm btnAllScreen" onClick={() => handleOpenGalleryModal(true)}>
              Create
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error?.data || error?.error}</Message>
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
                {responseData?.allGalleries?.length === 0 && <p>No any Gallery found</p>}
                {responseData?.allGalleries?.map((imageItem) => (
                  <tr key={imageItem._id}>
                    <td>
                      <Image src={imageItem.image} fluid style={{ width: "60px", height: "60px" }} />
                    </td>
                    <td>{imageItem.caption}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleShowDeleteModal(imageItem._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {responseData?.allGalleries?.length > 0 && (
              <div style={{ display: "flex", marginTop: "25px", justifyContent: "center" }}>
                <Paginate screen="admin/galleries-list" pages={responseData?.pages} page={parseInt(page)} keyword={keyword} />
              </div>
            )}
          </>
        )}
      </Container>

      {/* Delete Gallery Item Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Gallery Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this gallery item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GalleryList;
