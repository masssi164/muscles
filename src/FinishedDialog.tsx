import React, { FC } from 'react';
import classNames from 'classnames';
import './FinishedDialog.css'; // Importieren Sie hier Ihre CSS-Datei

type Props = {
  finished: boolean;
  isUser: boolean;
};

const FinishedDialog: FC<Props> = ({ finished, isUser }) => {
  // Funktion, die aufgerufen wird, wenn "Neues Spiel beginnen" geklickt wird
  const handleStartNewGameClick = () => {
    // Code für "Neues Spiel beginnen" hier ausführen
    window.location.reload();
  };

  // Funktion, die aufgerufen wird, wenn "Anwendung schließen" geklickt wird
  const handleCloseApplicationClick = () => {
    // Code für "Anwendung schließen" hier ausführen
    console.log('Anwendung schließen wurde geklickt');
    // Dialog schließen
    window.close();
  };

  // CSS-Klassen basierend auf dem Wert von "isUser"
  const finishedDialogClasses = classNames('finished-dialog', {
    'finished-dialog--win': isUser,
    'finished-dialog--loss': !isUser,
  });

  // Render-Methode abhängig vom Wert von "finished"
  if (finished) {
    return (
      <div className={finishedDialogClasses} aria-label="FinishDialog" autoFocus>
        {/* Benutzerdefinierter Dialog */}
        <h1>Spielende</h1>
        {isUser ? (
          <div>
            <p>Glückwunsch, du hast gewonnen!</p>
          </div>
        ) : (
          <div>
            <p>Leider verloren.</p>
          </div>
        )}
        <h2>Möchtest du ein neues Spiel beginnen oder die Anwendung schließen?</h2>
        <button onClick={handleStartNewGameClick}>Neues Spiel beginnen</button>
        <button onClick={handleCloseApplicationClick}>Anwendung schließen</button>
      </div>
    );
  } else {
    // Wenn "finished" false ist, wird null gerendert
    return null;
  }
};

export default FinishedDialog;
