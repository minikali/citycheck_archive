import React, { createContext, useState, useEffect } from 'react';

interface LayoutContextProps {
  BannerUrl?: string;
  LogoUrl?: string;
}

export const LayoutContext = createContext<LayoutContextProps>({});

interface Props {
  children: React.ReactNode;
}

const LayoutContextProvider = ({ children }: Props) => {
  const [LogoUrl, setLogoUrl] = useState(null);
  const [BannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/layouts`
        );
        if (response.status !== 200)
          throw Error(`Error code ${response.status}`);
        const json = await response.json();
        setBannerUrl(
          process.env.NEXT_PUBLIC_API_URL +
            json.filter(({ label }) => label === 'banner').shift().media.url
        );
        setLogoUrl(
          process.env.NEXT_PUBLIC_API_URL +
            json.filter(({ label }) => label === 'logo').shift().media.url
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, []);

  return (
    <LayoutContext.Provider value={{ LogoUrl, BannerUrl }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
