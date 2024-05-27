
import { LinkContainer } from "react-router-bootstrap";
import {Link, useParams} from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import { toast } from "react-toastify";
import {useGetFaqsQuery, useDeleteFaqMutation} from "../../../slices/faqsApiSlice";
const FaqsListScreen = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const { data: responseData, isLoading, error, refetch } = useGetFaqsQuery({ keyword: "", pageNumber: page });
  const [deleteFaq, { isLoading: loadingDelete }] = useDeleteFaqMutation();

  const deleteHandler = async(id) => {
  
    if(window.confirm("Are you sure?")){
      try{
        const res = await deleteFaq(id);
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
      <Link className="btn btn-light my-3" to="/admin/dashboard">
          Go Back
        </Link>
        <Row className="align-items-center">
          <Col>
            <h1>Faqs</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/create-faqs`}>
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
        <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>

        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Active</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
              {responseData?.allFaqs?.length === 0 &&
                <p>No any FAQ found</p>}
                {responseData?.allFaqs?.map((faq) => (
                  <tr key={faq?._id}>
                    <td>{faq?.question}</td>
                    <td>{faq?.answer}</td>


                    <td>
                      {faq?.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/faqs/${faq._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(faq?._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {responseData?.allFaqs?.length > 0 &&
              <div style={{ display: "flex", marginTop: "25px", justifyContent: "center" }}>
                <Paginate screen="admin/faqs-list" pages={responseData?.pages} page={parseInt(page)} keyword={keyword} />
              </div>
            }
          </>
        )}
      </Container>
    </>
  );
};

export default FaqsListScreen;
