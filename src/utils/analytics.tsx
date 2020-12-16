import ReactGA from 'react-ga';

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

export const initGA = () => {
  // eslint-disable-next-line no-console
  console.log('GA init');
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_KEY);
};

export const logPageView = () => {
  // eslint-disable-next-line no-console
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
