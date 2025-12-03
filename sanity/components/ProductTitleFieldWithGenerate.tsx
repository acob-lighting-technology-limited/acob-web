import React from 'react';
import { StringInputProps, useFormValue, PatchEvent, set } from 'sanity';
import {
  generateProductTitle,
  canGenerateTitle,
} from '../lib/generate-product-fields';

export function ProductTitleFieldWithGenerate(props: StringInputProps) {
  const category = useFormValue(['category']) as string | undefined;
  const technical = useFormValue(['technical']) as
    | {
        name?: string;
        model?: string;
        capacity?: string;
        capacityAhOrKwh?: string;
        capacityKvaKw?: string;
        type?: string;
        batteryType?: string;
        cycleLife?: string;
        voltage?: string;
        phaseVoltage?: string;
        inverterType?: string;
        efficiency?: string;
        ipRatings?: string;
      }
    | undefined;

  const canGenerate = canGenerateTitle({
    category,
    technical,
  });

  const handleGenerate = () => {
    const generated = generateProductTitle({
      category,
      technical,
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
          Fill in Technical details (Name, Model, or Capacity) to enable
          generation
        </div>
      )}
    </div>
  );
}
