import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Paginate from "../../../components/Paginate";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useGetCoursesQuery, useDeleteCourseMutation } from "../../../slices/courseApiSlice.js";
const CourseListScreen = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const { data: responseData, isLoading, error, refetch } = useGetCoursesQuery({ keyword: "", pageNumber: page });


  const [deleteCourse, { isLoading: loadingDelete }] = useDeleteCourseMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteCourse(id);
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to delete Course");
        } else {
          toast.success("Course deleted");
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
            <h1>Courses</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createcourse`}>
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
                  <th>Price</th>
                  <th>Discout</th>
                  <th>Duration</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {responseData?.allCourses?.length === 0 &&
                <p>No any course found</p>}
                {responseData?.allCourses?.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.price}</td>
                    <td>{course.discount}%</td>
                    <td>{course.totalDuration}</td>

                    <td>
                      {course.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/course/${course._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(course._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            {responseData?.allCourses?.length > 0 &&
              <div style={{ display: "flex", marginTop: "25px", justifyContent: "center" }}>
                <Paginate screen="admin/courses-List" pages={responseData?.pages} page={parseInt(page)} keyword={keyword} />
              </div>
            }
          </>
        )}
      </Container>
    </>
  );
};

export default CourseListScreen;
