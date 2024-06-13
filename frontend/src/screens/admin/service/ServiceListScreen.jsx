import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image, Modal } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate";
import { useGetServicesQuery, useDeleteServiceMutation } from "../../../slices/serviceApiSlice";

const ServiceListScreen = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;
  const { data: responseData, isLoading, error, refetch } = useGetServicesQuery({ keyword: "", pageNumber: page });

  const [deleteService, { isLoading: loadingDelete }] = useDeleteServiceMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (id) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteHandler = async () => {
    if (serviceToDelete) {
      try {
        const res = await deleteService(serviceToDelete);
        if (res && res.error) {
          toast.error(res?.error?.data?.message || "Failed to delete Service");
        } else {
          toast.success("Service deleted");
          refetch();
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
            <h1>Service</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createservice`}>
              <Button className="btn-sm m-3 btnAllScreen">
                Create
              </Button>
            </LinkContainer>
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {responseData?.allServices?.length === 0 && <p>No any service found</p>}
                {responseData?.allServices?.map((service) => (
                  <tr key={service?._id}>
                    <td>{service?.title}</td>
                    <td>{service?.description}</td>
                    <td>
                      {service?.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/service/${service._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleShowDeleteModal(service?._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {responseData?.allServices?.length > 0 && (
              <div style={{ display: "flex", marginTop: "25px", justifyContent: "center" }}>
                <Paginate screen="admin/services-list" pages={responseData?.pages} page={parseInt(page)} keyword={keyword} />
              </div>
            )}
          </>
        )}
      </Container>

      {/* Delete Service Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
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

export default ServiceListScreen;
