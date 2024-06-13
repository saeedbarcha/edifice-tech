import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useGetMemberUserQuery } from "../../slices/usersApiSlice";
import "./Team.css";

const TeamScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetMemberUserQuery();

  const cardVariants = {
    hidden: { opacity: 0.5, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };

  return (
    <section id="team" className="team">
      <Container>
        <div className="section-title">
          <h2>Team</h2>
          <p>Check our Team</p>
        </div>
        <Row>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {users?.length === 0 &&
                <p>No any active team member found</p>}
              {users?.map((user, index) => (

                <Col md={4} lg={3} className="d-flex align-items-stretch justify-content-around ">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    <div
                      className="member"
                    >

                      <div className="member-img">
                        <Link
                          className="m-auto"
                          to={`/member/${user?._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Image
                            src={user?.image ? user?.image : `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${user?.gender === "Male" ? 3 : 4}.webp`}
                            className="img-fluid"
                            style={{ width: "316px" }}
                            fluid
                            alt="♀️"
                          />

                        </Link>
                        <div className="social">
                          <a href={user?.linkedInUrl}>
                            <AiFillLinkedin />
                          </a>
                          <a href={user?.facebookUrl}>
                            <BsFacebook />
                          </a>
                          <a href={user?.instagramUrl}>
                            <AiFillInstagram />
                          </a>
                        </div>
                      </div>
                      <div className="member-info">
                        <h4>{user?.name}</h4>
                        <span>{user?.designation}</span>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TeamScreen;
