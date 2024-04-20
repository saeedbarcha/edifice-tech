import React, { useState, useEffect } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import { Container, Row, Col, Image } from "react-bootstrap";
import bgImage from "./bg.jpg";

import "./WhoWeAre.css";

const WhoWeAre = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconStyle = {
    width: "45px",
    height: "45px",
    color: "var(--mainThemeColor)",
  };

  return (
    <>
      {/* <Container fluid className="my-5 whoWeAre"> */}
        <Container className="my-5 whoWeAreWrapper py-5" style={{ minHeight:"450px", padding:"25px", background: `linear-gradient(rgba(188, 64%, 54%, 0.65), rgba(29, 205, 89, 0.2)), url(${bgImage}) fixed center center`}}>  
        <Row className="flex justify-content-center align-items-center">
          <Col md={6} className="flex whoWeAreTitleAndIcon">
            <h2 className="titleWhoWeAre text-center">Who We Are ?</h2>
            {windowWidth > 920 && (
              <MdOutlineQuestionMark
                style={{
                  width: "150px",
                  height: "150px",
                  color: "#1B254B",
                  borderRadius: "50%",
                }}
                className="questionMarK"
              />
            )}
            <p className="slogan">
              Our center has been presentfor over 40 years in the market.
            </p>
          </Col>

          <Col md={6} className="flex whoWeAreText">
            <p>
              It’s a story of three decades, more than a quarter of a century.
              It’s a tale of a dream realized against all odds. It’s a story of
              three decades.
            </p>
            <p>
              It’s a story of three decades, more than a quarter of a century.
              It’s a tale of a dream realized against all odds. It’s a story of
              three decades, more than a quarter of a century.
            </p>
            <p>
              It’s a story of three decades, more than a quarter of a century.
              It’s a tale of a dream realized against all odds.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhoWeAre;
