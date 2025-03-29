import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, Navigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './design.css';

function GamesComponentA() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    publisher: '',
    genre: '',
    year: '',
    developer: '',
    rating: '',
    os: '',
    price: '',
  });
  const [updateGames, setUpdateGames] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title'); 
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true);
      setUserRole(localStorage.getItem('userRole'));
      const userIdFromStorage = localStorage.getItem('userId');
      setUserId(userIdFromStorage); 
    }
    fetchGames(searchQuery, searchType);
  }, [searchQuery, searchType]);

  const fetchGames = async (query, type) => {
    try {
      const token = localStorage.getItem('authToken');
      let url = 'http://localhost:8080/api/v1/games';
      if (query) {
        url = `http://localhost:8080/api/v1/games/search/${type}?${type}=${encodeURIComponent(query)}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGames(response.data);
    } catch (error) {
      console.error('Failed to fetch games:', error.response);
    }
  };

  const createGame = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:8080/api/v1/games', newGame, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchGames(searchQuery, searchType);
      setNewGame({
        title: '',
        publisher: '',
        genre: '',
        year: '',
        developer: '',
        rating: '',
        os: '',
        price: '',
      });
    } catch (error) {
      console.error('Failed to create game:', error.response);
    }
  };

  const updateGame = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:8080/api/v1/games/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchGames(searchQuery, searchType);
    } catch (error) {
      console.error('Failed to update game:', error.response);
    }
  };

  const deleteGame = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8080/api/v1/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchGames(searchQuery, searchType);
    } catch (error) {
      console.error('Failed to delete game:', error.response);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); 
    setAuthenticated(false);
    setRedirect(true);
  };

  const handleNewGameChange = (e) => {
    const { name, value } = e.target;
    setNewGame((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateGameChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateGames((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], [name]: value },
    }));
  };

  const handleUpdateGameImageChange = (e, id) => {
    const file = e.target.files[0];
    setUpdateGames((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], image: file },
    }));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Games List</h2>
      <div>
        
        {userId && authenticated && (
          <Link to={`/bought-games/${userId}`}>
            <button style={{ marginLeft: '20px' }}>View purchased games</button>
          </Link>
        )}
        {userRole === 'ADMIN' && (
          <Link to="/userlist">
            <button>User list</button>
          </Link>

          
        )}


<Link to="/users/:id">
  <button>User Page</button>
  </Link>
        {authenticated && (
          <button onClick={handleLogout} style={{ marginTop: '10px', marginLeft: '20px' }}>
            Logout
          </button>
        )}

        <div style={{ margin: '0 10px' }}></div>

        {authenticated && (
          <>
            <input 
              type="text" 
              name="title"
              value={newGame.title} 
              onChange={handleNewGameChange} 
              placeholder="Title" 
            />
            <input 
              type="text" 
              name="publisher"
              value={newGame.publisher} 
              onChange={handleNewGameChange} 
              placeholder="Publisher" 
            />
            <input 
              type="text" 
              name="genre"
              value={newGame.genre} 
              onChange={handleNewGameChange} 
              placeholder="Genre" 
            />
            <input 
              type="text" 
              name="year"
              value={newGame.year} 
              onChange={handleNewGameChange} 
              placeholder="Year" 
            />
            <input 
              type="text" 
              name="developer"
              value={newGame.developer} 
              onChange={handleNewGameChange} 
              placeholder="Developer" 
            />
            <input 
              type="text" 
              name="rating"
              value={newGame.rating} 
              onChange={handleNewGameChange} 
              placeholder="Rating" 
            />
            <input 
              type="text" 
              name="os"
              value={newGame.os} 
              onChange={handleNewGameChange} 
              placeholder="OS" 
            />
            <input 
              type="text" 
              name="price"
              value={newGame.price} 
              onChange={handleNewGameChange} 
              placeholder="Price" 
            />
            
            <button onClick={createGame}>Create Game</button>
          </>
        )}

        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">Search by Title</option>
          <option value="genre">Search by Genre</option>
          <option value="developer">Search by Developer</option>
          <option value="rating">Search by Rating</option>
          <option value="os">Search by OS</option>
        </select>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder={
            searchType === 'title' ? "Search by Title" :
            searchType === 'genre' ? "Search by Genre" :
            searchType === 'developer' ? "Search by Developer" :
            searchType === 'rating' ? "Search by Rating" :
            searchType === 'os' ? "Search by OS" :
            ""
          }
        />
        <button onClick={() => fetchGames(searchQuery, searchType)}>Search</button>
      </div>

      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>
              {game.title}
            </Link> - {game.publisher} - {game.genre} - {game.year} - {game.developer} - {game.rating} - {game.os} - {game.price} 
            
            {authenticated && (
              <>
                <input 
                  type="text" 
                  name="title"
                  value={updateGames[game.id]?.title || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Title" 
                />
                <input 
                  type="text" 
                  name="publisher"
                  value={updateGames[game.id]?.publisher || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Publisher" 
                />
                <input 
                  type="text" 
                  name="genre"
                  value={updateGames[game.id]?.genre || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Genre" 
                />
                <input 
                  type="text" 
                  name="year"
                  value={updateGames[game.id]?.year || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Year" 
                />
                <input 
                  type="text" 
                  name="developer"
                  value={updateGames[game.id]?.developer || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Developer" 
                />
                <input 
                  type="text" 
                  name="rating"
                  value={updateGames[game.id]?.rating || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update Rating" 
                />
                <input 
                  type="text" 
                  name="os"
                  value={updateGames[game.id]?.os || ''} 
                  onChange={(e) => handleUpdateGameChange(e, game.id)} 
                  placeholder="Update OS" 
                />
                
                <button onClick={() => updateGame(game.id, updateGames[game.id])}>Update</button>
                <button onClick={() => deleteGame(game.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default GamesComponentA;
