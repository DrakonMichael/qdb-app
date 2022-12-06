import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import ContactMe from "./pages/ContactMe";
import Redirect from "./pages/Redirect";
import ViewTossup from "./pages/ViewTossup";
import ViewBonus from "./pages/ViewBonus";
import {useState} from "react";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/t/:id" element={<ViewTossup />} />
              <Route path="/b/:id" element={<ViewBonus />} />
              <Route path="*" element={<Redirect />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
