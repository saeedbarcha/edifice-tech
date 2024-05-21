import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import BarChartComp from "./Graphics/BarChartComp";
import PieChartComp from "./Graphics/PieChartComp";
import {
  useGetBogQuery,
  useGetCourseQuery,
  useGetGalleriesQuery,
  useGetServiceQuery,
  useGetProductQuery,
  useGetFaqQuery,
  useGetAdmissionBatcheQuery,
  useGetUserQuery,
  useGetEnrollmentQuery,
  useGetUserRoleBaseQuery
} from "../../../slices/adminDashboardApiSlice"

import { Container, Row, Col } from "react-bootstrap";
import OverView from "./overView/OverView";
import UsersList from "./usersList/UsersList";

import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {

  const { data: blogs, isLoading: loadingBlog, error: errorBlog } = useGetBogQuery();
  const { data: products, isLoading: loadingProduct, error: errorProduct } = useGetProductQuery();
  const { data: courses, isLoading: loadingCourse, error: errorCourse } = useGetCourseQuery();
  const { data: faqs, isLoading: loadingFaq, error: errorFaq } = useGetFaqQuery();
  const { data: galleries, isLoading: loadingGallery, error: errorGallery } = useGetGalleriesQuery();
  const { data: services, isLoading: loadingService, error: errorService } = useGetServiceQuery();
  const { data: admissionBatches, isLoading: loadingAdmissionBatche, error: errorAdmissionBatche } = useGetAdmissionBatcheQuery();
  const { data: users, isLoading: loadingUser, error: errorUser } = useGetUserQuery();
  const { data: enrollments, isLoading: loadingEnrollment, error: errorEnrollment } = useGetEnrollmentQuery();
  const { data: rollBaseUsers, isLoading: loadingRollBaseUsers, error: errorRollBaseUsers } = useGetUserRoleBaseQuery();

  return (
    <>
      <section id="contact" className="contact">
        <Container data-aos="fade-up">
          <div className="section-title">
            <h2>Dashboard</h2>
            <p>Admin Dashboard</p>
          </div>
          {(
            loadingBlog || loadingProduct || loadingCourse || loadingFaq || loadingGallery || loadingService || loadingAdmissionBatche || loadingUser || loadingEnrollment || loadingRollBaseUsers
          ) ? (
            <Loader />
          ) : (
            errorBlog ||
            errorProduct ||
            errorCourse ||
            errorFaq ||
            errorGallery ||
            errorService ||
            errorAdmissionBatche ||
            errorUser ||
            errorEnrollment ||
            errorRollBaseUsers
          ) ? (
            <Message variant="danger"> {
              (errorBlog ||
              errorProduct ||
              errorCourse ||
              errorFaq ||
              errorGallery ||
              errorService ||
              errorAdmissionBatche ||
              errorUser ||
              errorEnrollment ||
              errorRollBaseUsers)?.data?.message || 
              (errorBlog ||
                errorProduct ||
                errorCourse ||
                errorFaq ||
                errorGallery ||
                errorService ||
                errorAdmissionBatche ||
                errorUser ||
                errorEnrollment ||
                errorRollBaseUsers)?.data || 
                
                (errorBlog ||
                  errorProduct ||
                  errorCourse ||
                  errorFaq ||
                  errorGallery ||
                  errorService ||
                  errorAdmissionBatche ||
                  errorUser ||
                  errorEnrollment ||
                  errorRollBaseUsers)?.error}</Message>

          ) : (
            <>
              <Row>
                <h2>Over View</h2>
                <Col md={12}>

                  <OverView
                    blogs={blogs}
                    products={products}
                    courses={courses}
                    faqs={faqs}
                    galleries={galleries}
                    services={services}
                    admissionBatches={admissionBatches}
                    users={users}
                    enrollments={enrollments}
                  />


                </Col>

              </Row>
              <Row className="my-4">
                <h2>Users</h2>
                <Col lg={4}>
                  <UsersList title={"Admins"} data={rollBaseUsers?.admins} />
                </Col>
                <Col lg={4}>
                  <UsersList title={"Team Members"} data={rollBaseUsers?.members} />
                </Col>
                <Col lg={4}>
                  <UsersList title={"Normal User"} data={rollBaseUsers?.users} />
                </Col>
              </Row>
              <Row
                class="my-5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h2>Admission Batches</h2>
                <Col md={6}>
                  <PieChartComp />
                </Col>
                {/* <Col md={6}>
                    <BarChartComp />
                  </Col> */}
              </Row>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default AdminDashboard;
