import { Col, Container, Row, Image } from 'react-bootstrap';
import "./CountsSection.css";
import backImg from "./counts-img.jpg";
import { ImHappy } from "react-icons/im";
import { GrProjects } from "react-icons/gr";
import { LiaAwardSolid } from "react-icons/lia";
import { GiGiftOfKnowledge } from "react-icons/gi";
const CountsSection = () => {
  return (
    <section id="counts" className="counts">
      <Container data-aos="fade-up">
        <Row className="no-gutters">
          <Col xl={5} className="d-flex align-items-stretch justify-content-center justify-content-lg-start" data-aos="fade-right" data-aos-delay="100">
          <Image src={backImg} fluid/>
          </Col>
          <Col xl={7} className="ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch" data-aos="fade-left" data-aos-delay="100">
            <div className="content d-flex flex-column justify-content-center">
              <h3>Voluptatem dignissimos provident quasi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
              </p>
              <Row>
                <Col md={6} className="d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <ImHappy className="iconInCount" />
                    <span >4</span>
                    <p><strong>Happy Clients</strong> consequuntur voluptas nostrum aliquid ipsam architecto ut.</p>
                  </div>
                </Col>

                <Col md={6} className="d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <GrProjects className="iconInCount" />
                    <span >4</span>
                    <p><strong>Projects</strong> adipisci atque cum quia aspernatur totam laudantium et quia dere tan</p>
                  </div>
                </Col>

                <Col md={6} className="d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <GiGiftOfKnowledge className="iconInCount" />
                    <span >4</span>
                    <p><strong>Years of experience</strong> aut commodi quaerat modi aliquam nam ducimus aut voluptate non vel</p>
                  </div>
                </Col>

                <Col md={6} className="d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <LiaAwardSolid className="iconInCount" />
                    <span >4</span>
                    <p><strong>Awards</strong> rerum asperiores dolor alias quo reprehenderit eum et nemo pad der</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CountsSection;
