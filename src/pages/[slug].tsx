// Modules
import React from "react";

// Components
import Layout from "@/components/Layout";
import Container from "react-bootstrap/Container";
import LayoutGeneral from "@/components/LayoutGeneral";
import LayoutSitemap from "@/components/LayoutSitemap";

// Others
import getFooterPaths from "@/utils/getFooterPath";

interface Props {
  slug: string;
}

const Page = ({ slug }: Props) => (
  <Layout>
    <Container>
      {slug === "sitemap" ? <LayoutSitemap /> : <LayoutGeneral slug={slug} />}
    </Container>
  </Layout>
);

export const getServerSideProps = ({ query }) => {
  const { slug } = query;
  return { props: { slug } };
};

export default Page;
