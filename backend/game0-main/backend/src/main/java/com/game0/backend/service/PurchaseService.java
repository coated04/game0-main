package com.game0.backend.service;

import com.game0.backend.models.Purchase;

import java.util.List;

public interface PurchaseService {

    Purchase buyGame(Integer userId, Long gameId, double price);

    List<Purchase> getPurchasesByUser(Integer userId);

    List<Purchase> getPurchasesByGame(Long gameId);
}
