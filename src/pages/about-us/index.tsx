import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import Markdown from 'markdown-to-jsx';
import './style.scss';

interface Props {
  meta: {
    title: string;
    description: string;
  };
}

const AboutUs = ({ meta }: Props) => {
  const [content, setContent] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quisommesnous?lang=${i18n.language}`
      );
      const json = await response.json();
      if (response.status === 200) {
        setContent(json[0].content);
      }
    })();
  }, [i18n.language]);

  return (
    <Layout meta={meta}>
      <Container className='about-us'>
        {content && <Markdown>{content}</Markdown>}
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seos?_limit=-1&label=aboutus`
  );
  const json = await response.json();
  const meta = {
    title: json[0].title,
    description: json[0].description,
  };

  return { props: { meta } };
};

export default AboutUs;
