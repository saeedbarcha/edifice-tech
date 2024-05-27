import { Link, useParams } from "react-router-dom";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import ServicesData from "../services/servicesData.js";
import { motion } from "framer-motion";
import "./style.css";
import CompanyData from "../../data/companyData.js";
import { useGetActiveServicesQuery } from "../../slices/serviceApiSlice.js";


const HeroCarousel = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const { data: responseData, isLoading, error, refetch } = useGetActiveServicesQuery({ keyword, pageNumber: page });

  const selectedElements = responseData?.activeServices?.slice(0, 4);


  const cardVariants = {
    hidden: { opacity: 0.6, x: 120 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } }
  };

  const nameVariants = {
    hidden: { opacity: 0.6, y: -150 },
    visible: { opacity: 1, y: -0, transition: { duration: 1.5 } }
  };
  
  const slogenVariants = {
    hidden: { opacity: 0.6, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };

 
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
            <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={nameVariants}
                  >
              <h1>
                Powerful Digital Solutions With <span style={{ color: "var(--blueThemeColor)" }}>
                  {CompanyData?.firstName ? CompanyData?.firstName : "F-name"}  {CompanyData?.lastName ? CompanyData?.lastName : "L-name"}
                </span>
              </h1>
              </motion.div>

              <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={slogenVariants}
                  >

                 
              <h2>{CompanyData?.slogen ? CompanyData?.slogen : "your slogen"}</h2>
              </motion.div>

            </Col>
          </Row>

          <Row
            className="gy-4 mt-5 justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            {selectedElements?.map((service) => (
              <Col xl={2} md={4}>
                <Link
                  to={`/services/${service._id}`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    <div
                      className="icon-box"
                      style={{
                        textDecoration: "none",
                        borderRadius: "40px",
                      }}
                    >
                      <h3 style={{height:"2.5rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{service.title}</h3>
                    </div>
                  </motion.div>
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
