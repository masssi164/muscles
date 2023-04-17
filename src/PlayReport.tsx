import React from "react";
import Report, { ReportEntry } from "./report.types";
import "./PlayReport.css"

interface PlayReportProps {
  report: Report; // Report-Objekt als Prop
  mode: "lastEntry" | "lastEntries"; // Modus zur Anzeige der Einträge: "lastEntry" für nur den letzten Eintrag, "lastEntries" für eine gewählte Anzahl der letzten Einträge
  numEntries?: number; // Anzahl der letzten Einträge, die angezeigt werden sollen (nur relevant, wenn mode auf "lastEntries" gesetzt ist)
}

export const PlayReport: React.FC<PlayReportProps> = ({
  report,
  mode,
  numEntries = 1,
}) => {
  let entriesToRender: ReportEntry[] = [];

  if (mode === "lastEntry") {
    entriesToRender = report.entries.slice(-1); // Nur den letzten Eintrag aus dem Report auswählen
  } else if (mode === "lastEntries") {
    entriesToRender = report.entries.slice(-numEntries); // Die gewählte Anzahl der letzten Einträge aus dem Report auswählen
  }

  return (
    <div>
      {/* JSX-Inhalt der PlayReport-Komponente */}
      <h1 className="report-title">Report Einträge</h1>
      <ul className="report-list">
        {/* Mapping über die ausgewählten Einträge */}
        {entriesToRender.map((entry, index) => (
          <li key={index} className="report-item">
            <p className="report-action">Aktion: {entry.action}</p>
            <p className="report-playername">Spielername: {entry.playerName}</p>
            <p className="report-correctness">
              Korrekt:{" "}
              {entry.isCorrect
                ? "Richtig"
                : entry.isCorrect === false
                ? "Nicht richtig"
                : "null"}
            </p>
            <p className="report-explanation">Erklärung: {entry.explanation}</p>
          </li>
        ))}
      </ul>
      {/* Button, um Report als JSON in die Zwischenablage zu kopieren */}
      <button
        className="report-button"
        onClick={() => {
          // Report als JSON-String formatieren
          const reportJson = JSON.stringify(report);
          // Report-JSON in die Zwischenablage kopieren
          try {
            navigator.clipboard.writeText(reportJson).then(() => {
              // Benachrichtigung über erfolgreiche Kopie anzeigen
              alert("Der Report wurde als JSON in die Zwischenablage kopiert!");
            });
          } catch (err) {
            err instanceof Error && alert(err.message);
          }
        }}
      >
        Report als JSON kopieren
      </button>
    </div>
  );
};
