import aboutImg from "./about.jpeg"
import {  Row, Col } from "react-bootstrap";

const PolicyScreen = () => {
  return (
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={aboutImg}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
  );
};

export default PolicyScreen;
