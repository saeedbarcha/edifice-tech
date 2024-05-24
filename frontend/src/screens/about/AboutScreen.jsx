import React from "react";
import aboutImg from "./about.jpeg";
import aboutImg2 from "./hero-img.svg";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillCheckCircle,
} from "react-icons/ai";
import "./AboutScreen.css";

const AboutScreen = () => {
  return (
    <section id="about" className="about">
      <Container data-aos="fade-up">
        <Row>
          <Col lg={6} className="order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src={aboutImg2} className="img-fluid animated" alt="About us" />
          </Col>
          <Col lg={6} className="pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <h3>Empowering Your Business with Innovative Tech Solutions</h3>
            <p className="fst-italic">
              At our company, we specialize in delivering cutting-edge tech services and comprehensive courses designed to help you stay ahead in the technology landscape.
            </p>
            <ul>
              <li><AiFillCheckCircle className="listIconsStyle" /> Custom software development tailored to your needs.</li>
              <li><AiFillCheckCircle className="listIconsStyle" /> Expert consulting services to guide your tech strategy.</li>
              <li><AiFillCheckCircle className="listIconsStyle" /> Professional training and certification courses.</li>
            </ul>
            <p>
              Our mission is to provide top-notch tech solutions that drive business success. Whether you're looking to streamline operations, enhance your digital presence, or upskill your team, we have the expertise and resources to help you achieve your goals.
            </p>
           
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutScreen;
