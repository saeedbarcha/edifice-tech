import { useState } from "react";
import OverCard from "./OverCard";
import { Row, Col } from "react-bootstrap";
import "./OverView.css";

const OverView = ({ blogs, products, courses, faqs, galleries, services, admissionBatches, users , enrollments}) => {
  console.log("blogs..", blogs)
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
          <OverCard title="Users" data={users} icon="FaUsers" link="/admin/userlist" />
          <OverCard title="Admission Batches" data={admissionBatches} icon="FaBookOpenReader" link="/admin/admissionbatchlist" />
          <OverCard title="Enrollments" data={enrollments} icon="MdImage"  link="/admin/enrollment-List"/>
          <OverCard title="Courses" data={courses} icon="FaBookMedical" link="/admin/courselist"/>
          <OverCard title="Services" data={services} icon="FaServicestack" link="/admin/service-list/page/1"/>
          <OverCard title="Blogs" data={blogs} icon="FaBlogger" link="/admin/blog-list/page/1"/>
          <OverCard title="Products" data={products} icon="FaProductHunt" link="/admin/productlist"/>
          <OverCard title="FAQs" data={faqs} icon="BsFillQuestionSquareFill" link="/admin/faqs-List" />
          <OverCard title="Gallery" data={galleries} icon="MdImage"  link="/admin/gallerylist"/>
        </Row>
      </div>
    </>
  );
};

export default OverView;
