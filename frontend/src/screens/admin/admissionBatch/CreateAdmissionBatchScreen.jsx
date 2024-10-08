import React, { useState } from "react";
import { Container, Card, Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateAdmissionBatchMutation } from "../../../slices/admissionBatchApiSlice";
import { useGetActiveAllCoursesQuery } from "../../../slices/courseApiSlice.js";
import { toast } from "react-toastify";
import {useUploadImageMutation} from "../../../slices/uploadImageApiSlice";
const CreateAdmissionBatchScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [admissionFee, setAdmissionFee] = useState(1000);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isActive, setIsActive] = useState(false);


  const navigate = useNavigate();

  const {
    data: allActiveCourses,
    isLoading,
    error,
  } = useGetActiveAllCoursesQuery();

  const [createAdmissionBatch, { isLoading: loadingCreate }] =
    useCreateAdmissionBatchMutation();

    const [uploadAdmissionBacthImage, { isLoading: loadingUpload }] =
    useUploadImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const admissionBatch = {
        title,
        description,
        admissionFee,
        startDate,
        endDate,
        image,
        lastDateToApply,
        certificate,
        selectedCourses,
        isActive
      };
      const res = await createAdmissionBatch(admissionBatch);
      if (res.data) {
        navigate("/admin/admission-batches-list/page/1");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadAdmissionBacthImage(formData).unwrap();
      toast.success(res?.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <h2 className="my-4 ">Create New Admission Batch</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="my-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
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

            <Form.Group controlId="description" className="my-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="admissionFee" className="my-4">
              <Form.Label>Admission Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter admission fee"
                value={admissionFee}
                onChange={(e) => setAdmissionFee(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="startDate" className="my-4">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="endDate" className="my-4">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastDateToApply" className="my-4">
              <Form.Label>Last Date To Apply</Form.Label>
              <Form.Control
                type="date"
                value={lastDateToApply}
                onChange={(e) => setLastDateToApply(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="certificate" className="my-4">
              <Form.Check
                type="checkbox"
                label="Certificate Available"
                checked={certificate}
                onChange={(e) => setCertificate(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="isActive" className="my-4">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="my-4">
              <Form.Label>Selected Courses</Form.Label>
              {allActiveCourses?.map((course, index) => {
                return (
                  <Form.Check
                    key={course._id}
                    type="checkbox"
                    label={course.title}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourses([...selectedCourses, course._id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter(
                            (sCourse) => sCourse !== selectedCourses._id
                          )
                        );
                      }
                    }}
                  />
                );
              })}
            </Form.Group>
            <Button className="btn-sm m-3 btnAllScreen" type="submit" disabled={loadingCreate}>
              {loadingCreate ? "Creating..." : "Create"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateAdmissionBatchScreen;
