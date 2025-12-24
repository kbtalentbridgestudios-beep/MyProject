// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import AboutUs from "./pages/AboutUs";
// import Login from "./pages/Login";
// import Registration from "./pages/Registration";
// import Gallery from "./pages/Gallery";
// import Vision from "./components/Vision";
// import  Job  from "./pages/Job";
// import Mission from "./components/Mission";
// import AdminDashboard from "./Dashboards/AdminDashboard";
// import AdminLogin from "./pages/admin/AdminLogin.jsx";
// import CandidateDashboard from "./Dashboards/CandidateDashboard";
// import EmployerDashboard from "./Dashboards/EmployerDashboard";
// import Terms from "./pages/Terms.jsx"
// import  PaymentPage  from "./pages/PaymentPage.jsx";
// import Privacy from "./pages/Privacy.jsx"
// import Faq from "./pages/Faq.jsx";
// import ContactUs  from "./components/ContactUs.jsx";
// import PaymentResult from "./pages/PaymentResult";

// function App() {
//   return (
//     <Router>
//       <Routes>
//          <Route path="/login/admin" element={<AdminLogin />} />
//          <Route path="/payment-result" element={<PaymentResult />} />
//         {/* Layout ke andar jitne bhi pages hain unme Navbar hamesha dikh jaayega */}
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
      
//            <Route path="/about" element={<AboutUs />} />
//            <Route path="our-vision" element= {<Vision/>} />
//            <Route path="job" element= {<Job/>} />
//            <Route path="our-mission" element= {<Mission/>} />
//            <Route path="/gallery" element={<Gallery />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Registration />} />
//            <Route path="/dashboard/candidate" element={<CandidateDashboard/>} />
//                    <Route path="/dashboard/employer" element={<EmployerDashboard />} />
//                    <Route path="/dashboard/admin" element={<AdminDashboard />} />
//                    <Route path = "/payment" element={<PaymentPage/>} /> 
                   
//                    <Route path = "/terms" element={<Terms/>} />
//                    <Route path = "/privacy" element={<Privacy/> } />
//                    <Route path = "faq" element = {<Faq/>} />
//                    <Route path = "contact" element = {<ContactUs/>} />
                  

//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// TEST CHANGE - KBTS


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Gallery from "./pages/Gallery";
import Vision from "./components/Vision";
import Job from "./pages/Job";
import Mission from "./components/Mission";
import AdminDashboard from "./Dashboards/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import CandidateDashboard from "./Dashboards/CandidateDashboard";
import EmployerDashboard from "./Dashboards/EmployerDashboard";
import Terms from "./pages/Terms.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Privacy from "./pages/Privacy.jsx";
import Faq from "./pages/Faq.jsx";
//import Movies from "./components/Movies.jsx";
import ContactUs from "./components/ContactUs.jsx";
import PaymentResult from "./pages/PaymentResult";
import  News  from "./pages/News.jsx";

//  NEWS ADMIN IMPORTS
import NewsAdminLogin from "./news-admin/Login";
import NewsDashboard from "./news-admin/Dashboard";
import CreateNews from "./news-admin/CreateNews";
import EditNews from "./news-admin/EditNews";
import ProtectedRoute from "./news-admin/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔐 Main Admin Login */}
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* 🔐 News Admin Login */}
        <Route path="/news-admin/login" element={<NewsAdminLogin />} />

        {/* 🔥 NEWS ADMIN PANEL ROUTES */}
        <Route
          path="/news-admin/dashboard"
          element={
            <ProtectedRoute>
              <NewsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news-admin/create"
          element={
            <ProtectedRoute>
              <CreateNews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news-admin/edit/:id"
          element={
            <ProtectedRoute>
              <EditNews />
            </ProtectedRoute>
          }
        />

        {/* Payment Result */}
        <Route path="/payment-result" element={<PaymentResult />} />

        {/* All pages inside Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="our-vision" element={<Vision />} />
          <Route path="job" element={<Job />} />
          <Route path="our-mission" element={<Mission />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
