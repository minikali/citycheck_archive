import React from 'react';
import './style.scss';

interface Props {
  domId: string;
  label: string;
  name: string;
  checked?: boolean;
  theme: string;
  setPhase: (n: number) => void;
  phaseNumber: number;
}

const defaultProps = {
  checked: false,
};

const SelectPhaseInput = ({
  domId,
  label,
  name,
  checked,
  theme,
  setPhase,
  phaseNumber,
}: Props) => (
  <div className='select-phase-input'>
    <label className={`label ${theme}`} htmlFor={domId}>
      {label}
      <input
        id={domId}
        type='radio'
        name={name}
        defaultChecked={checked}
        value={phaseNumber}
        onChange={(e) => setPhase(Number(e.target.value))}
      />
      <span className='checkmark' />
    </label>
  </div>
);
SelectPhaseInput.defaultProps = defaultProps;
export default SelectPhaseInput;
