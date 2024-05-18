import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MdLocationOn, MdOutlinePhoneEnabled, MdEmail } from "react-icons/md";

import "./contact.css";

const ContactScreen = () => {
  return (
    <section id="contact" className="contact">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>

        <div>
          <iframe
            title="Google Map"
            style={{ border: "0", width: "100%", height: "270px" }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <Row className="mt-5">
          <Col lg={4}>
            <div className="info">
              <div className="address">
                <MdLocationOn className="icons" />
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>

              <div className="email">
                <MdEmail className="icons" />
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone">
                <MdOutlinePhoneEnabled className="icons" />
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>
            </div>
          </Col>

          <Col lg={8} className="mt-5 mt-lg-0">
            <Form className="php-email-form">
              <Row>
                <Col md={6} className="form-group">
                  <Form.Control
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </Col>
                <Col md={6} className="form-group mt-3 mt-md-0">
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </Col>
              </Row>
              <Form.Group className="mt-3">
                <Form.Control
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                />
              </Form.Group>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" className="btnAllScreen">Send Message</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactScreen;
