import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetFaqDetailsQuery,
  useUpdateFaqMutation
} from "../../../slices/faqsApiSlice";


const EditFaqsScreen = () => {
  const { id: faqId } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isActive, setIsActive] = useState(false);

  const {
    data: faq,
    isLoading,
    error,
  } = useGetFaqDetailsQuery(faqId);


  const [updateFaq, { isLoading: loadingUpdate }] = useUpdateFaqMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (faq) {
      setQuestion(faq?.question);
      setAnswer(faq?.answer);
      setIsActive(faq?.isActive);
    }
  }, [faq]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const upFaq = {
      faqId,
      question,
      answer,
      isActive,
    };

    const result = await updateFaq(upFaq);

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Faq updated successfully");
      setTimeout(() => {
        navigate("/admin/faqs-list/page/1");
      }, 1000);
     
    }

  }

  return (
    <div>
      <div className="space" style={{ paddingTop: "3%", paddingBottom: "3%" }}>
        <Card style={{ maxWidth: 650, margin: "0% auto" }}>
          <Card.Body>
            <Card.Title>Update Faqs!</Card.Title>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="question" className="my-2">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Auestion"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="answer" className="my-2">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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


              <div style={{ textAlign: "right" }}>
                <Button type="submit" className="btn-sm m-3 btnAllScreen">
                  {loadingUpdate ? "Updating..." : "Update"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditFaqsScreen;
