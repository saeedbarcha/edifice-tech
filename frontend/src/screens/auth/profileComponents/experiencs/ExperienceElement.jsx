import { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../../../../slices/usersApiSlice";
import { useDeleteExperienceMutation } from "../../../../slices/experienceApiSlice";
import { formatDateMothFormat } from '../../../../common-functions/formatDate.js';
import AddUpdateExpModal from "./AddUpdateExpModal";

const ExperienceElement = () => {
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleCloseExperienceModal = () => setShowExperienceModal(false);
  const handleOpenExperienceModal = () => setShowExperienceModal(true);

  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userInfo._id);

  const [deleteExperience, { isLoading: loadingDelete }] =
    useDeleteExperienceMutation();

  const deleteHandlerExp = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteExperience(id);
        toast.success("Experience deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Col md="6">
        <Card className="mb-4 mb-md-0">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span className="text-primary font-italic me-1">Experience</span>
            <AddUpdateExpModal
              show={showExperienceModal}
              handleClose={handleCloseExperienceModal}
              editExperience={selectedExperience}
            />
            <Button
              variant="light"
              className="btn-sm"
              onClick={handleOpenExperienceModal}
            >
              <IoMdAddCircle style={{ fontSize: "22px", color: "blue" }} />
            </Button>
          </Card.Header>
          <Card.Body
            className="scrollerCont"
            style={{ height: "225px", overflowY: "auto" }}
          >
            {user?.experience.map((exp, index) => (
              <Card className="my-4" key={index}>
                <Card.Body>
                  <div className="d-flex justify-content-end align-items-center">
                    <AddUpdateExpModal
                      show={showExperienceModal}
                      handleClose={handleCloseExperienceModal}
                      editExperience={selectedExperience}
                    />
                    <Button
                        variant="light"
                        className="btn-sm deleteAndEditBtn"
                      onClick={() => {
                        setSelectedExperience(exp);
                        handleOpenExperienceModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                        variant="light"
                        className="btn-sm deleteAndEditBtn"
                      onClick={() => deleteHandlerExp(exp._id)}
                    >
                      <FaTrash  />
                    </Button>
                  </div>
                  <Card.Text>
                    <p>
                      {exp.designation} at{" "}
                      <span style={{ fontSize: "22px" }}>
                        {exp.instituteName}
                      </span>
                    </p>
                    <p>
                      From: {formatDateMothFormat(exp.joiningDate)} to: {formatDateMothFormat(exp.endingDate)}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ExperienceElement;
