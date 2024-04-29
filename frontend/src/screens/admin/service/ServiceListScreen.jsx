
import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {useGetServicesQuery, useCreateServiceMutation, useDeleteServiceMutation, useUpdateServiceMutation} from "../../../slices/serviceApiSlice";
const ServiceListScreen = () => {
  const { data: allService, isLoading, error, refetch } = useGetServicesQuery();

  const [createService, { isLoading: loadingCreate }] = useCreateServiceMutation();

  const [deleteService, { isLoading: loadingDelete }] = useDeleteServiceMutation();

  const deleteHandler = async(id) => {
  
    if(window.confirm("Are you sure?")){
      try{
        const res = await deleteService(id);
        if (res && res.error) {
          toast.error(res?.error?.data?.message || "Failed to delete Service");
        } else {
          toast.success("Service deleted");
          refetch();
        }
      } catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }
  }; 

  return (
    <>
      <Container className="py-3">
        <Row className="align-items-center">
          <Col>
            <h1>Service</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createservice`}>
              <Button className="btn-sm m-3 btnAllScreen">
               Create Service
              </Button>
            </LinkContainer>
        
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Active</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {allService?.map((service) => (
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
                        onClick={() => deleteHandler(service?._id)}
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

export default ServiceListScreen;
