// Modules
import React from 'react';

// Components
import Layout from '@/components/Layout';
import Container from 'react-bootstrap/Container';
import LayoutGeneral from '@/components/LayoutGeneral';
import LayoutSitemap from '@/components/LayoutSitemap';

// Others
import getFooterPaths from '@/utils/getFooterPath';

interface Props {
  slug: string;
}

const Page = ({ slug }: Props) => (
  <Layout>
    <Container className='info-page'>
      {slug === 'sitemap' ? <LayoutSitemap /> : <LayoutGeneral slug={slug} />}
    </Container>
  </Layout>
);

export const getStaticProps = async ({ params }) => ({
  props: {
    slug: params.slug,
  },
});

export const getStaticPaths = async () => {
  try {
    return {
      paths: [
        ...(await getFooterPaths()),
        {
          params: {
            slug: 'sitemap',
          },
        },
      ],
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
