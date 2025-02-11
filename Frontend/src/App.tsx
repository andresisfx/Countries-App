import { Route, Routes } from "react-router-dom";
import { ListOfCountries } from "./pages/LIstOfCountries.tsx";
import { CountriesInfo } from "./pages/CountriesInfo.tsx";
import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListOfCountries />} />
        <Route path="/country-info/:code" element={<CountriesInfo />} />
      </Routes>
    </>
  );
};
