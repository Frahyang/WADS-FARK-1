import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import AdminDashboardSummary from './pages/AdminDashboardSummary'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CustStaffDashboard from './pages/CustStaffDashboard'
import OTPVerification from './pages/OTPVerification'
import TicketAppScreen from './pages/TicketAppScreen';

// interface User { // This interface might still be used elsewhere, so I'll leave it for now.
//   id?: string;
// }

function App() {
  // Remove user declaration and console log
  // const user = JSON.parse(localStorage.getItem("user") || "{}") as User;
  // console.log(localStorage.getItem("user"));
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about_us' element={<AboutUs />} />
      <Route path='/services' element={<Services />} />
      <Route path='/articles' element={<Articles />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/tickets' element={<CustStaffDashboard />} />
      <Route path='/createticket' element={<TicketAppScreen />} />
      <Route path='/admin/:status?' element={<AdminDashboard />} />
      <Route path='/admin/summary' element={<AdminDashboardSummary />} />
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/verify-email' element={<OTPVerification/>}/>
    </Routes>
  )
}
export default App
