import { Link, useParams } from "react-router-dom";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import ServicesData from "../services/servicesData.js";
import "./style.css";
import CompanyData from "../../data/companyData.js";

const HeroCarousel = () => {
  const selectedElements = ServicesData.slice(0, 4);
  return (
    <>
        <section
          id="hero"
          className="d-flex align-items-center justify-content-center"
        >
          <Container data-aos="fade-up">
            <Row
              className="justify-content-center"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <Col xl={6} lg={8}>
                <h1>
                  Powerful Digital Solutions With <span style={{ color: "var(--blueThemeColor)" }}>
                  {CompanyData?.firstName  ? CompanyData?.firstName :"F-name"}  {CompanyData?.lastName  ? CompanyData?.lastName :"L-name"}
                  </span>
                </h1>
                <h2>{CompanyData?.slogen  ? CompanyData?.slogen :"your slogen"}</h2>
              </Col>
            </Row>

            <Row
              className="gy-4 mt-5 justify-content-center"
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              {selectedElements.map((service) => (
                <Col xl={2} md={4}>
                  <Link
                    to={`/services/${service._id}`}
                    style={{ textDecoration: "none",   color: "#fff" }}
                  >
                    <div
                      className="icon-box"
                      style={{
                        textDecoration: "none",
                        borderRadius: "40px",
                      }}
                    >
                      <i className="ri-store-line"></i>
                      <h3>{service.title}</h3>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </>

  );
};

export default HeroCarousel;
