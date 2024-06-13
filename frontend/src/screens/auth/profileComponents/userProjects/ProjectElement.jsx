import React, { useState } from "react";
import { Col,Row, Card, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { useDeleteProjectMutation } from "../../../../slices/projectApiSlice";
import AddUpdateProjectModal from "./AddUpdateProjectModal"; 
import { useGetUserDetailsQuery } from "../../../../slices/usersApiSlice";


const ProjectElement = () => {

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setShowProjectModal(false);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userInfo._id);

  const [deleteProject, { isLoading: loadingProject }] = useDeleteProjectMutation();

  const deleteHandlerProject = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProject(id);
        toast.success("Project deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Col>
      <Card className="mb-4 mb-md-0">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span className="text-primary font-italic me-1">Projects</span>

          <Button
              variant="light"
              className="btn-sm"
              onClick={() =>handleOpenProjectModal(null)}
            >
              <IoMdAddCircle style={{ fontSize: "22px", color: "blue" }} />
            </Button>
        </Card.Header>
        <Card.Body className="">
          <Row className="d-flex justify-content-between">
            {user?.projects?.map((pro, index) => (
              <Col lg={4} md={3} sm={6} key={index}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      {pro?.title}
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          variant="light"
                          className="btn-sm deleteAndEditBtn"
                          onClick={() => handleOpenProjectModal(pro)} // Open modal for updating the project
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="light"
                          className="btn-sm deleteAndEditBtn"
                          onClick={() => deleteHandlerProject(pro._id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>{" "}
                    </Card.Title>
                    <Card.Text>
                      <a href={pro.url}>{pro.url}</a>
                    </Card.Text>
                    <Card.Text>{pro.description}</Card.Text>
                  </Card.Body>
                  <Card.Img variant="bottom" src={pro.image} alt={pro.title} />
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <AddUpdateProjectModal 
        show={showProjectModal}
        handleClose={handleCloseProjectModal}
        editProject={selectedProject}
      />
    </Col>
  );
};

export default ProjectElement;
