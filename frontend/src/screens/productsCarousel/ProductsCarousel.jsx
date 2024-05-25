import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./productsCarousel.css";
import { useGetProductsQuery } from "../../slices/productApiSlice";

const ProductsCarousel = () => {
  const { data, isLoading, error } = useGetProductsQuery();


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 6000,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 900,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section id="contact" className="contact">
        <Container >
          <div className="section-title">
            <h2>Products</h2>
            <p>Our Software Products</p>
          </div>
          {data?.length > 0 ? <Slider {...settings}>
            {data?.map((product, i) => {
              return (
                <div className="d-flex justify-content-center   topCatContainer my-3">
                  <div className="slider my-3" style={{ width: "500px" }}>
                    <Link to={`/product/${product._id}`}>
                      <div className="productNameCont d-flex  justify-content-between">
                        <span className="productName">{product?.name}</span>
                      </div>
                      <div className=" d-flex justify-content-between productUrl">
                        <span className="name">{product?.url}</span>
                      </div>

                      <div className="d-flex justify-content-center align-content-center ">
                        <img src={product?.image} alt="img" className="topCateImg w-100" fluid />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider> :
            <p>No any active product found</p>}

        </Container>
      </section>
    </>
  );
};

export default ProductsCarousel;
