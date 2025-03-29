import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userMoney, setUserMoney] = useState(0);
  const [moneyToAdd, setMoneyToAdd] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [userRole, setUserRole] = useState('user');  

  useEffect(() => {
    const fetchGameDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("Authentication required. Redirecting to login...");
        navigate('/login');
        return;
      }

      try {
        const gameResponse = await axios.get(`http://localhost:8080/api/v1/games/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGame(gameResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch game details.');
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem('authToken');
          navigate('/login');
        }
        setLoading(false);
      }
    };

    const fetchUserMoney = () => {
      const storedMoney = parseFloat(localStorage.getItem('userMoney') || 0);
      setUserMoney(storedMoney);
    };

   
    const storedRole = localStorage.getItem('userRole') || 'user';  
    setUserRole(storedRole);

    fetchGameDetails();
    fetchUserMoney();
  }, [id, navigate]);

  const handleBuyNow = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      alert("Authentication required to purchase the game.");
      navigate('/login');
      return;
    }

    if (userMoney < game.price) {
      alert("Insufficient funds. Please add more money.");
      return;
    }

    try {
      const newBalance = userMoney - game.price;
      localStorage.setItem('userMoney', newBalance.toString());

      const response = await axios.post(
        `http://localhost:8080/api/v1/purchases/buy`,
        { userId, gameId: id, price: game.price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUserMoney(newBalance);
      setPurchaseSuccess(true);
      alert("Purchase successful!");
      navigate(`/bought-games/${id}`);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("You do not have permission to purchase this game.");
      } else if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem('authToken');
        navigate('/login');
      } else {
        setError(err.response ? err.response.data.message : 'Failed to purchase the game.');
      }
    }
  };

  const handleAddMoney = () => {
    if (moneyToAdd <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newBalance = userMoney + parseFloat(moneyToAdd);
    localStorage.setItem('userMoney', newBalance.toString());
    setUserMoney(newBalance);
    setMoneyToAdd(0);
    alert(`You have successfully added ${moneyToAdd} to your account.`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{game.title}</h2>
      <p>Price: ${game.price}</p>

      <h3>Your Balance: ${userMoney}</h3>
      <div>
        <input
          type="number"
          value={moneyToAdd}
          onChange={(e) => setMoneyToAdd(e.target.value)}
          placeholder="Add money"
        />
        <button onClick={handleAddMoney}>Add Money</button>
      </div>

      {!purchaseSuccess ? (
        <button onClick={handleBuyNow}>Buy Now</button>
      ) : (
        <p>You have already purchased this game!</p>
      )}

    
      {userRole === 'ADMIN' || userRole === 'SUPERUSER' ? (
        <Link to="/gamescrud">Go back to Games CRUD</Link>
      ) : (
        <Link to="/games">Go back to Games</Link>
      )}
    </div>
  );
}

export default GameDetails;
