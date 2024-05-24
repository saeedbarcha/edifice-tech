import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { CgProfile, CgMail } from "react-icons/cg";
import { BsGrid3X3GapFill } from "react-icons/bs";
import {
  FaUser,
  FaSignOutAlt,
  FaPhoneAlt,
  FaBookOpen,
} from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import "./Header.css";
import { MdOutlineArrowUpward } from "react-icons/md";
import CompanyData from "../../data/companyData";
import logoImg from "./logo192.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Error...", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section id="topbar" className="d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between ">
          <div className="contact-info d-flex align-items-center">
            <CgMail />
            <a
              href={`mailto:${CompanyData?.emailAddress
                  ? CompanyData.emailAddress
                  : "contact@example.com"
                }`}
            >
              {CompanyData?.emailAddress
                ? CompanyData.emailAddress
                : "contact@example.com"}
            </a>

            <FaPhoneAlt style={{ marginLeft: "15px" }} />
            <span>
              {CompanyData?.phone ? CompanyData.phone : "+923000000000"}
            </span>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a
              href={
                CompanyData?.facebookPageUrl ? CompanyData.facebookPageUrl : "#"
              }
              className="twitter"
            >
              <AiFillTwitterCircle />
            </a>
            <a
              href={
                CompanyData?.facebookPageUrl ? CompanyData.facebookPageUrl : "#"
              }
              className="facebook"
            >
              <AiFillFacebook />
            </a>
            <a
              href={
                CompanyData?.instagramPageUrl
                  ? CompanyData.instagramPageUrl
                  : "#"
              }
              className="instagram"
            >
              <AiFillInstagram />
            </a>
            <a
              href={
                CompanyData?.linkedInPageUrl ? CompanyData.linkedInPageUrl : "#"
              }
              className="linkedin"
            >
              <AiFillLinkedin />
            </a>
          </div>
        </div>
      </section>
      <Navbar
        id="header"
        expand="md"
        className={`${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""
          }`}
      >
        <Container fluid className="navContainer" >
          <div id="logo" >
            <Navbar.Brand>
              <Link to="/">
                {/* <Image className="logoImg" src={CompanyData?.logoImage ?  CompanyData.logoImage : logoImg} /> */}

                <Image className="logoImg" src={CompanyData?.logoImage} />
                {/* <h2>
                3Beez<span>Tech</span>
              </h2> */}
              </Link>
            </Navbar.Brand>
          </div>

          <Navbar.Toggle className="" onClick={toggleMenu}>
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0" >
            <Nav>
              <LinkContainer to="/">
                <Nav.Link smooth>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link smooth>About</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/policy">
                <Nav.Link smooth>Policy</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blogs">
                <Nav.Link smooth>Blog</Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/dashboard">
                    <Nav.Link
                      smooth
                      className="justify-content-start dropdown-item"
                    >
                      <BsGrid3X3GapFill className="mx-2" />
                      Dashborad
                    </Nav.Link>
                  </LinkContainer>                
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <Nav.Link
                      className="justify-content-start dropdown-item"
                      smooth
                    >
                      <CgProfile className="mx-2" />
                      Profile
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to={`/my-enrollments/${userInfo._id}`}>
                    <Nav.Link smooth className="justify-content-start dropdown-item">
                      <FaBookOpen className="mx-2" />
                      Enrollment
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link
                    onClick={logoutHandler}
                    className="justify-content-start dropdown-item"
                    smooth
                  >
                    <FaSignOutAlt className="mx-2" />
                    Logout
                  </Nav.Link>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link
                    className="justify-content-start dropdown-item"
                    smooth
                  >
                    <FaUser className="mx-2" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/contact">
                <Nav.Link smooth>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className={`back-to-top ${scrolled ? "active" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <MdOutlineArrowUpward />
      </div>
    </>
  );
};

export default Header;
