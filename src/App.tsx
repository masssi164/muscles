import React, { useState } from "react";
import { Player} from "./Player";
import { WorkFlow } from "./WorkFlow";

function App() {
  return (
    <div className="App">
      <WorkFlow mode="singleplayer" />
    </div>
  );
}

export default App;
