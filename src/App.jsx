import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import React from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Library from './pages/Library';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';

import ProtectedLayout from './layout/ProtectedLayout';
import './App.css';

function PrivateRoute ({ children }) {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Cargando...</div>;
  const newChildren = <ProtectedLayout> {children} </ProtectedLayout>
  return user ? newChildren : <Navigate to="/Login" />;
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Route */}
          <Route path="/"
            element={
              <PrivateRoute>
                  <Home />
              </PrivateRoute>
            }
          />
          <Route path="/library"
            element={
              <PrivateRoute>
                  <Library />
              </PrivateRoute>
            }
          />
          <Route path="/games"
            element={
              <PrivateRoute>
                  <Games />
              </PrivateRoute>
            }
          />
          <Route path="/games/:title"
            element={
              <PrivateRoute>
                  <GameDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
