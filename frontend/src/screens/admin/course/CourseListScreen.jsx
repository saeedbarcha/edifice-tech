import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useCreateBlogMutation,
} from "../../../slices/blogApiSlice";
import { useGetCoursesQuery , useDeleteCourseMutation} from "../../../slices/courseApiSlice.js";
const CourseListScreen = () => {
  const { data: allCourses, isLoading, error, refetch } = useGetCoursesQuery();

  const [createBlog, { isLoading: loadingCreate }] = useCreateBlogMutation();

  const [deleteCourse, { isLoading: loadingDelete }] = useDeleteCourseMutation();

  const deleteHandler = async(id) => {
    if(window.confirm("Are you sure?")){
      try{
        const res = await deleteCourse(id);
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to delete Course");
        } else {
          toast.success("Course deleted");
          refetch();
        }
      } catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createBlogHandler = async () => {
    if (window.confirm("Are you sure you want to create a new blog?")) {
      try {
        const res = await createBlog();
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to create blog");
        } else {
          toast.success("Blog created successfully");
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
            <h1>Courses</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to={`/admin/createcourse`}>
              <Button className="btn-sm m-3 btnAllScreen">
               Create Course
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
                  <th>TITLE</th>
                  <th>PRICE</th>
                  <th>DISCOUT</th>
                  <th>DURATION</th>
                  <th>ACTIVE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {allCourses?.map((course) => (
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
          </>
        )}
      </Container>
    </>
  );
};

export default CourseListScreen;
