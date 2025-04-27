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
import Introduction from './pages/Thongnhat/Introduction';
  
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
        
        <Route path="/museumpage" element={<MuseumPage />} />

          {/* <Route path="/" element={<HomePage />} />
          <Route path="/museumpage" element={<MuseumPage />} />
          <Route path="/personalmuseum" element={<PersonalMuseum />} />

  
          <Route path="/taynguyengame" element={<TayNguyenGame />} />

  
           <Route path="/tankgame" element={<TankGame />} /> 
           <Route path="/leaderboard" element={<LeaderboardPage />} /> 

           <Route path="/cuchigame" element={<CuChiGameG1/>} />
           <Route path="/morse" element={<Morse />} />
           <Route path="/bantin" element={<Bantin />} />
           <Route path="/thongtin304" element={<ThongTin304 />} />
           <Route path="/thongnhat" element={<ThongTin304 />} />

          
          <Route path="/profile" element={<ProfilePage />} /> 

          <Route path="*" element={<NotFoundPage />} />          
          
          {/* Dong Ho Game */}
          {/* <Route path="/donghogame" element={<DongHoGame />} /> */}
          {/* <Route path="/FlipCard" element={<FlipCard />} /> */}
          
          {/* <Route path="/profile" element={<ProfilePage />} />  */}
          {/* <Route path="/introduction" element={<Introduction />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<ProfilePage />} /> 
          {/* <Route path="/" element={<LeaderboardPage />} />  */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

           {/* <Route path="/personalmuseum" element={<PersonalMuseum />} />   */}

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
    
  );
}

export default App; 





