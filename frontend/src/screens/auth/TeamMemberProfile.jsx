import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";

import { BiLogoUpwork } from "react-icons/bi";
import { TbBrandFiverr } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetTeamMemberDetailsQuery } from "../../slices/usersApiSlice";
import "./style.css";
const TeamMemberProfile = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const {
    data: userInfo,
    isLoading,
    refetch,
    error,
  } = useGetTeamMemberDetailsQuery(userId);

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
              <Row>
                <Col lg="4">
                  <Card className="mb-4">
                    <Card.Body className="text-center">
                      <Card.Img
                        src={userInfo?.user.image ? userInfo.user.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                      <h3>{userInfo?.user?.name}</h3>
                      <p className="text-muted mb-1">{userInfo?.user?.skill}</p>
                      <p className="text-muted mb-4">
                        {userInfo?.user?.address}
                      </p>
                      <div className="d-flex justify-content-center mb-2">
                       
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-4 mb-lg-0">
                    <Card.Body className="p-0">
                      <ListGroup variant="flush" className="rounded-3">
                        <ListGroup.Item className="d-flex  align-items-center p-3">
                          <h5>Social Links</h5>
                        </ListGroup.Item>
                        {userInfo?.user?.fiverrUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <TbBrandFiverr
                              className=""
                              style={{ color: "#1DBF73", marginRight: "14px" }}
                            />
                            {userInfo?.user?.fiverrUrl}
                          </ListGroup.Item>
                        )}

                        {userInfo?.user?.upworkUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <BiLogoUpwork
                              style={{ color: "#6fda44", marginRight: "14px" }}
                            />
                            {userInfo?.user?.upworkUrl}
                          </ListGroup.Item>
                        )}

                        {userInfo?.user?.githubUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaGithub
                              className=""
                              style={{ marginRight: "14px" }}
                            />
                            {userInfo?.user?.githubUrl}
                          </ListGroup.Item>
                        )}

                        {userInfo?.user?.linkedInUrl && (
                          <ListGroup.Item className="d-flex align-items-center p-3">
                            <FaLinkedin
                              style={{ color: "#0077b5", marginRight: "14px" }}
                            />
                            {userInfo?.user?.linkedInUrl}
                          </ListGroup.Item>
                        )}

                        {userInfo?.user?.instagramUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaInstagram
                              style={{ color: "#ac2bac", marginRight: "14px" }}
                            />
                            {userInfo?.user?.instagramUrl}
                          </ListGroup.Item>
                        )}

                        {userInfo?.user?.facebookUrl && (
                          <ListGroup.Item className="d-flex  align-items-center p-3">
                            <FaFacebook
                              style={{ color: "#3b5998", marginRight: "14px" }}
                            />
                            {userInfo?.user?.facebookUrl}
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
                          {userInfo?.user?.name}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Email</Col>
                        <Col sm="9" className="text-muted">
                          {userInfo?.user?.email}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Mobile</Col>
                        <Col sm="9" className="text-muted">
                          {userInfo?.user?.phone}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col sm="3">Address</Col>
                        <Col sm="9" className="text-muted">
                          {userInfo?.user?.address}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="mb-4">
                    <p
                      className="p-3 text-muted"
                      style={{ height: "223px", overflow: "auto" }}
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
                      {userInfo?.user?.description}
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
                    <Col md="6">
                      <Card className="mb-4 mb-md-0">
                        <Card.Header>
                          <span className="text-primary font-italic me-1">
                            Education
                          </span>
                        </Card.Header>
                        <Card.Body
                          className="scrollerCont"
                          style={{ height: "190px", overflowY: "auto" }}
                        >
                          <Card.Text className="mb-4">
                            {userInfo?.education?.map((edu, index) => (
                              <Card className="my-4 scrollerCont" key={index}>
                                <Card.Body>
                                  <Card.Text className="">
                                    <p>
                                      {" "}
                                      {edu.degree} in {edu.course} from{" "}
                                      <span style={{ fontSize: "22px" }}>
                                        {" "}
                                        {edu.instituteName}
                                      </span>
                                    </p>
                                    <p>Date: {edu.date}</p>
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            ))}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md="6">
                      <Card className="mb-4 mb-md-0">
                        <Card.Header>
                          <span className="text-primary font-italic me-1">
                            Experience
                          </span>
                        </Card.Header>
                        <Card.Body
                          className="scrollerCont"
                          style={{ height: "190px", overflowY: "auto" }}
                        >
                          <Card.Text className="mb-4"></Card.Text>
                          {userInfo?.experience.map((exp, index) => (
                            <Card className="my-4 " key={index}>
                              <Card.Body>
                                <Card.Text className="">
                                  <p>
                                    {exp.designation} at{" "}
                                    <span style={{ fontSize: "22px" }}>
                                      {" "}
                                      {exp.instituteName}
                                    </span>
                                  </p>
                                  <p>
                                    from: {exp.joiningDate} to:{exp.endingDate}
                                  </p>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          ))}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="my-4">
                {userInfo?.projects.lenght > 0 && <h2>my projects</h2>}
                {userInfo?.projects?.map((pro, index) => (
                  <Col lg="6">
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>{pro?.title} </Card.Title>
                        <Card.Text>
                          <a href={pro.url}>{pro.url}</a>
                        </Card.Text>
                        <Card.Text>{pro.description}</Card.Text>
                      </Card.Body>
                      <Card.Img
                        variant="bottom"
                        src={pro.image}
                        alt={pro.title}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        </>
      )}
    </div>
  );
};

export default TeamMemberProfile;
