import { Container, Row, Col } from "react-bootstrap";
import "./Services.css";
import { Link } from "react-router-dom";
import {Image} from "react-bootstrap"
import { useGetActiveServicesQuery } from "../../slices/serviceApiSlice.js";
import {
  MdDesignServices,
  MdOutlineSettingsSuggest,
  MdAppSettingsAlt,
  MdSocialDistance,
  MdOutlineAnimation,
} from "react-icons/md";

const ServicesScreen = () => {
  const { data: allService, isLoading, error, refetch } = useGetActiveServicesQuery();
  const iconStyle = {
    width: "45px",
    height: "45px",
    color: "var(--mainThemeColor)",
  };
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
                    {/* <div className="iconCont"><Image style={{width:"100%" , borderRadius:"inherit"}} src={service.iconImage} /> {}</div> */}
                    <div className="iconCont"> <MdAppSettingsAlt style={iconStyle} /></div>
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