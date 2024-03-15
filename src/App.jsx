import {} from "react";
import Admin from "../src/Pages/Admin/Admin";
import Navbar from "./Components/Navbar/Navbar";
import "./services/axios";

const App = () => {
  return (
    <>
      <Navbar />
      <Admin />
    </>
  );
};

export default App;
