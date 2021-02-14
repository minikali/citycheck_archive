import FeedbackModal from "@/components/FeedbackModal";
import Layout from "@/components/Layout";
import Upload from "@/components/Upload";
import useContact from "@/hooks/useContact";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import "./style.scss";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  files: File[];
}

interface Props {
  meta: {
    title: string;
    description: string;
  };
}

const Contact = ({ meta }: Props) => {
  const initialForm = {
    name: "",
    email: "",
    message: "",
    files: [],
  };
  const [form, setForm] = useState<ContactForm>(initialForm);
  const { loading, error, sendContactForm } = useContact();
  const [modal, setModal] = useState({ show: false, message: "" });
  const { t } = useTranslation();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: e.target.value });
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, message: e.target.value });
  };

  const onChangeFiles = (files: File[]) => {
    setForm({ ...form, files });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendContactForm(form)) {
      setModal({ show: true, message: t("contact_message_success") });
      setForm(initialForm);
    }
  };

  useEffect(() => {
    if (error) {
      setModal({ show: true, message: t("error_occurred") });
    }
  }, [error]);

  return (
    <Layout meta={meta}>
      <Container className="contact">
        <Form className="contact__form" onSubmit={handleSubmit}>
          <Form.Group controlId="contact-name">
            <Form.Label>{t("contact_label_name")}</Form.Label>
            <Form.Control type="text" value={form.name} onChange={onChangeName} required />
          </Form.Group>

          <Form.Group controlId="contact-email">
            <Form.Label>{t("contact_label_email")}</Form.Label>
            <Form.Control type="email" value={form.email} onChange={onChangeEmail} required />
          </Form.Group>

          <Form.Group controlId="contact-message">
            <Form.Label>{t("contact_label_message")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.message}
              onChange={onChangeMessage}
              required
            />
          </Form.Group>
          <Upload domId="upload" setFiles={onChangeFiles} files={form.files} />
          <Button type="submit">
            {loading && <Spinner animation="border" role="status" />}
            {!loading && "Confirmer"}
          </Button>
        </Form>
        <FeedbackModal
          show={modal.show}
          onHide={() => setModal({ show: false, message: "" })}
        >
          {modal.message}
        </FeedbackModal>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seos?_limit=-1&label=contact`
  );
  const json = await response.json();
  const meta = {
    title: json[0].title,
    description: json[0].description,
  };

  return { props: { meta } };
};

export default Contact;
