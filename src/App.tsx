import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DictionaryPage from "./pages/DictionaryPage";
import RecommendPage from "./pages/RecommendPage";
import TrainingPage from "./pages/TrainingPage";
import AuthLayout from "./components/AuthLayout/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout/>}>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Route>
      
      <Route path="/dictionary" element={<DictionaryPage/>} />
      <Route path="/recommend" element={<RecommendPage/>} />
      <Route path="/training" element={<TrainingPage/>} />
      <Route path="*" element={< Navigate to="/login" />} />
    </Routes>
  );
}

export default App;