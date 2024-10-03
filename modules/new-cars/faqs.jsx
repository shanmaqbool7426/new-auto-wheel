"use client";
import { Title, Accordion, Text } from "@mantine/core";
import React from "react";

const FAQ = ({ title, titleSpan, faqs }) => {
  return (
    <section className="brands-faq-section py-5">
      <div className="container-xl">
        <div className="row">
          <div className="col-md-12">
            <Title order={2} mb="xl">
              {title ? title : "FAQs"}{" "}
              {titleSpan && (
                <Text span inherit className="text-primary">
                  {titleSpan}
                </Text>
              )}
            </Title>
          </div>
          <div className="col-md-12">
            <Accordion
              variant="contained"
              radius="sm"
              chevronPosition="right"
              defaultValue={faqs && faqs.length > 0 ? faqs[0]._id : ""}
            >
              {faqs?.map((item, index) => (
                <Accordion.Item key={item._id} value={item._id}>
                  <Accordion.Control px="lg" py="xs">
                    <Title order={5} fw={600}>
                      {item.question}
                    </Title>
                  </Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
