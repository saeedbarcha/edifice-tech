import React, { useState, useEffect } from "react"; // Import React
import { Container, Card, Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAdmissionBatchDetailsQuery, useUpdateAdmissionBatchMutation } from "../../../slices/admissionBatchApiSlice";
import {
  useUploadProductImageMutation,
} from "../../../slices/productApiSlice";
import { useGetActiveCoursesQuery } from "../../../slices/courseApiSlice";
const EditAdmissionBatchScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [admissionFee, setAdmissionFee] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const { id: admissionBatchId } = useParams();

  const navigate = useNavigate();
  const {
    data: allActiveCourses,
    // isLoading:isLoadingAllActiveCourses,
    // error,
  } = useGetActiveCoursesQuery();
  const [uploadAdmissionBacthImage, { isLoading: loadingUpload }] =
  useUploadProductImageMutation();
  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetAdmissionBatchDetailsQuery(admissionBatchId);
 
  const [updateAdmissionBatch, { isLoading: loadingUpdate }] =
  useUpdateAdmissionBatchMutation();

  useEffect(() => {
    if (admissionBatch) {
      setTitle(admissionBatch?.title);
      setDescription(admissionBatch?.description);
      setImage(admissionBatch?.image);
      setAdmissionFee(admissionBatch?.admissionFee);
      setStartDate(
        new Date(admissionBatch?.startDate).toISOString().split("T")[0]
      );
      setEndDate(new Date(admissionBatch?.endDate).toISOString().split("T")[0]);
      setLastDateToApply(
        new Date(admissionBatch?.lastDateToApply).toISOString().split("T")[0]
      );
      setIsActive(admissionBatch?.isActive)
      setCertificate(admissionBatch?.certificate);
      setSelectedCourses(admissionBatch?.selectedCourses?.map(course => course?.courseId?._id)); 
    }
  }, [admissionBatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const admissionBatch = {
        admissionBatchId,
        title,
        description,
        admissionFee,
        startDate,
        endDate,
        image,
        lastDateToApply,
        isActive,
        certificate,
        selectedCourses,
      };
      // const res = "jjj";
      const res = await updateAdmissionBatch(admissionBatch);

      if (res.data) {
        navigate("/admin/admissionbatchlist");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.data?.message || err.error);
    }
  };

  // const handleCourseChange = (courseId, checked) => {
  //   if (checked) {
  //     setCourses([...courses, courseId]);
  //   } else {
  //     setCourses(courses?.filter(course => course !== courseId));
  //   }
  // };

  const handleCourseChange = (courseId, checked) => {
    setSelectedCourses(prevCourses => {
      if (checked) {
        return [...prevCourses, courseId];
      } else {
        return prevCourses.filter(course => course !== courseId);
      }
    });
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
      <h2 className="my-4">Update Admission batch</h2>
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
                <Form.Label>Courses</Form.Label>
                {allActiveCourses?.map((c, index) => {

                  const courseId = c?._id;
                  const isChecked = selectedCourses?.includes(courseId);
                  return (
                    <Form.Check
                      key={courseId}
                      type="checkbox"
                      label={c?.title}
                      checked={isChecked}
                      onChange={(e) =>
                        handleCourseChange(courseId, e.target.checked)
                      }
                    />
                  );
                })}
              </Form.Group>
          
            <Button variant="primary" type="submit">
              update
            </Button>
            {/* <Button variant="primary" type="submit" disabled={loadingCreate}>
              {loadingCreate ? "Updating..." : "Update"}
            </Button> */}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditAdmissionBatchScreen;
