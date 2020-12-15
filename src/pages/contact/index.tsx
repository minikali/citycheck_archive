import FeedbackModal from '@/components/FeedbackModal';
import Layout from '@/components/Layout';
import Upload from '@/components/Upload';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

interface ContactForm {
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

  return (
    <Layout>
      <Form>
        <Form.Group controlId='contact-name'>
          <Form.Label>{t('contact_label_name')}</Form.Label>
          <Form.Control type='text' onChange={onChangeName} />
        </Form.Group>

        <Form.Group controlId='contact-email'>
          <Form.Label>{t('contact_label_email')}</Form.Label>
          <Form.Control type='email' onChange={onChangeEmail} />
        </Form.Group>

        <Form.Group controlId='contact-message'>
          <Form.Label>{t('contact_label_message')}</Form.Label>
          <Form.Control as='textarea' rows={3} onChange={onChangeMessage} />
        </Form.Group>
        <Upload domId='upload' setFiles={onChangeFiles} files={form.files} />
        <Button variant='primary' type='submit'>
          Confirmer
        </Button>
      </Form>
      <FeedbackModal show={show} onHide={() => setShow(false)}>
        Ceci est un test
      </FeedbackModal>
    </Layout>
  );
};

export default Contact;
