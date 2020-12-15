import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import './style.scss';

const LayoutSitemap = () => {
  const [sitemap, setSitemap] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sitemaps`
      );
      const json = await response.json();

      setSitemap(json);
    })();
  }, []);

  return (
    <Container className='layout-sitemap'>
      <h2>{t('sitemap_title')}</h2>
      <h3>{t('menu_title')}</h3>
      <ul>
        <li>
          <Link href='/'>
            <a>{t('nav_home')}</a>
          </Link>
        </li>
        <li>
          <Link href='/about-us'>
            <a>{t('nav_about_us')}</a>
          </Link>
        </li>
        <li>
          <Link href='/suggest'>
            <a>{t('nav_suggest_place')}</a>
          </Link>
        </li>
        <li>
          <Link href='/about-us'>
            <a>{t('nav_contact')}</a>
          </Link>
        </li>
      </ul>
      <h3>{t('title_city')}</h3>
      <ul>
        {sitemap.map(({ path, title }) => (
          <li key={uuidv4()}>
            <Link href={`/map/${path}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default LayoutSitemap;
