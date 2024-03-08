import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  Dashboard,
  Review,
  HowToRegister,
  SignIn,
  SignUp,
  Layout,
  ReviewSubjectDetail,
  ReviewLayout,
} from './pages/index';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {

  const AuthContext = createContext(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  // console.log(token);

  return (
    <AuthContext.Provider value={token}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="review"
              element={
                <ProtectedRoute>
                  <ReviewLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Review />} />
              <Route path=":reviewId" element={<ReviewSubjectDetail />} />
            </Route>
          </Route>
          <Route
            path="howToRegister"
            element={
              <ProtectedRoute>
                <HowToRegister />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App