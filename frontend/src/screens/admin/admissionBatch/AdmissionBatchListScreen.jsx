import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetAdmissionBatchsQuery,
  useCreateAdmissionBatchMutation,
  useDeleteAdmissionBatchMutation,
} from "../../../slices/admissionBatchApiSlice";

const AdmissionBatchListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAdmissionBatchsQuery();

  const [createAdmissionBatch, { isLoading: loadingCreate }] =
    useCreateAdmissionBatchMutation();

  const [deleteAdmissionBatch, { isLoading: loadingDelete }] =
    useDeleteAdmissionBatchMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteAdmissionBatch(id);
        toast.success("Admission Batch deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  function formatDateString(dateString) {
    var date = new Date(dateString);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    // var formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;
    var formattedDate = `${month}/${day}/${year}`;


    return formattedDate;
  }

  return (
    <>
      <Container className="py-3">
        <Row className="align-items-center">
          <Col>
            <h1>Admission Batches</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createadmissionbatch`}>
              <Button className="btn-sm m-3 btnAllScreen">
                Create New Batch
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        {loadingCreate && <Loader />}
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
                {data?.map((admissionBatch) => (
                  <tr key={admissionBatch._id}>
                    <td>
                      <Link to={`/admissionbatch/${admissionBatch._id}`}>
                        {admissionBatch.title}
                      </Link>
                    </td>
                    <td>{admissionBatch.admissionFee}</td>
                    <td>{formatDateString(admissionBatch.startDate)}</td>
                    <td>{formatDateString(admissionBatch.endDate)}</td>
                    <td>{formatDateString(admissionBatch.lastDateToApply)}</td>
                    <td>
                      {admissionBatch.certificate ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {admissionBatch.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/admission-batch/${admissionBatch._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(admissionBatch._id)}
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
