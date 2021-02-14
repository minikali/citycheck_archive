// Modules
import React, { useEffect, useState } from "react";

// Components
import Markdown from "markdown-to-jsx";
import Spinner from "react-bootstrap/Spinner";

// Others
import getFooterPaths from "@/utils/getFooterPath";
import "./style.scss";
import Container from "react-bootstrap/Container";
import { useTranslation } from "react-i18next";

interface Props {
  slug: string;
}

const LayoutGeneral = ({ slug }: Props) => {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      const paths = await getFooterPaths();
      const { params } = paths.find((element) => element.params.slug === slug);

      if (params) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${params.route}?lang=${i18n.language}&slug=${slug}`
        );
        const json = await response.json();
        if (json.length > 0) setData(json[0]);
      }
    })();
  }, [slug, i18n.language]);

  return (
    <Container className="layout-general">
      {!data && <Spinner animation="border" role="status" />}
      {data && <Markdown>{data.content}</Markdown>}
    </Container>
  );
};

export default LayoutGeneral;
