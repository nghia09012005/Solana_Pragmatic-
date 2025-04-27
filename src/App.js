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

import PersonalMuseum from './pages/PersonalMuseum';
import Introduction from './pages/Thongnhat/Introduction';
import TankGame2 from './pages/Thongnhat/TankGame2';
import NarratorScreen from './pages/Thongnhat/NarratorScreen';
  
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

          <Route path="/personalmuseum" element={<PersonalMuseum />} />

  
          <Route path="/taynguyengame" element={<TayNguyenGame />} />

          <Route path="/introduction" element={<Introduction />} />
          <Route path="/tankgame" element={<TankGame />} /> 
          <Route path="/bantin" element={<Bantin />} />

           <Route path="/cuchigame" element={<CuChiGameG1/>} />
           <Route path="/morse" element={<Morse />} />
           <Route path="/bantin" element={<Bantin />} />

          
          <Route path="/profile" element={<ProfilePage />} /> 

          <Route path="/tankgame2" element={<TankGame2 />} />
          <Route path="/narrator" element={<NarratorScreen />} />
          <Route path="*" element={<NotFoundPage />} />          
          
          {/* Dong Ho Game */}

          <Route path="/donghogame" element={<DongHoGame />} />
           <Route path="/FlipCard" element={<FlipCard />} /> 



           <Route path="/leaderboard" element={<LeaderboardPage />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="*" element={<NotFoundPage />} />    
          {/* <Route path="/" element={<ProfilePage />} />  */}
          

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
    
  );
}

export default App; 





