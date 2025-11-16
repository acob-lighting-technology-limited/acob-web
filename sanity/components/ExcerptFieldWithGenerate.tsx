import React from 'react';
import { TextInputProps, useFormValue, PatchEvent, set } from 'sanity';
import {
  generateProjectExcerpt,
  canGenerateExcerpt,
} from '../lib/generate-project-fields';

export function ExcerptFieldWithGenerate(props: TextInputProps) {
  const location = useFormValue(['location']) as string | undefined;
  const state = useFormValue(['state']) as string | undefined;
  const impactMetrics = useFormValue(['impactMetrics']) as
    | {
        kwp?: number;
        systemType?: string;
        beneficiaries?: number;
        annualEnergyOutput?: number;
      }
    | undefined;

  const canGenerate = canGenerateExcerpt({
    location,
    state,
    impactMetrics,
  });

  const handleGenerate = () => {
    const generated = generateProjectExcerpt({
      location,
      state,
      impactMetrics,
    });
    if (generated) {
      props.onChange(PatchEvent.from(set(generated)));
    }
  };

  return (
    <div>
      {props.renderDefault(props)}
      {canGenerate && (
        <button
          type="button"
          onClick={handleGenerate}
          style={{
            marginTop: '8px',
            padding: '6px 12px',
            backgroundColor: '#2276fc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#1a5fd4';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#2276fc';
          }}
        >
          Generate
        </button>
      )}
      {!canGenerate && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#666',
          }}
        >
          Fill in Location, State, kWp, and System Type to enable generation
        </div>
      )}
    </div>
  );
}
