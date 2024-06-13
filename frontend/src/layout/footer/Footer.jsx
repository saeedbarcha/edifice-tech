import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillGoogleCircle,
} from "react-icons/ai";
import CompanyData from "../../data/companyData";

const Footer = () => {
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    window.addEventListener("scroll", toggleBacktotop);
  }
  const ensureUrlProtocol = (url) => {
    if (url && !/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <>
      <footer>
        <div className="footerArea">
          <Container>
            <Row>
              <Col md={4}>
                <div className="footerContent">
                  <div className="footerHead">
                    <div className="footerLogo">
                      <h2>
                        <span>
                          {CompanyData.firstName
                            ? CompanyData.firstName
                            : "F-name"}{" "}
                        </span>
                        {CompanyData.lastName ? CompanyData.lastName : "l-name"}
                      </h2>
                    </div>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis.
                    </p>
                    <div className="footerIconCont">
                      <ul>
                        <li>
                          <a
                            href={ensureUrlProtocol(
                              CompanyData.facebookPageUrl
                                ? CompanyData.facebookPageUrl
                                : "#"
                            )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsFacebook />
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              ensureUrlProtocol(
                                CompanyData.instagramPageUrl
                                  ? CompanyData.instagramPageUrl
                                  : "#"
                              )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <AiFillInstagram />
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              ensureUrlProtocol(
                                CompanyData.twitterPageUrl
                                  ? CompanyData.twitterPageUrl
                                  : "#"
                              )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <AiFillTwitterCircle />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${CompanyData?.emailAddress
                                ? CompanyData.emailAddress
                                : "contact@example.com"
                              }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            <AiFillGoogleCircle />
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              ensureUrlProtocol(
                                CompanyData.linkedInPageUrl
                                  ? CompanyData.linkedInPageUrl
                                  : "#"
                              )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <AiFillLinkedin />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="footerContent">
                  <div className="footerHead">
                    <h4>information</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </p>
                    <div className="footerContacts">
                      <p>
                        <span>Tel:</span> +123 456 789
                      </p>
                      <p>
                        <span>Email:</span> contact@example.com
                      </p>
                      <p>
                        <span>Working Hours:</span> 9am-5pm
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="footerContent">
                  <div className="footerHead">
                    <h4>Useful Links</h4>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <Link to="/">
                          <IoMdArrowDropright className="footerIcons" />
                          <h6>Home</h6>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about">
                          <IoMdArrowDropright className="footerIcons" />
                          <h6>About</h6>
                        </Link>
                      </li>
                      <li>
                        <Link to="/policy">
                          <IoMdArrowDropright className="footerIcons" />
                          <h6>Policy</h6>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs">
                          <IoMdArrowDropright className="footerIcons" />
                          <h6>Blog</h6>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <IoMdArrowDropright className="footerIcons" />
                          <h6>Gallery</h6>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="footerBottomCont">
            <Row className="">
              <Col>
                <div className="copyright text-center">
                  <p >
                    &copy; Copyright <strong>Edifice Tech</strong>. All Rights Reserved
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
};
export default Footer;
