import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import DaNang from './pages/DaNang/DaNang';
// import CollectionPage from './pages/CollectionPage';
import LeaderboardPage from './pages/Leaderboard';
import BaNaHills from './pages/BaNaHills/BaNaHills';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import CauRong from './pages/DaNang/CauRong/CauRong';
import CauRongGame from './pages/DaNang/CauRong/Game';
import DongHoGame from './pages/DongHoGame/DongHoGameG1';
import TayNguyenGame from './pages/TayNguyenGame';
import CuChiGameG1 from './pages/CuChiGame/CuChiGameG1';
import Morse from './pages/CuChiGame/Morse';
import DienHai from './pages/DaNang/DienHai/DienHai';

import FlipCard from './pages/DongHoGame/FlipCard';
import TankGame from './pages/Thongnhat/TankGame';
import Bantin from './pages/Thongnhat/Bantin';

import PersonalMuseum from './pages/PersonalMuseum';
import Introduction from './pages/Thongnhat/Introduction';
import TankGame2 from './pages/Thongnhat/TankGame2';
import NarratorScreen from './pages/Thongnhat/NarratorScreen';

import BaNaHill from './pages/BaNaHills/BaNaHills'
<<<<<<< HEAD
  

=======
>>>>>>> e49a0beda353a86006c71f1817263542a845f115
import SendTokenTest from './pages/SendTokenTest';  
import VoucherMarketplace from './pages/VoucherMarket';

import TestGame from './pages/DaNang/DienHai/minigames/TestGame';

function App() {
  
  return (
    <div className="app">
      {/* <Header /> */}
      <main className="main-content">
        <Routes>

        <Route path="/" element={<VoucherMarketplace />} /> 
        {/* <Route path="/" element={<SendTokenTest />} /> */}
         {/* <Route path="/" element={<HomePage />} /> 
         */}
        <Route path="/danang" element={<DaNang />} />
        <Route path="/cauronggame" element={<CauRongGame />} />

          <Route path="/personalmuseum" element={<PersonalMuseum />} />

  
          <Route path="/taynguyengame" element={<TayNguyenGame />} />
          <Route path="/banahill" element={<BaNaHills />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/tankgame" element={<TankGame />} /> 
          <Route path="/bantin" element={<Bantin />} />

           <Route path="/cuchigame" element={<CuChiGameG1/>} />
           <Route path="/morse" element={<Morse />} />
           <Route path="/bantin" element={<Bantin />} />

          
          {/* <Route path="/profile" element={<ProfilePage />} />  */}
          <Route path="/" element={<ProfilePage />} /> 

          <Route path="/tankgame2" element={<TankGame2 />} />
          <Route path="/narrator" element={<NarratorScreen />} />
          <Route path="*" element={<NotFoundPage />} />          
          
          {/* Dong Ho Game */}

          <Route path="/donghogame" element={<DongHoGame />} />
          <Route path="/FlipCard" element={<FlipCard />} /> 
          <Route path="/dienhaicothanh" element=  {<DienHai />} />
          <Route path="/testgame" element=  {<TestGame />} />

          <Route path="/caurong" element={<CauRong />} /> 

          <Route path="/leaderboard" element={<LeaderboardPage />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="*" element={<NotFoundPage />} />    
         
          
  <Route path="/testgame" element={<TestGame />} /> 
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
    
  );
}

export default App; 