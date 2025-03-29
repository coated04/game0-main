import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './design.css';

function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role1, setRole1] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true);
      const userRole1 = JSON.parse(atob(token.split('.')[1])).role1;
      setRole1(userRole1);
    }
  }, []);

  return { authenticated, role1 };
}

function GamesComponent() {
  const { authenticated, role1 } = useAuth();
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ title: '', publisher: '', genre: '', year: '', developer: '', rating: '', os: '' });
  const [updateGame, setUpdateGame] = useState({ id: null, title: '', publisher: '', genre: '', year: '', developer: '', rating: '', os: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    fetchGames(searchQuery, searchType);
  }, [searchQuery, searchType]);

  const fetchGames = async (query, type) => {
    try {
      let url = 'http://localhost:8080/api/v1/games';
      if (query) {
        url = `http://localhost:8080/api/v1/games/search/${type}?${type}=${encodeURIComponent(query)}`;
      }
      const response = await axios.get(url);
      setGames(response.data);
    } catch (error) {
      console.error('Failed to fetch games:', error.response);
    }
  };

  const handleInputChange = (event, stateUpdater) => {
    const { name, value } = event.target;
    stateUpdater(prevState => ({ ...prevState, [name]: value }));
  };

  const createGame = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:8080/api/v1/games', newGame, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewGame({ title: '', publisher: '', genre: '', year: '', developer: '', rating: '', os: '' });
      fetchGames(searchQuery, searchType);
    } catch (error) {
      console.error('Failed to create game:', error.response);
    }
  };

  const updateExistingGame = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:8080/api/v1/games/${updateGame.id}`, updateGame, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpdateGame({ id: null, title: '', publisher: '', genre: '', year: '', developer: '', rating: '', os: '' });
      fetchGames(searchQuery, searchType);
    } catch (error) {
      console.error('Failed to update game:', error.response);
    }
  };

  const deleteGame = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8080/api/v1/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGames(searchQuery, searchType);
    } catch (error) {
      console.error('Failed to delete game:', error.response);
    }
  };

  return (
    <div>
      <h2>Games List</h2>
      {userId && authenticated && (
          <Link to={`/bought-games/${userId}`} style={{ marginLeft: '20px' }}>
            View Purchased Games
          </Link>
        )}

<Link to="/users/:id">
  <button>User Page</button>
  </Link>
      <div>
        <Link to="/login">Logout</Link>
        <span style={{ margin: '0 10px' }}></span> 
        {authenticated && role1 === 'ADMIN' && (
          <>
            <input 
              type="text" 
              name="title" 
              value={newGame.title} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Title" 
            />
            <input 
              type="text" 
              name="publisher" 
              value={newGame.publisher} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Publisher" 
            />
            <input 
              type="text" 
              name="genre" 
              value={newGame.genre} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Genre" 
            />
            <input 
              type="text" 
              name="year" 
              value={newGame.year} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Year" 
            />
            <input 
              type="text" 
              name="developer" 
              value={newGame.developer} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Developer" 
            />
            <input 
              type="text" 
              name="rating" 
              value={newGame.rating} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="Rating" 
            />
            <input 
              type="text" 
              name="os" 
              value={newGame.os} 
              onChange={(e) => handleInputChange(e, setNewGame)} 
              placeholder="OS" 
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
          placeholder={`Search by ${searchType}`} 
        />
        <button onClick={() => fetchGames(searchQuery, searchType)}>Search</button>
      
      </div>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>
              {game.title}
            </Link> - {game.publisher} - {game.genre} - {game.year} - {game.developer} - {game.rating} - {game.os}
            {authenticated && role1 === 'ADMIN' && (
              <>
                <input 
                  type="text" 
                  name="title" 
                  value={updateGame.title} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Title" 
                />
                <input 
                  type="text" 
                  name="publisher" 
                  value={updateGame.publisher} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Publisher" 
                />
                <input 
                  type="text" 
                  name="genre" 
                  value={updateGame.genre} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Genre" 
                />
                <input 
                  type="text" 
                  name="year" 
                  value={updateGame.year} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Year" 
                />
                <input 
                  type="text" 
                  name="developer" 
                  value={updateGame.developer} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Developer" 
                />
                <input 
                  type="text" 
                  name="rating" 
                  value={updateGame.rating} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update Rating" 
                />
                <input 
                  type="text" 
                  name="os" 
                  value={updateGame.os} 
                  onChange={(e) => handleInputChange(e, setUpdateGame)} 
                  placeholder="Update OS" 
                />
                <button onClick={updateExistingGame}>Update</button>
                <button onClick={() => deleteGame(game.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
        
      </ul>
     
    </div>
  );
}

export default GamesComponent;
