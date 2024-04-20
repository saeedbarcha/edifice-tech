import aboutImg from "./about.jpeg"
import aboutImg2 from "./hero-img.svg"

import { Container, Row, Col, Image } from "react-bootstrap";
import "./AboutScreen.css"
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
const AboutScreen = () => {
  return (
    <section id="about" className="about">
      <Container data-aos="fade-up">
        <Row>
          <Col lg={6} order={1} className="order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src={aboutImg2} class="img-fluid animated" alt=""/>
          </Col>
          <Col lg={6} className="pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <ul>
              <li><AiFillInstagram  className="listIconsStyle"/> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><AiFillInstagram className="listIconsStyle" /> Duis aute irure dolor in reprehenderit in voluptate  velit.</li>
              <li><AiFillInstagram className="listIconsStyle" /> Duis aute irure dolor in reprehenderit in voluptate velit.</li>

              
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutScreen;
