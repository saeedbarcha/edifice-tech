import React, { useState, useEffect } from "react"; // Import React
import { Container, Card, Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAdmissionBatchDetailsQuery, useUpdateAdmissionBatchMutation } from "../../../slices/admissionBatchApiSlice";
import { useGetActiveCoursesQuery } from "../../../slices/courseApiSlice";
const EditAdmissionBatchScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [admissionFee, setAdmissionFee] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastDateToApply, setLastDateToApply] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isActive, setIsActive] = useState(false);


  console.log("ad........isActive", isActive);

  const { id: admissionBatchId } = useParams();

  const navigate = useNavigate();
  const {
    data: allActiveCourses,
    // isLoading:isLoadingAllActiveCourses,
    // error,
  } = useGetActiveCoursesQuery();
  const {
    data: admissionBatch,
    isLoading,
    error,
  } = useGetAdmissionBatchDetailsQuery(admissionBatchId);
  console.log("ad........admissionBatch", admissionBatch);

  const [updateAdmissionBatch, { isLoading: loadingUpdate }] =
  useUpdateAdmissionBatchMutation();

  useEffect(() => {
    if (admissionBatch) {
      setTitle(admissionBatch?.title);
      setDescription(admissionBatch?.description);
      setAdmissionFee(admissionBatch?.admissionFee);
      // Format and set the start date
      setStartDate(
        new Date(admissionBatch?.startDate).toISOString().split("T")[0]
      );
      // Format and set the end date
      setEndDate(new Date(admissionBatch?.endDate).toISOString().split("T")[0]);
      // Format and set the last date to apply
      setLastDateToApply(
        new Date(admissionBatch?.lastDateToApply).toISOString().split("T")[0]
      );
      setIsActive(admissionBatch?.isActive)
      setCertificate(admissionBatch?.certificate);
      setCourses(admissionBatch?.courses?.map(course => course?.courseId?._id)); 
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
        lastDateToApply,
        isActive,
        certificate,
        courses,
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
    setCourses(prevCourses => {
      if (checked) {
        return [...prevCourses, courseId];
      } else {
        return prevCourses.filter(course => course !== courseId);
      }
    });
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
                  const isChecked = courses?.includes(courseId);
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
