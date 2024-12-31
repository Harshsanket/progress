import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Timer from "./pages/Timer.tsx";
import Visuals from "./pages/Visuals.tsx";
import About from "./pages/About.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="timer" element={<Timer />} />
      <Route path="visuals" element={<Visuals />} />
      <Route path="about" element={<About />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
