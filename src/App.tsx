import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DictionaryPage from './pages/DictionaryPage';
import RecommendPage from './pages/RecommendPage';
import TrainingPage from './pages/TrainingPage';
import AuthLayout from './components/AuthLayout/AuthLayout';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux/store';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/authOperations';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
        </Route>

        <Route path="/dictionary" element={<PrivateRoute><DictionaryPage /></PrivateRoute>} />
        <Route path="/recommend" element={<PrivateRoute><RecommendPage /></PrivateRoute>} />
        <Route path="/training" element={<PrivateRoute><TrainingPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
