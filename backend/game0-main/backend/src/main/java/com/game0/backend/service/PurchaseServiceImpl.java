package com.game0.backend.service;

import com.game0.backend.models.Game;
import com.game0.backend.models.Purchase;
import com.game0.backend.models.User;
import com.game0.backend.repositories.GameRepository;
import com.game0.backend.repositories.PurchaseRepository;
import com.game0.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public PurchaseServiceImpl(PurchaseRepository purchaseRepository, UserRepository userRepository, GameRepository gameRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    @Override
    public Purchase buyGame(Integer userId, Long gameId, double price) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        Purchase purchase = new Purchase();
        purchase.setUser(user);
        purchase.setGame(game);
        purchase.setPrice(price);
        purchase.setPurchaseDate(new java.util.Date());

        return purchaseRepository.save(purchase);
    }

    @Override
    public List<Purchase> getPurchasesByUser(Integer userId) {
        return purchaseRepository.findByUserId(userId);
    }

    @Override
    public List<Purchase> getPurchasesByGame(Long gameId) {
        return purchaseRepository.findByGameId(gameId);
    }
}
