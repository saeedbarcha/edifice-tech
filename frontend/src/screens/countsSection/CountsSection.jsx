import React from 'react';
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
          <Col xl={6} className="d-flex align-items-stretch justify-content-center justify-content-lg-start" data-aos="fade-right" data-aos-delay="100">
            <Image src={backImg} fluid/>
          </Col>
          <Col xl={6} className=" d-flex align-items-stretch" data-aos="fade-left" data-aos-delay="100">
            <div className="content d-flex flex-column justify-content-center">
              <h3>Achievements</h3>
              <p>
                Over the years, we've achieved significant milestones and received recognition for our dedication to excellence. Here are some of our proudest achievements:
              </p>
              <Row >
                <Col md={5} className="d-md-flex align-items-md-stretch achivementCards">
                  <div className="count-box">
                    <ImHappy className="iconInCount" />
                    <span >100+</span>
                    <p><strong>Happy Clients</strong> have trusted us with their projects and solutions, ensuring their satisfaction and success.</p>
                  </div>
                </Col>

                <Col md={5} className="d-md-flex align-items-md-stretch achivementCards">
                  <div className="count-box">
                    <GrProjects className="iconInCount" />
                    <span >50+</span>
                    <p><strong>Projects Completed</strong> ranging from bespoke software development to comprehensive digital transformations.</p>
                  </div>
                </Col>

                <Col md={5} className="d-md-flex align-items-md-stretch achivementCards">
                  <div className="count-box">
                    <GiGiftOfKnowledge className="iconInCount" />
                    <span >10+</span>
                    <p><strong>Years of Experience</strong> in the tech industry, honing our expertise and refining our approach to deliver excellence.</p>
                  </div>
                </Col>

                <Col md={5} className="d-md-flex align-items-md-stretch achivementCards">
                  <div className="count-box">
                    <LiaAwardSolid className="iconInCount" />
                    <span >20+</span>
                    <p><strong>Awards and Recognitions</strong> acknowledging our commitment to innovation, quality, and client satisfaction.</p>
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
