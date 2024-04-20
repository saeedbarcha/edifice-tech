import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name){
      toast.error("Name is required");
      return;
    }else if ( !email){
      toast.error("E-mail is required");
      return;
    }else if ( !password ){
      toast.error("Password is required");
      return;
    }else if ( !confirmPassword ){
      toast.error("Confirm password is required");
      return;
    }else if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    } 
    else if (!companyCode) {
      toast.error("Company code is required");
      return;
    }else {
      try {
        const res = await register(
          
          // 
          {
            name,
            email,
            password,
            companyCode,
            phone:"",
            dateOfBirth:"",
            gender,
            address:"",
            designation:"",
            description:"",
            fiverrUrl:"",
            upworkUrl:"",
            facebookUrl:"",
            instagramUrl:"",
            linkedInUrl:"",
            education:
              {
                instituteName: "",
                degree: "",
                course: "",
                date: "",
              },
            experience:{
                instituteName: "",
                designation: "",
                joiningDate: "",
                endingDate: "",
              },
            projects: {
                projectTitle: "",
                projectUrl: "",
                projectDecription: "",
                projectImage: "",
              },
            
          }
          // 
         ).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="py-4">
      <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="phone" className="my-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="dateOfBirth" className="my-3">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date-Of-Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId="gender" className="my-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                  <option value="Male">
                   Male
                  </option>
                  <option value="Female">
                   Female
                  </option> 
                  <option value="Other">
                   Other
                  </option>
              </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="address" className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId="companyCode" className="my-3">
            <Form.Label>Company Code </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company code"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-2  "
            disabled={isLoading}
          >
            Sign Up
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login{" "}
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;
