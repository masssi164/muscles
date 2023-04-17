type Action = "draw" | "play";

export type ReportEntry = {
  action: Action; // Aktion, entweder "draw" oder "play"
  playerName: string; // Spielername
  isCorrect: boolean | null; // Flag, ob die Aktion korrekt war oder nicht, oder null für "draw"
  explanation: string; // Erklärung als Text, z.B. warum die Aktion falsch war
};

type Report = {
  entries: ReportEntry[]; // Liste von Report-Einträgen
};

export default Report;
// Funktion zum Hinzufügen eines Eintrags zum Report
export const addEntryToReport = (
    report: Report,                 // Aktueller Report
    entry: ReportEntry             // Neuer Eintrag für den Report
   ) => {
    // Erstelle einen neuen Report mit dem neuen Eintrag am Ende des aktuellen Reports
    const updatedReport: Report = {
    ...report,                          // Flache Kopie des aktuellen Reports
    entries: [...report.entries, entry]   // Füge den neuen Eintrag am Ende des aktuellen Reports hinzu
};

// Gib den aktualisierten Report zurück
return updatedReport;
};
