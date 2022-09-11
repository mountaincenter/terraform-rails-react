import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CommonLayout from "./components/layouts/CommonLayout";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";



const App:React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </CommonLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
