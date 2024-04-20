// import { Link } from "react-router-dom";
// import React from "react";
// import {Container, Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";

// import { useGetActiveBlogsQuery } from "../../slices/blogApiSlice";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const AllBlogsScreen = () => {
//   const { data, isLoading, error } = useGetActiveBlogsQuery();


//   // handel date
//   function formatDateString(dateString) {
//     // Create a new Date object from the provided dateString
//     var date = new Date(dateString);

//     // Get the components of the date
//     var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 since months are zero-based
//     var day = date.getDate().toString().padStart(2, '0');
//     var year = date.getFullYear().toString();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var period = hours < 12 ? 'AM' : 'PM';

//     // Convert hours to 12-hour format
//     hours = hours % 12 || 12;

//     // Pad minutes with leading zeros if necessary
//     minutes = minutes.toString().padStart(2, '0');

//     // Construct the formatted date string
//     var formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;

//     return formattedDate;
// }
//   return (
//     <Container className="blog-list-container my-5 py-4">
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error?.error}
//         </Message>
//       ) : (
//         <div className="blog-grid">
//           {data?.map((blog) => {
//             return (
//               <div className="blogPreview" key={blog.id}>
//                 {/* <Card style={{ minWidth: 375, margin: "0 auto 3% auto" }}>
//                   <Card.Img
//                     variant="top"
//                     style={{ minWidth: "100%" }}
//                     src={blog.image}
//                     alt="Image Not Found"
//                   />
//                   <Card.Body>
//                     <Card.Title>{blog.title}</Card.Title>
//                     <Card.Title>{blog.title}</Card.Title>
//                     <Card.Text>Written by {blog.content}</Card.Text>
//                     <Button variant="primary" size="lg">
//                       <Link to={`/blogs/${blog.id}`} style={{ color: "white" }}>
//                         Read More
//                       </Link>
//                     </Button>
//                   </Card.Body>
//                 </Card> */}
//                 <Card className="my-2">
//                   <CardImg
//                     alt="Card image cap"
//                     src="https://picsum.photos/900/180"
//                     style={{
//                       height: 180,
//                     }}
//                     top
//                     width="100%"
//                   />
//                   <CardBody>
//                     <CardTitle as="h5"> {blog.title}</CardTitle>
//                     <CardTitle as="p"> {blog.author}</CardTitle>

//                     <CardText>
//                     {blog.content}
//                     </CardText>
//                     <CardText>
//                       <small className="text-muted">
//                         {formatDateString(blog.createdAt)}
//                       </small>
//                     </CardText>
//                   </CardBody>
//                 </Card>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default AllBlogsScreen;



import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useGetActiveBlogsQuery } from "../../slices/blogApiSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
function AllBlogsScreen() {
  const { data, isLoading, error } = useGetActiveBlogsQuery();
  console.log("blog data", data);

  function formatDateString(dateString) {
    var date = new Date(dateString);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    var formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;
    return formattedDate;
  }
  
  return (
    <section id="gallery" className="gallery">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>Blogs</h2>
          <p>Check our Blogs</p>
        </div>
        <Row>
          <Col>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error?.error}
              </Message>
            ) : (
              <Row md={12}>
                {data.map((blog) => (
                  <Col md={6} lg={4} className="d-flex mb-4">
                    <Link
                      to={`/blogs/${blog._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card key={blog.id} className="mb-8">
                        <Card.Img
                          variant="top"
                          style={{minWidth:"258px", height: "200px" }}
                          src={blog.image}
                        />
                        <Card.Body>
                          <Card.Title>{blog.title}</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                            {formatDateString(blog.createdAt)}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col xs={12} md={3}>
            <Card>
              <Card.Body>
                <Card.Title>3Beez Recent Blogs Posts </Card.Title>
                <hr />
                <Card.Text>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate amet ullam excepturi odio impedit saepe nemo
                  repellendus, aut suscipit voluptas omnis quas quisquam
                  accusamus illo laboriosam rerum, totam ea eaque.
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Our YouTube Chennal</Card.Title>
                <hr />
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/ZEyAs3NWH4A"
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default AllBlogsScreen;