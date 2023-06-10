import Board from "./components/Board";
import "@fontsource/fredoka-one";
import theme from "./theme";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
