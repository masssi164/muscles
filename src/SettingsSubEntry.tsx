import React, { ChangeEvent } from 'react';
import { EntryValue } from './types.settings';

type SettingsSubEntryProps<T> = {
  entryValue: EntryValue<T>;
};

const SettingsSubEntry = <T,>({ entryValue }: SettingsSubEntryProps<T>) => {
  const { key, value, setValue } = entryValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setValue(newValue);
  };

  const renderInputField = () => {
    if (typeof value === 'string') {
      return (
        <input
          type="text"
          value={value as string}
          onChange={handleChange}
        />
      );
    } else if (typeof value === 'boolean') {
      return (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={handleChange}
        />
      );
    } else if (typeof value === 'number') {
      // Hier könntest du eine spezielle Input-Komponente für Zahlen implementieren
      // z.B. eine Slider-Komponente oder ein spezielles NumberInput
      // oder einfach ein Textfeld wie im string-Fall
      return (
        <input
          type="text"
          value={value.toString()}
          onChange={handleChange}
        />
      );
    } else {
      // Hier könntest du weitere spezielle Input-Komponenten für andere Typen hinzufügen
      // oder eine allgemeine Input-Komponente anzeigen, wenn der Typ nicht erkannt wird
      return (
        <input
          type="text"
          value={value.toString()}
          onChange={handleChange}
        />
      );
    }
  };

  return (
    <div>
      <label>{key}</label>
      {renderInputField()}
    </div>
  );
};

export default SettingsSubEntry;
