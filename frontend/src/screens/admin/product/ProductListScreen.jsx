import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import {Container, Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation
} from "../../../slices/productApiSlice";

const ProductListScreen = () => {

  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();

  const deleteHandler = async(id) => {
    if(window.confirm("Are you sure?")){
      try{
        const res = await deleteProduct(id);
        if (res && res.error) {
          toast.error(res.error.data.message || "Failed to delete product");
        } else {
          toast.success("Product deleted");
          refetch();
        }
      } catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
       const pro = await createProduct();
       if(pro){
        toast.success("Product created successfully");
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
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm btnAllScreen" onClick={createProductHandler}>
            Create
          </Button>
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
                <th>Image</th>
                <th>Name</th>
                <th>Url</th>
                <th>Is Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data?.length === 0 &&
                <p>No any Product found</p>}
              {data?.map((product) => (
                <tr key={product?._id}>
                  <td><Image src={product?.image} fluid style={{width:"60px", height:"60px"}} /></td>
                  <td>{product?.name}</td>
                  <td>{product?.url}</td>
                  <td>
                      {product?.isActive ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm "
                      onClick={() => deleteHandler(product?._id)}
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

export default ProductListScreen;
