import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protect from "./components/Protect";
import PageNotFound from "./pages/PageNotFound";
import InterMediatoryAuth from "./pages/InterMediatory";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Protect>
                  <Home />
                </Protect>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/auth" element={<InterMediatoryAuth />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
