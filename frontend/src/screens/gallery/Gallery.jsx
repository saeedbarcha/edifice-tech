import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAllActiveGalleriesQuery } from "../../slices/galleryApiSlice";
import "./Gallery.css";

const Gallery = () => {
  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const { data: responseData, isLoading, error } = useGetAllActiveGalleriesQuery({ pageNumber: page });

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (ele) => {
    const index = responseData?.activeGalleries?.findIndex((item) => item._id === ele._id);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const cardVariants = {
    hidden: { opacity: 0.6, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };


  return (
    <section id="gallery" className="gallery">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Check our Gallery</p>
        </div>


        {error ? (
          <Message variant="danger">
            {" "}
            {error?.data?.message || error?.data || error?.error}
          </Message>
        ) : isLoading ? (
          <Loader />
        ) : responseData?.activeGalleries?.length === 0 ? (
          responseData?.activeGalleries?.length === 0 &&
          <p>No any active gallery found</p>

        ) : (
          <Row
            className="gallery-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >

            {responseData?.activeGalleries?.map((ele, index) => (
              <Col key={ele?._id} lg={3} md={4} className="gallery-item">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <div className="gallery-wrap" style={{ width: "100%", height: "auto" }}>
                    <Image src={ele?.image} fluid alt="" loading="lazy" style={{ width: "100%" }} />
                    <div className="gallery-info">
                      <p>{ele?.caption}</p>
                      <div className="gallery-links">
                        <a className="gallery-lightbox" title="App 1">
                          <FaPlus
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(ele);
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>))
            }
            {responseData?.activeGalleries?.length > 0 &&
              <Link to={`/gallery/page/${1}`} style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <Button className="btn-sm my-3 btnSeeMore px-3 m-auto">
                    See More
                  </Button>
                </motion.div>
              </Link>
            }
          </Row>

        )}


        {isOpen && (
          <Lightbox
            mainSrc={responseData?.activeGalleries[photoIndex].image}
            nextSrc={responseData?.activeGalleries[(photoIndex + 1) % responseData?.activeGalleries?.length].image}
            prevSrc={
              responseData?.activeGalleries[
                (photoIndex + responseData?.activeGalleries?.length - 1) % responseData?.activeGalleries?.length
              ].image
            }
            onCloseRequest={() => {
              setIsOpen(false);
              setPhotoIndex(0);
            }}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + responseData?.activeGalleries?.length - 1) % responseData?.activeGalleries?.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % responseData?.activeGalleries?.length)
            }
            imageTitle={responseData?.activeGalleries[photoIndex].caption}
          />
        )}
      </Container>
    </section>
  );
};

export default Gallery;
