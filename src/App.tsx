import { useState } from "react";
import Board from "./components/Board";
import PlayerName from "./components/PlayerNames";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/name" element={<PlayerName />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
