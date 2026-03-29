import React from "react";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Loading from "./components/Loading.jsx";
import { UserData } from "./context/User.jsx";
import Admin from "./pages/Admin.jsx";
import PlayList from "./pages/PlayList.jsx";
import Album from "./pages/Album.jsx";
import Premium from './pages/Premium';
import Payment from './pages/Payment';




const App = () => {
  const { loading, user, isAuth } = UserData();

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>


        {/* Home */}
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        {/* Playlist*/}
        <Route
          path="/playlist"
          element={isAuth ? <PlayList user={user} /> : <Navigate to="/login" />}
        />

        {/* Album*/}
        <Route
          path="/Album/:id"
          element={isAuth ? <Album user={user} /> : <Navigate to="/login" />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            isAuth && user?.role === "admin"
              ? <Admin />
              : <Navigate to="/login" />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />


        {/* Register */}
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/premium" element={<Premium />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;