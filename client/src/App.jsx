/* Bibliotecas */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Paginas */
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewForm from "./pages/Form/New.jsx";
import EditForm from "./pages/Form/Edit.jsx";
import SolveForm from "./pages/Form/Solve.jsx";
import SubmittedForm from "./pages/Form/submitted.jsx";
import FormResponses from "./pages/Form/Responses.jsx";

/* Otros archivos */
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./lib/routes.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forms/new" element={<NewForm />} />
              <Route path="/forms/:id/edit" element={<EditForm />} />
              <Route path="/forms/:id/solve" element={<SolveForm />} />
              <Route path="/forms/:id/submitted" element={<SubmittedForm />} />
              <Route path="/forms/:id/responses" element={<FormResponses />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
