import { ContactForm } from '@/pages/contact';
import { useState } from 'react';

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendForm = async (
    name: string,
    email: string,
    message: string,
    hasFile: boolean
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          has_file: hasFile,
        }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return json;
  };

  const sendFiles = async (refId: string, files: File[]) => {
    if (!files) return null;
    const formData = new FormData();

    Object.values(files).forEach((file) => {
      formData.append('files', file);
    });
    formData.append('ref', 'message');
    formData.append('refId', refId);
    formData.append('field', 'files');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return json;
  };

  // First it send the form to create a new id in database
  // then send the files to associate to that id
  const sendContactForm = async ({
    name,
    email,
    message,
    files,
  }: ContactForm) => {
    try {
      setLoading(true);
      const hasFile = files?.length > 0;
      const resForm = await sendForm(name, email, message, hasFile);
      if (hasFile) await sendFiles(resForm.id, files);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return { loading, error, sendContactForm };
};

export default useContact;
