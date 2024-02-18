import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Login from "./pages/profile/login";
import Logout from "./pages/profile/logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile/login" element={<Login />} />
      <Route path="profile/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
