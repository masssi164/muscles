import React, { useState } from "react";
import classNames from "classnames";
import "./NameDialog.css"; // Importieren Sie hier Ihre CSS-Datei

interface NameDialogProps {
  name: string;
  onSubmittedChange: (name:string) => void;
}

const NameDialog: React.FC<NameDialogProps> = ({
  name,
  onSubmittedChange
}) => {
  const [tempName, setTempName] = useState(name);
  const [submitted, setSubmitted] = useState<boolean>(true)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(event.target.value);
  };

  const handleSubmit = () => {
    if (tempName.trim() !== "") {
      onSubmittedChange(tempName);
      setSubmitted(true)
    }
  };

  const handleNameChangeButtonClick = () => {
    setSubmitted(false)
  };

  // CSS-Klassen basierend auf dem Zustand von submitted
  const nameDialogClasses = classNames("name-dialog", {
    "name-dialog--submitted": submitted,
  });

  return (
    <div className={nameDialogClasses}>
      {submitted ? (
        <div>
          <h2>Willkommen, {name}!</h2>
          <button onClick={handleNameChangeButtonClick}>
            Name ändern
          </button>
        </div>
      ) : (
        <div>
          <h2>Bitte geben Sie Ihren Namen ein:</h2>
          <input type="text" value={tempName} onChange={handleNameChange} onEnded={(e) => {
            handleSubmit()
          }} />
          <button onClick={handleSubmit}>Bestätigen</button>
        </div>
      )}
    </div>
  );
};

export default NameDialog;
