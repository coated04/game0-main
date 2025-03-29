import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BoughtGamesComponent() {
  const { id } = useParams();  
  const [boughtGames, setBoughtGames] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true);
      fetchBoughtGames();
    }
  }, [id]);  

  const fetchBoughtGames = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:8080/api/v1/purchases/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Purchased Games Response:', response.data);  
      setBoughtGames(response.data);
    } catch (error) {
      console.error('Failed to fetch purchased games:', error);
    }
  };

  if (!authenticated) {
    return <div>Please login to see your purchased games.</div>;
  }

  return (
    <div>
      
      <h2>Your purchased games</h2>
      <ul>
        {boughtGames.map((purchase) => {
          const game = purchase.game;  
          return (
            <li key={purchase.id}>
              <h3>{game.title}</h3> 
              <p>{game.publisher} - {game.genre} - {game.year} - {game.developer} - {game.rating} - {game.os} - {game.price} </p>
              
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BoughtGamesComponent;
