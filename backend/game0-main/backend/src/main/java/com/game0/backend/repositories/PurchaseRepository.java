package com.game0.backend.repositories;

import com.game0.backend.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    List<Purchase> findByUserId(Integer userId);

    List<Purchase> findByGameId(Long gameId);
}
