import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import GamesComponent from './GamesComponent';
import GamesComponentA from './GamesComponentA';
import UserInfoPage from './UserInfoPage';
import GameDetails from './GameDetails';
import UserListComponent from './UserListComponent';
import BoughtGamesComponent from './BoughtGamesComponent'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/games" element={<GamesComponent />} />
          <Route path="/gamescrud" element={<GamesComponentA />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/users/:id" element={<UserInfoPage />} />
          <Route path="/userlist" element={<UserListComponent />} />
          <Route path="/bought-games/:id" element={<BoughtGamesComponent />} />  {/* Fixed route path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

