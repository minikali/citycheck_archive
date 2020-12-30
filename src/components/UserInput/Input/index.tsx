import React, { CSSProperties } from 'react';
import './style.scss';

interface Props {
  domId: string;
  setValue: (s?: string) => void;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  autoComplete?: string;
  role?: string;
  'aria-autocomplete'?: 'list' | 'none' | 'inline' | 'both';
  'aria-expanded'?: boolean;
  className?: string;
  disabled?: boolean;
  onKeyDown?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
  required?: boolean;
  style?: CSSProperties;
  onFocus?: () => void;
}

const defaultProps = {
  placeholder: '',
  type: 'text',
  label: '',
  value: '',
  autoComplete: null,
  role: null,
  'aria-autocomplete': null,
  'aria-expanded': null,
  className: null,
  disabled: null,
  onKeyDown: null,
  onBlur: null,
  onChange: null,
  required: false,
  style: null,
  onFocus: null,
};

const Input = (props: Props) => {
  const {
    domId,
    label,
    placeholder,
    value,
    setValue,
    type,
    autoComplete,
    role,
    className,
    disabled,
    onKeyDown,
    onBlur,
    onChange,
    'aria-autocomplete': ariaAutoComplete,
    'aria-expanded': ariaExpanded,
    required,
    style,
    onFocus,
  } = props;
  return (
    <div className='input'>
      <label className='label' htmlFor={domId}>
        {label}
        <input
          onFocus={onFocus}
          style={style}
          id={domId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange || ((e) => setValue(e.target.value))}
          autoComplete={autoComplete}
          role={role}
          className={className}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          aria-autocomplete={ariaAutoComplete}
          aria-expanded={ariaExpanded}
          required={required}
        />
      </label>
    </div>
  );
};

Input.defaultProps = defaultProps;
export default Input;
