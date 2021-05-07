import React, { useState } from "react";
import Header from "../pages/Header";
import Sidebar2 from "./components/Sidebar2";
import "./styles.css";

function App4() {
  const [status, setStatus] = useState(false);
  return (
    <div className="App">
      <Header />
      <Sidebar2 show={status} />
      <button className="Button" onClick={() => setStatus(status => !status)}>
        Toggle
      </button>
    </div>
  );
}

export default App4;