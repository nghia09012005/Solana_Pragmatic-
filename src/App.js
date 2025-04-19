import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import MuseumPage from './pages/MuseumPage';
// import CollectionPage from './pages/CollectionPage';
// import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CuChiGameG1 from './pages/CuChiGame/CuChiGameG1';
import Morse from './pages/CuChiGame/Morse';


function App() {
  const { loading } = useAuth();


  return (
    <div className="app">
      {/* <Header /> */}
      <main className="main-content">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
          {/* <Route path="/RegisterPage" element={<RegisterPage />} /> */}

          {/* path="/CuChiGame" sau khi test xong */}
          <Route path="/" element={<CuChiGameG1/>} />
          <Route path="/morse" element={<Morse />} />
          
          {/* <Route path="/museum" element={<MuseumPage />} />
      
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
 
  );
}

export default App; 





