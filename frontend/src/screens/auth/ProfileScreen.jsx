import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaQuoteLeft,
  FaQuoteRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { BiLogoUpwork } from "react-icons/bi";
import { TbBrandFiverr } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import EducationElement from "./profileComponents/education/EducationElement";
import ExperienceElement from "./profileComponents/experiencs/ExperienceElement";
import ProjectElement from "./profileComponents/userProjects/ProjectElement";
import UpdateGenInfoModal from "./profileComponents/updateGenInfo/UpdateGenInfoModal";

import {
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";

const ProfileScreen = () => {

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userInfo._id);


  const handleOpenUpdateProfileModal = (project) => {
    setSelectedUser(project);
    setShowUpdateProfileModal(true);
  };

  const handleCloseUpdateProfileModal = () => {
    setSelectedUser(null);
    setShowUpdateProfileModal(false);
  };


  useEffect(() => {

  }, [userInfo]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <section style={{ backgroundColor: "#eee" }}>
            <Container className="py-5">
            <Row className="my-1">
                <Col style={{display:"flex", justifyContent:"end"}}>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => handleOpenUpdateProfileModal(userInfo)} // Open modal for updating the project
                  >
                    <FaEdit />
                  </Button>
                  <UpdateGenInfoModal
                    show={showUpdateProfileModal}
                    handleClose={handleCloseUpdateProfileModal}
                    userInfo={user}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <Card className="mb-4">
                    <Card.Body className="text-center">
                      <Card.Img
                        src={user.user.image ? user.user.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                      <h3>{user?.user?.name}</h3>
                      <p>{user?.user?.designation}</p>
                      <p className="text-muted mb-1">{user?.user?.skill}</p>
                      <p className="text-muted mb-4">{user?.user?.address}</p>
                      <div className="d-flex justify-content-center mb-2"></div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-4 mb-lg-0">
                    <Card.Body className="p-0">
                      <ListGroup variant="flush" className="rounded-3">
                        <ListGroup.Item className="d-flex  align-items-center p-3">
                          <h5>Social Links</h5>
                        </ListGroup.Item>
                        {user?.user?.fiverrUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <TbBrandFiverr
                              className=""
                              style={{ color: "#1DBF73", marginRight: "14px" }}
                            />
                            {user?.user?.fiverrUrl}
                          </ListGroup.Item>
                        )}

                        {user?.user?.upworkUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <BiLogoUpwork
                              style={{ color: "#6fda44", marginRight: "14px" }}
                            />
                            {user?.user?.upworkUrl}
                          </ListGroup.Item>
                        )}

                        {user?.user?.githubUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaGithub
                              className=""
                              style={{ marginRight: "14px" }}
                            />
                            {user?.user?.githubUrl}
                          </ListGroup.Item>
                        )}

                        {user?.user?.linkedInUrl && (
                          <ListGroup.Item className="d-flex align-items-center p-3">
                            <FaLinkedin
                              style={{ color: "#0077b5", marginRight: "14px" }}
                            />
                            {user?.user?.linkedInUrl}
                          </ListGroup.Item>
                        )}

                        {user?.user?.instagramUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaInstagram
                              style={{ color: "#ac2bac", marginRight: "14px" }}
                            />
                            {user?.user?.instagramUrl}
                          </ListGroup.Item>
                        )}

                        {user?.user?.facebookUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaFacebook
                              style={{ color: "#3b5998", marginRight: "14px" }}
                            />
                            {user?.user?.facebookUrl}
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg="8">
                  <Card className="mb-4">
                    <Card.Body>
                      <Row>
                        <Col sm="3">Full Name</Col>
                        <Col sm="9" className="text-muted">
                          {user?.user?.name}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Email</Col>
                        <Col sm="9" className="text-muted">
                          {user?.user?.email}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Mobile</Col>
                        <Col sm="9" className="text-muted">
                          {user?.user?.phone}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Address</Col>
                        <Col sm="9" className="text-muted">
                          {user?.user?.address}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="mb-4">
                    <p
                      className="p-3 text-muted"
                      style={{ height: "184px", overflow: "auto" }}
                    >
                      <sup>
                        {" "}
                        <FaQuoteLeft
                          style={{
                            color: "var(--blueThemeColor)",
                            fontSize: "15px",
                          }}
                        />
                      </sup>{" "}
                      {user?.user?.description}
                      <sup>
                        {" "}
                        <FaQuoteRight
                          style={{
                            color: "var(--blueThemeColor)",
                            fontSize: "15px",
                          }}
                        />
                      </sup>
                    </p>
                  </Card>
                  <Row>
                    <EducationElement />
                    <ExperienceElement />
                  </Row>
                </Col>
              </Row>
              <Row className="my-5">
                <ProjectElement />
              </Row>
            </Container>
          </section>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
