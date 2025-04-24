import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import MuseumPage from './pages/MuseumPage';
// import CollectionPage from './pages/CollectionPage';
// import LeaderboardPage from './pages/LeaderboardPage';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import NotFoundPage from './pages/NotFoundPage';


import DongHoGame from './pages/DongHoGame/DongHoGameG1';

import FlipCard from './pages/DongHoGame/FlipCard';

import CuChiGameG1 from './pages/CuChiGame/CuChiGameG1';
import Morse from './pages/CuChiGame/Morse';
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




        {/* {<Route path="/" element={<DongHoGame />} />} */}
        {/* {<Route path="/FlipCard" element={<FlipCard />} />} */}


        {/* {<Route path="/" element={<DongHoGame />} />}
        {<Route path="/FlipCard" element={<FlipCard />} />} */}


          {/* <Route path="/" element={<HomePage />} /> */}

         {/* {<Route path="/" element={<DongHoGame />} />} */}
        {/* {<Route path="/FlipCard" element={<FlipCard />} />}  */}



          {/* <Route path="/" element={<HomePage />} /> */}

          {/* <Route path="/" element={<HomePage />} /> */}

          {/* <Route path="/" element={<TankGame />} /> */}

          {/* <Route path="/" element={<Bantin />} /> */}

          {/* <Route path="/" element={<ThongTin304 />} /> */}

          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
          {/* <Route path="/RegisterPage" element={<RegisterPage />} /> */}

          {/* path="/CuChiGame" sau khi test xong */}
          
          <Route path="/" element={<CuChiGameG1/>} />
          <Route path="/morse" element={<Morse />} />

          {/* <Route path="/museum" element={<MuseumPage />} /> */}
      
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
         {/* <Route path="*" element={<NotFoundPage />} />  */}

         {/* <Route path="/" element={<CuChiGameG1/>} /> */}

        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
   
    
  );
}

export default App; 





