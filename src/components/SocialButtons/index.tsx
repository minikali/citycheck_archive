import React, { useEffect, useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import { useTranslation } from 'react-i18next';

const SocialButtons = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  // Social link
  const facebook = data?.filter((item) => item.label === 'facebook')[0];
  const email = data?.filter((item) => item.label === 'email')[0];
  const linkedin = data?.filter((item) => item.label === 'linkedin')[0];
  const twitter = data?.filter((item) => item.label === 'twitter')[0];
  const instagram = data?.filter((item) => item.label === 'instagram')[0];

  useEffect(() => {
    // Facebook share button
    ((d, s, id) => {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      // eslint-disable-next-line prefer-const
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/socials`
      );
      const json = await response.json();
      setData(json);
    })();
  }, []);

  return (
    <>
      <p>{t('share')}</p>
      <ul>
        {facebook?.active && (
          <li>
            <FacebookShareButton url={facebook.url}>
              <FacebookIcon round size={32} />
            </FacebookShareButton>
          </li>
        )}
        {email?.active && (
          <li>
            <EmailShareButton url={email.url}>
              <EmailIcon round size={32} />
            </EmailShareButton>
          </li>
        )}
        {linkedin?.active && (
          <li>
            <LinkedinShareButton url={linkedin.url}>
              <LinkedinIcon round size={32} />
            </LinkedinShareButton>
          </li>
        )}
        {twitter?.active && (
          <li>
            <TwitterShareButton url={twitter.url}>
              <TwitterIcon round size={32} />
            </TwitterShareButton>
          </li>
        )}
        {instagram?.active && (
          <li>
            <a href={instagram.url} target='_blank' rel='noopener noreferrer'>
              <img
                style={{ width: '32px' }}
                src='assets/images/instagram-icon.png'
                alt='instagramLogo'
              />
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default SocialButtons;
