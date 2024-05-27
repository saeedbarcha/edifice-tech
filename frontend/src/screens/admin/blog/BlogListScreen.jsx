import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import { formatDateWithTime } from '../../../common-functions/formatDate.js';
import { toast } from "react-toastify";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation
} from "../../../slices/blogApiSlice";

const BlogListScreen = () => {

  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const { data: responseData, isLoading, error, refetch } = useGetBlogsQuery({ keyword: "", pageNumber: page });


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
        <Link className="btn btn-light my-3" to="/admin/dashboard">
          Go Back
        </Link>
        <Row className="align-items-center">
          <Col>
            <h1>Blogs</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3 btnAllScreen" onClick={createBlogHandler}>
              {/* <Link to={"/admin/createblog"}> */}
              Create
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
                  <th>Title</th>
                  <th>Date</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {responseData?.allBolgs?.length === 0 &&
                  <p>No any blog found</p>}

                {responseData?.allBlogs?.map((blog) => (
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


            {responseData?.allBlogs?.length > 0 &&
              <div style={{ display: "flex", marginTop: "25px", justifyContent: "center" }}>
                <Paginate screen="admin/blogs-list" pages={responseData?.pages} page={parseInt(page)} keyword={keyword} />
              </div>
            }
          </>
        )}
      </Container>
    </>
  );
};

export default BlogListScreen;
