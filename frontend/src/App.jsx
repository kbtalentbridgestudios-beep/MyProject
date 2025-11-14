import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Vision from "./components/Vision";
import { Job } from "./pages/Job";
import Mission from "./components/Mission";
import CandidateProfile from "./components/CandidateProfile";
import AdminDashboard from "./Dashboards/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import CandidateDashboard from "./Dashboards/CandidateDashboard";
import EmployerDashboard from "./Dashboards/EmployerDashboard";
import { PaymentPage } from "./pages/PaymentPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/login/admin" element={<AdminLogin />} />
        {/* Layout ke andar jitne bhi pages hain unme Navbar hamesha dikh jaayega */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<AboutUs />} />
           <Route path="our-vision" element= {<Vision/>} />
           <Route path="job" element= {<Job/>} />
           <Route path="our-mission" element= {<Mission/>} />
           <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
           <Route path="/dashboard/candidate" element={<CandidateDashboard/>} />
                   <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                   <Route path="/dashboard/admin" element={<AdminDashboard />} />
                   <Route path = "/payment" element={<PaymentPage/>} /> 
                  

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
