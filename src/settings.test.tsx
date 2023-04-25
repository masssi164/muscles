import { render, screen } from '@testing-library/react';
import Settings from './settings';
import { GreatEntry, Entry } from './types.settings';

describe('Settings component', () => {
  const greatEntry: GreatEntry = {
    header: 'Great Entry',
    entries: [
      {
        header: 'Sub Entry 1',
        subEntry: {
          key: 'Option 1',
          value: true,
          setValue: () => {},
        },
      },
      {
        header: 'Sub Entry 2',
        subEntry: {
          key: 'Option 2',
          value: 'Default value',
          setValue: () => {},
        },
      },
      {
        header: 'Sub Entry 3',
        subEntries: [
          {
            key: 'Option 3.1',
            value: 123,
            setValue: () => {},
          },
          {
            key: 'Option 3.2',
            value: '',
            setValue: () => {},
          },
        ],
      },
    ],
  };

  const entry: Entry = {
    header: 'Entry',
    subEntry: {
      key: 'Option',
      value: true,
      setValue: () => {},
    },
  };

  it('renders GreatEntry with sub entries', () => {
    render(<Settings entries={[greatEntry]} />);

    expect(screen.getByTestId('settings')).toBeInTheDocument();
    expect(screen.getByTestId('great-entry')).toBeInTheDocument();
    expect(screen.getAllByTestId('settings-sub-entry')).toHaveLength(3);
  });

  it('renders Entry with sub entry', () => {
    render(<Settings entries={[entry]} />);

    expect(screen.getByTestId('settings')).toBeInTheDocument();
    expect(screen.getByTestId('entry')).toBeInTheDocument();
    expect(screen.getByTestId('settings-sub-entry')).toBeInTheDocument();
  });
});
