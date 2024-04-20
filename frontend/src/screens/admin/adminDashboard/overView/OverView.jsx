import { useState } from "react";

import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers, FaBlogger, FaBookMedical } from "react-icons/fa";
import {  MdProductionQuantityLimits, MdMedicalServices } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
// import { useGetOrdersQuery } from "../../../slices/orderApiSlice";
import { Row, Col } from "react-bootstrap";
import "./OverView.css";

const OverView = () => {
  const [filter, setFilter] = useState("Till Now");
  // const { data: orders, isLoading, error } = useGetOrdersQuery();

  // let filteredOrders = orders;
  // const oneDay = 24 * 60 * 60 * 1000;
  // const currentDate = new Date();

  // if (filter === "Last Week") {
  //   const oneWeekAgo = new Date(currentDate - 7 * oneDay);
  //   filteredOrders = orders?.filter(
  //     (order) => new Date(order.createdAt) > oneWeekAgo
  //   );
  // } else if (filter === "Last Month") {
  //   const oneMonthAgo = new Date(
  //     currentDate.setMonth(currentDate.getMonth() - 1)
  //   );
  //   filteredOrders = orders?.filter(
  //     (order) => new Date(order.createdAt) > oneMonthAgo
  //   );
  // }

  // console.log("orders Admin", orders);
  return (
    <>
      <div class="overView">
        <Row>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                <RiTeamLine className="adminCartIcons" />{" "}
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Members</p>
                <h2 class="topCartValue">100 </h2>
              </div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                <FaUsers className="adminCartIcons" />
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Users</p>
                <h2 class="topCartValue">12 </h2>
              </div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                {" "}
                <FaBlogger className="adminCartIcons" />
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Blogs</p>
                <h2 class="topCartValue">100</h2>
              </div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                <MdProductionQuantityLimits className="adminCartIcons" />
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Products</p>
                <h2 class="topCartValue">100</h2>
              </div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                {" "}
                <FaBookMedical className="adminCartIcons" />
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Courses</p>
                <h2 class="topCartValue">44</h2>
              </div>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div class="topCartCont">
              <div className="iconAdminCont">
                {" "}
                <MdMedicalServices className="adminCartIcons" />
              </div>
              <div className="titleAndValueCont">
                <p class="topCartTitle">Services</p>
                <h2 class="topCartValue">44</h2>
              </div>
            </div>
          </Col>
       
        </Row>
      </div>
    </>
  );
};

export default OverView;
