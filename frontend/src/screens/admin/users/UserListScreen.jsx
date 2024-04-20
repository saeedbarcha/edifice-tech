import { LinkContainer } from "react-router-bootstrap";
import { useParams, Link } from "react-router-dom";
import {Container, Table, Button, Image } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useGetUsersQuery, useDeleteUserMutation } from "../../../slices/usersApiSlice";

const UserListScreen = () => {
  const { id: userId } = useParams();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  console.log("eeeeeeee", error)

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
 
 
  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure?')){
        try{
           const deletedUser = await deleteUser(id);
           if(deletedUser){
            toast.success("User deleted successfully")
            refetch();
           }
            
        }catch(err){
            toast.error(err?.data?.message || err.message);
        }
    }
  }


  return (
    <>
    <Container className="py-3">


      <h1>Users</h1>

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>TEAM MEMBER</th>
              <th>ACTION</th>

            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                 <td><Image src={user.image} fluid style={{width:"60px", height:"60px"}} /></td>
                <td><Link to={`/member/${user._id}`} style={{textDecoration:"none"}}>{user.name}</Link></td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                  ) : (
                      <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {user.isTeamMember ? (
                      <FaCheck style={{ color: "green" }} />
                  ) : (
                      <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button variant="danger" className="btn-sm"
                  onClick={()=> deleteHandler(user._id)}>
                      <FaTrash style={{color:"white"}} />
                    </Button>

                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}
          </Container>
    </>
  );
};

export default UserListScreen;
