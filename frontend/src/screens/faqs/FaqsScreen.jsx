import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import './style.css';
const FaqsScreen = () => {
  const faqsData = [
    {
      question: "How can I contact you?",
      answer:
        "You can contact us through email at info@example.com or call us at +1 5589 55488 55.",
    },
    {
      question: "Where are you located?",
      answer: "Our office is located at A108 Adam Street, New York, NY 535022.",
    },
    {
      question: "What are your business hours?",
      answer: "We are available Monday to Friday from 9:00 AM to 5:00 PM.",
    },
    {
      question: "How do I send a message?",
      answer:
        "You can send us a message through the contact form on this page. Simply fill out your name, email, subject, and message, and click on Send Message.",
    },
    {
      question: "Is there a loading time for the contact form?",
      answer:
        "The loading time may vary depending on your internet connection and the server load. Please wait a few moments for the form to load.",
    },
    {
      question: "How do I send a message?",
      answer:
        "You can send us a message through the contact form on this page. Simply fill out your name, email, subject, and message, and click on Send Message.",
    },
    {
      question: " How will I know if my message has been sent?",
      answer:
        "After clicking on Send Message, you will see a confirmation message indicating that your message has been sent successfully.",
    },
  ];
  return (
    <section id="faq" className="faq">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>FAQs</h2>
          <p>Frequently Asked Questions</p>
        </div>
        {faqsData.map((faq, index) => (
          <Accordion className="my-3">
            <Card key={index}>
              <Accordion.Item eventKey="0">
                <Accordion.Header >
                  <h4>{faq.question}</h4>
                </Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        ))}
      </Container>
    </section>
  );
};
export default FaqsScreen;