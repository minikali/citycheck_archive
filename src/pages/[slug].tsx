// Modules
import React, { useEffect, useState } from 'react';

// Components
import Layout from '@/components/Layout';
import Spinner from 'react-bootstrap/Spinner';
import Markdown from 'markdown-to-jsx';
import Container from 'react-bootstrap/Container';

// Others
import getFooterPaths from '@/utils/getFooterPath';
import '../styles/infoPage.scss';

interface Props {
  slug: string;
}

const Page = ({ slug }: Props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const paths = await getFooterPaths();
      const { params } = paths.find((element) => element.params.slug === slug);

      if (params) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${params.route}/${params.id}`
        );
        const json = await response.json();
        setData(json);
      }
    })();
  }, [slug]);

  return (
    <Layout>
      {!data && <Spinner animation='border' role='status' />}
      {data && (
        <Container className='info-page'>
          <Markdown>{data.content}</Markdown>
        </Container>
      )}
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => ({
  props: {
    slug: params.slug,
  },
});

export const getStaticPaths = async () => {
  try {
    return {
      paths: await getFooterPaths(),
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export default Page;
