import { useState } from "react";
import { Card } from "react-bootstrap";
import "./UsersList.css";

const UsersList = ({data, title}) => {
  
  return (
    <div className="topUserCont">
      <div className="topUserTitleCont">
        <h5>{title}</h5>
      </div>

      <Card className="userDetailCont">
        <Card.Body className="userCardBody" style={{height:"10px"}}>
          <div className="imgNameCont ">
            {/* <img src={logo} alt="user" className="userProImage" /> */}
            <h5 className="">red car</h5>
          </div>
          <p className="m-0 d-flex align-items-center">43</p>
        </Card.Body>
      </Card>
      <Card className="userDetailCont">
        <Card.Body className="userCardBody" style={{height:"10px"}}>
          <div className="imgNameCont ">
            {/* <img src={logo} alt="user" className="userProImage" /> */}
            <h5 className="">red car</h5>
          </div>
          <p className="m-0 d-flex align-items-center">43</p>
        </Card.Body>
      </Card>
      <Card className="userDetailCont">
        <Card.Body className="userCardBody" style={{height:"10px"}}>
          <div className="imgNameCont ">
            {/* <img src={logo} alt="user" className="userProImage" /> */}
            <h5 className="">red car</h5>
          </div>
          <p className="m-0 d-flex align-items-center">43</p>
        </Card.Body>
      </Card>
      <Card className="userDetailCont">
        <Card.Body className="userCardBody" style={{height:"10px"}}>
          <div className="imgNameCont ">
            {/* <img src={logo} alt="user" className="userProImage" /> */}
            <h5 className="">red car</h5>
          </div>
          <p className="m-0 d-flex align-items-center">43</p>
        </Card.Body>
      </Card>
   
    </div>
  );
};

export default UsersList;
