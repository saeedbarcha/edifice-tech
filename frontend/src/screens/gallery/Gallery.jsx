import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetGalleryQuery } from "../../slices/galleryApiSlice";
import "./Gallery.css";
import image from "./setImage2.png";

const Gallery = () => {
  const { data: galleryData, isLoading, error } = useGetGalleryQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (ele) => {
    const index = galleryData.findIndex((item) => item._id === ele._id);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <section id="gallery" className="gallery">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Check our Gallery</p>
        </div>

        <Row
          className="gallery-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {error ? (
            <Message variant="danger">
              {" "}
              {error?.data?.message || error?.data || error?.error}
            </Message>
          ) : isLoading ? (
            <Loader />
          ) : (
            galleryData?.map((ele, index) => (
              <Col key={ele?._id} lg={3} md={4} className="gallery-item">
                <div className="gallery-wrap">
                  <Image src={ele?.image} fluid alt="" loading="lazy" />
                  <div className="gallery-info">
                    <h4>{ele?.caption}</h4>
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
              </Col>
            ))
          )}
        </Row>

        {isOpen && (
          <Lightbox
            mainSrc={galleryData[photoIndex].image}
            nextSrc={galleryData[(photoIndex + 1) % galleryData.length].image}
            prevSrc={
              galleryData[
                (photoIndex + galleryData.length - 1) % galleryData.length
              ].image
            }
            onCloseRequest={() => {
              setIsOpen(false);
              setPhotoIndex(0);
            }}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + galleryData.length - 1) % galleryData.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % galleryData.length)
            }
            imageTitle={galleryData[photoIndex].caption}
          />
        )}
      </Container>
    </section>
  );
};

export default Gallery;
