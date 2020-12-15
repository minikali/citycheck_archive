import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  domId: string;
  setFiles: (f: File[]) => void;
  files: File[];
}

const Upload = ({ domId, setFiles, files }: Props) => {
  const { t } = useTranslation();

  const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFiles([...files, ...event.target.files]);
  };

  const deleteFile = (filename: string) => {
    setFiles((files || []).filter((file) => file.name !== filename));
  };

  const Files = (files || []).map((file) => (
    <div className='file-item' key={uuidv4()}>
      <span>{file.name}</span>
      <Button variant='link' onClick={() => deleteFile(file.name)}>
        <img src='assets/images/black-x.png' alt='cross' />
      </Button>
    </div>
  ));

  return (
    <div className='upload'>
      <p>{t('Attachments')}</p>
      <label htmlFor={domId}>
        {t('choose')}
        <input id={domId} type='file' onChange={uploadFiles} hidden multiple />
      </label>
      <div className='content'>{Files}</div>
    </div>
  );
};

export default Upload;
