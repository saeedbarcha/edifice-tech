import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { formatDate } from '../../../common-functions/formatDate.js';
import {
  useGetAdmissionBatchsQuery,
  useDeleteAdmissionBatchMutation,
} from "../../../slices/admissionBatchApiSlice";

const AdmissionBatchListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAdmissionBatchsQuery();

  const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
    useDeleteAdmissionBatchMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteAdmissionBatch(id);
        toast.success("Admission Batch deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
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
            <h1>Admission Batches</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createadmissionbatch`}>
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
          <Message variant="danger"> {error?.data?.message}</Message>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Admission Fee</th>
                  <th>Start </th>
                  <th>End Date</th>
                  <th>Last Date</th>
                  <th>Certificate</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {data?.length === 0 &&
                <p>No any Admission Batch found</p>}
                {data?.map((admissionBatch) => (
                  <tr key={admissionBatch?._id}>
                    <td>
                      <Link to={`/admissionbatch/${admissionBatch?._id}`}>
                        {admissionBatch?.title}
                      </Link>
                    </td>
                    <td>{admissionBatch?.admissionFee}</td>
                    <td>{formatDate(admissionBatch?.startDate)}</td>
                    <td>{formatDate(admissionBatch?.endDate)}</td>
                    <td>{formatDate(admissionBatch?.lastDateToApply)}</td>
                    <td>
                      {admissionBatch?.certificate ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {admissionBatch?.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/admission-batch/${admissionBatch?._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(admissionBatch?._id)}
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

export default AdmissionBatchListScreen;
