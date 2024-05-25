import { Container, Row, Col, Button } from "react-bootstrap";
import "./Services.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
          {responseData?.activeServices?.length > 0 &&
            <Link to={`/service/page/${1}`} style={{ display: "flex", justifyContent: "center", textDecoration: "none" }} className="mt-2">
              <Button className="btn-sm my-3 btnSeeMore px-3 m-auto">
                See More
              </Button>
            </Link>
          }
        </Row>
      </Container>
    </section>
  );
};
export default ServicesScreen;