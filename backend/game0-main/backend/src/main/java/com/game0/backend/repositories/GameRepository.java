package com.game0.backend.repositories;

import com.game0.backend.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByTitleContainingIgnoreCase(String title);
    List<Game> findByYear(int year);
    List<Game> findByGenreIgnoreCase(String genre);
    List<Game> findByPublisherIgnoreCase(String publisher);
    List<Game> findByRating(String rating);
    List<Game> findByDeveloper(String developer);
    List<Game> findByOs(String os);
    List<Game> findByDownloads(String downloads);
}
