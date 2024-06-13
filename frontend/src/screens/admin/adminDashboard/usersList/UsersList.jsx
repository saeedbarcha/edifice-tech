import { useState } from "react";
import { Card } from "react-bootstrap";
import "./UsersList.css";

const UsersList = ({ data, title }) => {

  return (
    <div className="topUserCont my-2">
      <div className="topUserTitleCont">
        <h5>{title}</h5>
      </div>
      <div style={{height:"235px", width:"90%" , overflowY: "auto"}} className="scrollerCont p-auto" >
      {data?.map((user) => (
          <Card className=" m-auto my-1 userDetailCont">
            <Card.Body className="userCardBody" style={{ height: "10px" }}>
              <div className="imgNameCont ">
                <img src={user?.image} alt="user" className="userProImage" />
                <h5 className="">{user?.name}</h5>
              </div>
              <p className="m-0 d-flex align-items-center">{user?.isAdmin ? "Admin" : (!user?.isAdmin && user?.isTeamMember) ? "Team Member" : "User"}</p>
            </Card.Body>
          </Card>
        ))
        }

      </div>
     

    </div>
  );
};

export default UsersList;
