import { Container, Row, Col } from "react-bootstrap";
import "./Services.css";
import { Link } from "react-router-dom";
import {Image} from "react-bootstrap"
import { useGetActiveServicesQuery } from "../../slices/serviceApiSlice.js";

const ServicesScreen = () => {
  const { data: allService, isLoading, error, refetch } = useGetActiveServicesQuery();

  return (
    <section id="contact" className="contact">
      <Container>
        <div className="section-title">
          <h2>Services</h2>
          <p>CHECK OUR SERVICES</p>
        </div>
        <Row className="wrapper">
          {allService?.map((service, index) => {
            return (
              <Col sm={6} lg={3} className="mt-4" key={index}>
                <Link to={`/services/${service._id}`} style={{ textDecoration: "none" }}>
                  <div className="showCardCont">
                    <div className="iconCont"><Image style={{width:"100%" , borderRadius:"inherit"}} src={service.iconImage} /></div>
                    <h4 className="serviceHeading">{service?.title}</h4>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
export default ServicesScreen;