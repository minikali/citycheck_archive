const getPathFromApi = async (route, lang) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${route}?_limit=-1&lang=${lang}`
  );
  const json = await response.json();

  return json.map(({ id, title, slug }) => ({
    params: {
      title,
      slug,
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

export default getFooterPaths;
