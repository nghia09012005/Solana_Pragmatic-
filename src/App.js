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



function App() {
  const { loading } = useAuth();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <div className="app">
      {/* <Header /> */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} /> */}
          {/* <Route path="/museum" element={<MuseumPage />} />
      
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
    // <Router>
    //   <div className="app">
    //     <main className="main-content">
    //       <Routes>
    //         <Route path="/" element={<HomePage />} />
    //         {/* <Route path="/museum" element={<MuseumPage />} />
    //         <Route path="/collection" element={<CollectionPage />} />
    //         <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         {/* <Route path="/profile" element={<ProfilePage />} /> */}
    //         <Route path="*" element={<NotFoundPage />} />
    //       </Routes>
    //     </main>
    //   </div>
    // </Router>
    
  );
}

export default App; 





