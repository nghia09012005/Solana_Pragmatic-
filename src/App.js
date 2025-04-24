import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import MuseumPage from './pages/MuseumPage';
// import CollectionPage from './pages/CollectionPage';
// import LeaderboardPage from './pages/LeaderboardPage';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';


import DongHoGame from './pages/DongHoGame/DongHoGameG1';
import TayNguyenGame from './pages/TayNguyenGame';
import CuChiGameG1 from './pages/CuChiGame/CuChiGameG1';
import Morse from './pages/CuChiGame/Morse';

import FlipCard from './pages/DongHoGame/FlipCard';
import TankGame from './pages/Thongnhat/TankGame';
import Bantin from './pages/Thongnhat/Bantin';
import ThongTin304 from './pages/Thongnhat/ThongTin304';

  
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


          <Route path="/museum" element={<MuseumPage />} />
          
          {/* Tây Nguyên Gongs Game */}
          <Route path="taynguyengame" element={<TayNguyenGame />} />
          
          
          {/* Cu Chi Game */}
          <Route path="/cuchigame" element={<CuChiGameG1 />} />
          <Route path="/morse" element={<Morse />} />
          
          {/* Dong Ho Game */}
          <Route path="/donghogame" element={<DongHoGame />} />
          <Route path="/FlipCard" element={<FlipCard />} />
          
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
   
    
  );
}

export default App; 





