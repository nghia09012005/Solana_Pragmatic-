import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import MuseumPage from './pages/MuseumPage';
// import CollectionPage from './pages/CollectionPage';
import LeaderboardPage from './pages/Leaderboard';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';


import DongHoGame from './pages/DongHoGame/DongHoGameG1';
import TayNguyenGame from './pages/TayNguyenGame';
import CuChiGameG1 from './pages/CuChiGame/CuChiGameG1';
import Morse from './pages/CuChiGame/Morse';

import FlipCard from './pages/DongHoGame/FlipCard';
import TankGame from './pages/Thongnhat/TankGame';
import Bantin from './pages/Thongnhat/Bantin';
import ThongTin304 from './pages/Thongnhat/ThongTin304';
import PersonalMuseum from './pages/PersonalMuseum';
  
function App() {
  // const { loading } = useAuth();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <div className="app">
      {/* <Header /> */}
      <main className="main-content">
        <Routes>
        <Route path="/" element={<HomePage />} />
          
          {/* Tây Nguyên Gongs Game */}

          
           <Route path="/museumpage" element={<MuseumPage />} />

  
          <Route path="/taynguyengame" element={<TayNguyenGame />} />

  
           <Route path="/tankgame" element={<TankGame />} /> 
           <Route path="/leaderboard" element={<LeaderboardPage />} /> 

           <Route path="/cuchigame" element={<CuChiGameG1/>} />
           <Route path="/morse" element={<Morse />} />
           <Route path="/bantin" element={<Bantin />} />

          
          {/* <Route path="/profile" element={<ProfilePage />} />  */}
          {/* <Route path="*" element={<NotFoundPage />} />          
           */}
          {/* Dong Ho Game */}
          {/* <Route path="/donghogame" element={<DongHoGame />} />
          <Route path="/FlipCard" element={<FlipCard />} />
          
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="*" element={<NotFoundPage />} /> */}

          {/* <Route path="/" element={<PersonalMuseum />} />  */}

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
    
  );
}

export default App; 





