import fetch from 'node-fetch';

export default (async () => {
  const getLegalInformation = async () => {
    try {
      const url = `${'https://admin.citycheck.fr'}/informationslegales`;

      const res = await fetch(url).then((r) => r.json());
      const legal = res.map(({ title }) => {
        const path = title
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return path;
      });
      return legal;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getAbout = async () => {
    try {
      const url = `${'https://admin.citycheck.fr'}/apropos`;

      const res = await fetch(url).then((r) => r.json());
      const about = res.map(({ title }) => {
        const path = title
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return path;
      });
      return about;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getSiteMap = async () => {
    try {
      const url = `${'https://admin.citycheck.fr'}/sitemaps`;
      const sitemap = await fetch(url).then((r) => r.json());

      return sitemap.map(({ path }) =>
        path
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const legalPath = await getLegalInformation();
  const aboutPath = await getAbout();
  const sitemapPath = await getSiteMap();

  const routes = [
    '/',
    '/contact',
    '/suggest',
    '/about-us',
    ...legalPath,
    ...aboutPath,
    ...sitemapPath,
  ];
  return routes;
})();
