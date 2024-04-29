import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useCreateFaqMutation
} from "../../../slices/faqsApiSlice";
import Loader from "../../../components/Loader";
const CreateFaqsScreen = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [createFaq, { isLoading: loadingCreate }] = useCreateFaqMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newFaq = {
      question,
      answer,
      isActive,
    };

    const result = await createFaq(newFaq);

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Faq created successfully");
      navigate("/admin/faqs-list");
    }

  }

  return (
    <div>
      <div className="space" style={{ paddingTop: "3%", paddingBottom: "3%" }}>
        <Card style={{ maxWidth: 650, margin: "0% auto" }}>
          <Card.Body>
            <Card.Title>Create Faqs!</Card.Title>
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

              {loadingCreate && <Loader />}

              <Form.Group controlId="isActive" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>


              <div style={{ textAlign: "right" }}>
                <Button type="submit" className="my-2 btnAllScreen">
                  Create Faq
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CreateFaqsScreen;
