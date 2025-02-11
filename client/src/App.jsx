/* Bibliotecas */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Paginas */
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import CreateForm from "./pages/CreateForm.jsx";
import EditForm from "./pages/EditForm.jsx";
import Form from "./pages/Form.jsx";

/* Otros archivos */
import Layout from "./components/Layout.jsx";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./lib/routes.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/create-form" element={<CreateForm />} />
                <Route path="/formulario/:id" element={<Form />} />
                <Route path="/editar-formulario/:id" element={<EditForm />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
