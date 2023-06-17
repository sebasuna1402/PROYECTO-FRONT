import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Layout } from "./pages/_layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ListCandidates from "./pages/candidates/ListCandidates";
import AddCandidate from "./pages/candidates/components/AddCandidate";
import ListOffers from "./pages/offers/ListOffers";
import { Candidate } from "./pages/candidates/components/Candidate";
import { CandidateSkills } from "./pages/candidates/components/CandidateSkills";
import { CandidateOffers } from "./pages/candidates/CandidateOffers";

// const CounterContext = React.createContext(0);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/AddCandidate" element={<AddCandidate />} />
          <Route path="/ListCandidates" element={<ListCandidates />} />
          <Route path="/offers" element={<ListOffers />} />

          {/* Fuente: https://reactrouter.com/en/main/hooks/use-params */}
          <Route path="/candidate/:id" element={<Candidate />} />
          <Route path="/skills/:id" element={<CandidateSkills />} />
          <Route path="/candidateoffers/:id" element={<CandidateOffers />} />

          <Route path="/*" element={<Home />} />
          {/* Manejar la ruta por defecto.. */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// export default CounterContext;
