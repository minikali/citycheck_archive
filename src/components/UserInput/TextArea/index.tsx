import React from 'react';
import './style.scss';
import '../style.scss';

interface Props {
  domId: string;
  label?: string;
  placeholder?: string;
  value?: string;
  setValue: (s: string) => void;
  required?: boolean;
}

const defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  required: false,
};

const TextArea = (props: Props) => {
  const { domId, label, placeholder, value, setValue, required } = props;
  return (
    <div className={`text-area ${domId}`}>
      <label className='label' htmlFor={domId}>
        {label}
        <textarea
          id={domId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
        />
      </label>
    </div>
  );
};

TextArea.defaultProps = defaultProps;
export default TextArea;
