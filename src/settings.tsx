import { Entry, GreatEntry } from "./types.settings";
import SettingsSubEntry from "./SettingsSubEntry";

type Props = {
  entries: (Entry | GreatEntry)[];
};

const Settings = ({ entries }: Props) => {
  return (
    <div className="settings" data-testid="settings">
      <h1 className="settings__title" data-testid="settings-title">Settings</h1>
      {entries.map((entry, index) => {
        if ("subentry" in entry) {
          return (
            <div className="settings__entry" data-testid={`settings-entry-${index}`} key={index}>
              <h2 className="settings__entry-title" data-testid={`settings-entry-title-${index}`}>{entry.header}</h2>
              {Object.entries(entry.subentry).map(([key, value], subIndex) => (
                <SettingsSubEntry
                  key={subIndex}
                  label={key}
                  value={value}
                  onChange={(newValue) => {
                    entry.subentry[key] = newValue;
                  }}
                  data-testid={`settings-subentry-${index}-${subIndex}`}
                />
              ))}
            </div>
          );
        } else {
          return (
            <div className="settings__entry" data-testid={`settings-entry-${index}`} key={index}>
              <h2 className="settings__entry-title" data-testid={`settings-entry-title-${index}`}>{entry.header}</h2>
              {entry.entries.map((subentry, subIndex) => (
                <div className="settings__subentry" data-testid={`settings-subentry-${index}-${subIndex}`} key={subIndex}>
                  {Object.entries(subentry).map(([key, value]) => (
                    <SettingsSubEntry
                      key={key}
                      label={key}
                      value={value}
                      onChange={(newValue) => {
                        subentry[key] = newValue;
                      }}
                      data-testid={`settings-subentry-${index}-${subIndex}-${key}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Settings;
