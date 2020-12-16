import FeedbackModal from '@/components/FeedbackModal';
import Layout from '@/components/Layout';
import Upload from '@/components/Upload';
import useContact from '@/hooks/useContact';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import "./style.scss"

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  files: File[];
}

const Contact = () => {
  const initialForm = {
    name: '',
    email: '',
    message: '',
    files: [],
  };
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [show, setShow] = useState<boolean>(false);
  const { loading, error, sendContactForm } = useContact();
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

  const handleSubmit = () => {
    if (sendContactForm(form)) setForm(initialForm);
  };

  useEffect(() => {
    if (error) setShow(true);
  }, [error]);

  return (
    <Layout>
      <Container className="contact">
        <Form className="contact__form" onSubmit={handleSubmit}>
          <Form.Group controlId='contact-name'>
            <Form.Label>{t('contact_label_name')}</Form.Label>
            <Form.Control type='text' onChange={onChangeName} required />
          </Form.Group>

          <Form.Group controlId='contact-email'>
            <Form.Label>{t('contact_label_email')}</Form.Label>
            <Form.Control type='email' onChange={onChangeEmail} required />
          </Form.Group>

          <Form.Group controlId='contact-message'>
            <Form.Label>{t('contact_label_message')}</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              onChange={onChangeMessage}
              required
            />
          </Form.Group>
          <Upload domId='upload' setFiles={onChangeFiles} files={form.files} />
          <Button type='submit'>
            {loading && <Spinner animation='border' role='status' />}
            {!loading && 'Confirmer'}
          </Button>
        </Form>
        <FeedbackModal show={show} onHide={() => setShow(false)}>
          {error}
        </FeedbackModal>
      </Container>
    </Layout>
  );
};

export default Contact;
