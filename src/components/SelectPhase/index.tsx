import React from 'react';
import { useTranslation } from 'react-i18next';
import SelectPhaseInput from '../SelectPhaseInput';
import './SelectPhase.css';

const GREEN_THEME = 'green';
const ORANGE_THEME = 'orange';
const RED_THEME = 'red';

interface Props {
  label: string;
  setPhase: (n: number) => void;
}

const SelectPhase = ({ label, setPhase }: Props) => {
  const { t } = useTranslation();
  const name = 'phase';

  return (
    <div className='select-phase'>
      <p>{label}</p>
      <SelectPhaseInput
        domId='phase-one'
        label={t('phase_1')}
        name={name}
        checked
        theme={GREEN_THEME}
        setPhase={setPhase}
        phaseNumber={1}
      />
      <SelectPhaseInput
        domId='phase-two'
        label={t('phase_2')}
        name={name}
        theme={ORANGE_THEME}
        setPhase={setPhase}
        phaseNumber={2}
      />
      <SelectPhaseInput
        domId='phase-three'
        label={t('phase_3')}
        name={name}
        theme={RED_THEME}
        setPhase={setPhase}
        phaseNumber={3}
      />
    </div>
  );
};

export default SelectPhase;
