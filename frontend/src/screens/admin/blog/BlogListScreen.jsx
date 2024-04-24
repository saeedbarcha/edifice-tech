import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation
} from "../../../slices/blogApiSlice";

const BlogListScreen = () => {

  const { data, isLoading, error, refetch } = useGetBlogsQuery();

  const [createBlog, { isLoading: loadingCreate }] =
    useCreateBlogMutation();

  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteBlog(id);
        if (res && res.error) {
          console.log("Error deleting blog:", res.error);
          toast.error(res.error.data.message || "Failed to delete blog");
        } else {
          console.log("Blog deleted");
          toast.success("Blog deleted");
          refetch();
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  const createBlogHandler = async () => {
    if (window.confirm("Are you sure you want to create a new blog?")) {
      try {
        const blog = await createBlog();
        if (blog) {
          toast.success("Blog created successfully");
          refetch();
        }

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
    var formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;

    return formattedDate;
  }

  return (
    <>
      <Container className="py-3">
        <Row className="align-items-center">
          <Col>
            <h1>Blogs</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3 btnAllScreen" onClick={createBlogHandler}>
            {/* <Link to={"/admin/createblog"}> */}
              <FaEdit /> Create Blog
            {/* </Link> */}
            </Button>
          </Col>
        </Row>

        {loadingCreate && <Loader />}
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
                  <th>TITLE</th>
                  <th>DATE</th>
                  <th>ACTIVE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((blog) => (
                  <tr key={blog._id}>
                    <td><Image src={blog.image} fluid style={{ width: "60px", height: "60px" }} /></td>

                    <td>{blog.title}</td>
                    <td>{formatDateString(blog.createdAt)}</td>
                    <td>
                      {blog.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(blog._id)}
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

export default BlogListScreen;
