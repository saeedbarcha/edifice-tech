import { Container, Row, Col, Button } from "react-bootstrap";
import "./Services.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Image } from "react-bootstrap"
import { useGetActiveServicesQuery } from "../../slices/serviceApiSlice.js";
import {
  MdDesignServices,
  MdOutlineSettingsSuggest,
  MdAppSettingsAlt,
  MdSocialDistance,
  MdOutlineAnimation,
} from "react-icons/md";

const ServicesScreen = () => {
  const { keyword, pageNumber } = useParams();
  const page = pageNumber || 1;

  const { data: responseData, isLoading, error, refetch } = useGetActiveServicesQuery({ pageNumber: page });
  const iconStyle = {
    width: "45px",
    height: "45px",
    color: "var(--mainThemeColor)",
  };


  const cardVariants = {
    hidden: { opacity: 0.6, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };

  return (
    <section id="contact" className="contact">
      <Container>
        <div className="section-title">
          <h2>Services</h2>
          <p>CHECK OUR SERVICES</p>
        </div>
        <Row className="wrapper">
          {responseData?.activeServices?.length === 0 &&
            <p>No any active service found</p>}
          {responseData?.activeServices?.map((service, index) => {
            return (
              <Col sm={6} lg={3} className="mt-4" key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <Link  to={`/services/${service._id}`} style={{ textDecoration: "none" }}>
                    <div className="showCardCont">
                       <div className="iconCont"> <MdAppSettingsAlt style={iconStyle} /></div>
                      <h4 className="serviceHeading">{service?.title}</h4>
                    </div>
                  </Link>
                </motion.div>
              </Col>
            );
          })}
          {responseData?.activeServices?.length > 0 &&
            <Link to={`/service/page/${1}`} style={{ display: "flex", justifyContent: "center", textDecoration: "none" }} className="mt-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <Button className="btn-sm my-3 btnSeeMore px-3 m-auto">
                  See More
                </Button>
              </motion.div>
            </Link>
          }
        </Row>
      </Container>
    </section >
  );
};
export default ServicesScreen;