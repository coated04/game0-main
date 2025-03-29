package com.game0.backend.service;

import com.game0.backend.models.Game;

import java.util.List;

public interface GameService {

    List<Game> getAllGames();
    Game addGame(Game game);
    Game getGameById(Long id);
    Game updateGame(Long id, Game gameDetails);
    void deleteGame(Long id);

    List<Game> searchByTitle(String title);
    List<Game> searchByYear(int year);
    List<Game> searchByGenre(String genre);
    List<Game> searchByPublisher(String publisher);
    List<Game> searchByRating(String rating);
    List<Game> searchByDeveloper(String developer);
    List<Game> searchByOs(String os);
    List<Game> searchByDownloads(String downloads);
    Game addComment(Long id, String comment);
}
