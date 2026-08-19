import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import CreateUserPage from "./pages/createUser";
import FeedPage from "./pages/feed";
import AuthUserPage from "./pages/authUser";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/user/auth" element={<AuthUserPage />} />
        <Route path="/user/create" element={<CreateUserPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
