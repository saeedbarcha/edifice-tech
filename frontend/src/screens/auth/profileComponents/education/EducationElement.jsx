import { useState, useEffect } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../../../../slices/usersApiSlice";
import { useDeleteEducationMutation } from "../../../../slices/educationApiSlice";
import { formatDateMothFormat } from '../../../../common-functions/formatDate.js';
import AddUpdateEduModal from "./AddUpdateEduModal";

const EducationElement = () => {
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleCloseEducationModal = () => setShowEducationModal(false);

  const handleOpenEducationModal = () => setShowEducationModal(true);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userInfo._id);

  const [deleteEducation, { isLoading: loadingDelete }] =
    useDeleteEducationMutation();

  const deleteHandlerEdu = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteEducation(id);
        toast.success("Education deleted");
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
          <span className="text-primary font-italic me-1">Education</span>
          <AddUpdateEduModal
            show={showEducationModal}
            handleClose={handleCloseEducationModal}
            editEducation={selectedEducation}
          />
          <Button variant="light" className="btn-sm"
            onClick={() => {
              handleOpenEducationModal(true);
            }}>
            <IoMdAddCircle
              style={{ fontSize: "22px", color: "blue" }}
            
            />
          </Button>
        </Card.Header>
        <Card.Body
          className="scrollerCont"
          style={{ height: "225px", overflowY: "auto" }}
        >
          <Card.Text className="mb-4">
            {user?.education?.map((edu, index) => (
              <Card className="my-4 scrollerCont" key={index}>
                <Card.Body>
                  <div className="d-flex justify-content-end align-items-center">
                    <AddUpdateEduModal
                      show={showEducationModal}
                      handleClose={handleCloseEducationModal}
                      editEducation={selectedEducation}
                    />
                    <Button
                      variant="primary"
                      className="btn-sm m-1"
                      onClick={() => {
                        setSelectedEducation(edu);
                        handleOpenEducationModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandlerEdu(edu._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </div>
                  <Card.Text className="">
                    <p>
                      {" "}
                      {edu.degree} in {edu.course} from{" "}
                      <span style={{ fontSize: "22px" }}>
                        {" "}
                        {edu.instituteName}
                      </span>
                    </p>
                    <p>Date: {formatDateMothFormat(edu.date)}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    </>
  );
};

export default EducationElement;
