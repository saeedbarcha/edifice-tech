import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateCourseMutation,
  useGetCourseDetailsQuery,
} from "../../../slices/courseApiSlice";
import {

  useUploadProductImageMutation,
} from "../../../slices/productApiSlice";

const EditCoursesScreen = () => {
  const { id: courseId } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [discount, setDiscount] = useState("");
  const [skillSet, setSkillSet] = useState("");
  const [preRequisites, setPreRequisites] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [hoursInDay, setHoursInDay] = useState(0);
  const [daysInWeek, setDaysInWeek] = useState(0);
  const [totalDuration, setTotalDuration] = useState("");
  const [certificate, setCertificate] = useState(false);

  const {
    data: course,
    isLoading,
    error,
  } = useGetCourseDetailsQuery(courseId);

  console.log("ccccccccccccccc", course)
  const [updateCourse, { isLoading: loadingUpdate }] =
    useUpdateCourseMutation();

  const [uploadCourseImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();


  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setPrice(course.price);
      setIsActive(course.isActive);
      setDiscount(course.discount);
      setSkillSet(course.skillSet);
      setPreRequisites(course.preRequisites);
      setDescription(course.description);
      setImage(course.image);
      setHoursInDay(course.hoursInDay);
      setDaysInWeek(course.daysInWeek);
      setTotalDuration(course.totalDuration);
      setCertificate(course.certificate);
    }
  }, [course]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedCo = {
      courseId,
      title,
      price,
      isActive,
      discount,
      skillSet,
      preRequisites,
      description,
      image,
      hoursInDay,
      daysInWeek,
      totalDuration,
      certificate,
    };

    const result = await updateCourse(updatedCo);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Course updated successfully");

    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadCourseImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container className="py-3">
        <Link to="/admin/course-list" className="btn btn-light my-3">
          Go Back
        </Link>

        <FormContainer>
          <h1>Edit Course</h1>

          {loadingUpdate && <Loader />}

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title" className="my-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image" className="mt-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>

              {image &&
                <Form.Group className="mt-3">
                  <img src={image} alt="Selected" className="w-100" />
                </Form.Group>}

              <Form.Group controlId="price" className="my-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="discount" className="my-2">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="skillSet" className="my-2">
                <Form.Label>Skill Set</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter skill set"
                  value={skillSet}
                  onChange={(e) => setSkillSet(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="preRequisites" className="my-2">
                <Form.Label>Pre-requisites</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pre-requisites"
                  value={preRequisites}
                  onChange={(e) => setPreRequisites(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* 
              <Form.Group controlId="image" className="my-2">
                <Form.Label>Image</Form.Label>

                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadFileHandler}
                ></Form.Control>

                <Form.Control
                  type="text"
                  className="mt-2"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId="hoursInDay" className="my-2">
                <Form.Label>Hours In Day</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter hours in day"
                  value={hoursInDay}
                  onChange={(e) => setHoursInDay(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="daysInWeek" className="my-2">
                <Form.Label>Days In Week</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter days in week"
                  value={daysInWeek}
                  onChange={(e) => setDaysInWeek(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="totalDuration" className="my-2">
                <Form.Label>Total Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter total duration"
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="certificate" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Certificate Available"
                  checked={certificate}
                  onChange={(e) => setCertificate(e.target.checked)}
                />
              </Form.Group>
              <Form.Group controlId="isActive" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>

              {loadingUpload && <Loader />}

              <div style={{ textAlign: "right" }}>
                <Button type="submit" className="btn my-2 btnAllScreen">
                  Update
                </Button>
              </div>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default EditCoursesScreen;
