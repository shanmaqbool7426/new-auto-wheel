"use client";
import { Title, Accordion, Text, TextInput } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "@/constants/api-endpoints";
const FAQ = ({ title, titleSpan, type = "car" }) => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFaqs = async (search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/faq`, {
        params: {
          type,
          limit: 10,
          search
        }
      });
      
      console.log('>>>>>response',response)
      if (response.data.success) {
        setFaqs(response.data.data.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs(title);
  }, [type]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchFaqs(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (faqs.length === 0 && !loading && !searchQuery) return null;

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
            {loading ? (
              <Text c="dimmed" ta="center">Loading...</Text>
            ) : faqs.length > 0 ? (
              <Accordion
                variant="separated"
                radius="sm"
                chevronPosition="right"
                defaultValue={faqs[0]?._id}
              >
                {faqs.map((item) => (
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
            ) : (
              <Text c="dimmed" ta="center">No FAQs found</Text>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
