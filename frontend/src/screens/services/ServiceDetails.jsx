import React from "react";
import {
  Breadcrumb,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ServicesData from "./servicesData.js";

function ServiceDetails() {
  const { id } = useParams();
  const filterData = ServicesData.find((val) => val._id == id);
  return (
    <div
      style={{
        backgroundImage:
          'url("https://www.pexels.com/photo/close-up-photo-of-programming-of-codes-546819/")',
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Navbar
        className="site-header sticky-top py-1"
        bg="light"
        expand="md"
        style={{ zIndex: "10" }}
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {ServicesData.map((service) => (
                <Link
                  to={`/services/${service._id}`}
                  key={service._id}
                  style={{ textDecoration: "none" }}
                >
                  {service.title}
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-light">
        <Container>
          <Row className="">
            <Col md={12}>
              <h1 className="display-4 font-weight-normal">
                {filterData.title}
              </h1>
              <p className="lead font-weight-normal">
                {filterData.description}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-md-3 pl-md-3" sty>
        <Row className="justify-content-md-center">
          <Col
            md={6}
            className=" text-white pt-3 px-3 pt-md-5 px-md-5 text-center"
            style={{ backgroundColor: "var(--blueThemeColor)" }}
          >
            <div className="my-3 py-1">
              <h1 className="display-4 font-weight-normal">
                {filterData.title}
              </h1>
              <p className="lead">And an even wittier subheading.</p>
            </div>
            <div className=" box-shadow mx-auto">
              
              <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  src={filterData.youtubeUrl}
                  style={{
                    width: "100%",
                    height: "54vh",
                    borderRadius: "21px",
                  }}
                ></iframe>
              </div>
            </div>
          </Col>
          <Col
            md={6}
            className="bg-light pt-3 px-3 pt-md-5 px-md-5 text-center"
          >
            <div className="my-3 p-3">
              <h1 className="display-4 font-weight-normal">
                {filterData.title}
              </h1>
              <p className="lead">And an even wittier subheading.</p>
            </div>
            <div
              className=" box-shadow mx-auto"
              style={{
                width: "80%",
                height: "300px",
              }}
            >
              <img
                src={filterData.image}
                alt=""
                style={{
                  width: "100%",
                  height: "54vh",
                  borderRadius: "21px",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      {/* Other sections */}
    </div>
  );
}
export default ServiceDetails;