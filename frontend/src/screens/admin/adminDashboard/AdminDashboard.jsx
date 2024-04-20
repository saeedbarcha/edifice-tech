import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

import { Container, Row, Col } from "react-bootstrap";
import OverView from "./overView/OverView";
import UsersList from "./usersList/UsersList";

import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
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
      <section id="contact" className="contact">
        <Container data-aos="fade-up">
          <div className="section-title">
            <h2>Dashboard</h2>
            <p>Admin Dashboard</p>
          </div>
          {/* <Container fluid className="adminDashboard"> */}
          {/* {isLoading ? (
          <Loader />
        ) : error ? (
        <Message variant="danger"> { error?.data?.message || error?.data || error?.error }</Message>

        ) : ( */}
          <>
            <Row>
              <Col md={12}>
                <OverView />

                <Row className="mb-2 mt-3">
                  <Col lg={6}>
                    <UsersList title={"All Users"}/>
                  </Col>
                  <Col lg={6}>
                  <UsersList title={"Team Members"}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
          {/* )} */}
        </Container>
      </section>
    </>
  );
};

export default AdminDashboard;
