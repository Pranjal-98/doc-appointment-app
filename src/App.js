import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppContextProvider from "./setContext";
import Routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes></Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
