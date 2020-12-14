// Modules
import React, { useEffect, useState } from 'react';

// Components
import Markdown from 'markdown-to-jsx';
import Spinner from 'react-bootstrap/Spinner';

// Others
import getFooterPaths from '@/utils/getFooterPath';

interface Props {
  slug: string;
}

const LayoutGeneral = ({ slug }: Props) => {
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
    <>
      {!data && <Spinner animation='border' role='status' />}
      {data && <Markdown>{data.content}</Markdown>}
    </>
  );
};

export default LayoutGeneral;
