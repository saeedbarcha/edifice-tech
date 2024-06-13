import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import './style.css';
import {useGetActiveFaqsQuery} from "../../slices/faqsApiSlice"
const FaqsScreen = () => {
  const { data: activeFaqs, isLoading, error, refetch } = useGetActiveFaqsQuery();

  return (
    <section id="faq" className="faq">
      <Container data-aos="fade-up">
        <div className="section-title">
          <h2>FAQs</h2>
          <p>Frequently Asked Questions</p>
        </div>
        {activeFaqs?.length === 0 &&
                <p>No any active faq found</p>}

        {activeFaqs?.map((faq, index) => (
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