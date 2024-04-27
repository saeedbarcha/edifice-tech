import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { formatDateWithTime } from '../../../common-functions/formatDate.js';
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
          toast.error(res.error.data.message || "Failed to delete blog");
        } else {
          toast.success("Blog deleted");
          refetch();
        }
      } catch (err) {
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
                    <td>{formatDateWithTime(blog.createdAt)}</td>
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
