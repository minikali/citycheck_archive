import slugify from 'slugify';

const getPathFromApi = async (route, lang) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${route}?_limit=-1&lang=${lang}`
  );
  const json = await response.json();

  return json.map(({ id, title }) => ({
    params: {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      route,
      lang,
      id,
    },
  }));
};

interface PathParam {
  params: {
    title: string;
    slug: string;
    route: string;
    lang: string;
    id: number;
  };
}

const getFooterPaths = async (): Promise<PathParam[]> => {
  try {
    return [
      ...(await getPathFromApi('apropos', 'fr')),
      ...(await getPathFromApi('informationslegales', 'fr')),
      ...(await getPathFromApi('apropos', 'en')),
      ...(await getPathFromApi('informationslegales', 'en')),
    ];
    // return {
    //   fr: {
    //     about: {
    //       paths: await getPathFromApi('apropos', 'fr'),
    //     },
    //     information: {
    //       paths: await getPathFromApi('informationslegales', 'fr'),
    //     },
    //   },
    //   en: {
    //     about: {
    //       paths: await getPathFromApi('apropos', 'en'),
    //     },
    //     information: {
    //       paths: await getPathFromApi('informationslegales', 'en'),
    //     },
    //   },
    // };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

export default getFooterPaths;
