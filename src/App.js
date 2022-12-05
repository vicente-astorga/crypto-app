import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import CoinPage from "./routes/CoinPage";
import Account from "./routes/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

function App() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
