package com.game0.backend.service;

import com.game0.backend.models.Game;
import com.game0.backend.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepository gameRepository;

    @Override
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Override
    public Game addGame(Game game) {
        if (game.getPrice() == null) {
            game.setPrice(new BigDecimal("0.00"));
        }
        return gameRepository.save(game);
    }

    @Override
    public Game getGameById(Long id) {
        Optional<Game> gameOptional = gameRepository.findById(id);
        return gameOptional.orElse(null);
    }

    @Override
    public Game updateGame(Long id, Game gameDetails) {
        Optional<Game> gameOptional = gameRepository.findById(id);
        if (gameOptional.isPresent()) {
            Game game = gameOptional.get();
            game.setTitle(gameDetails.getTitle());
            game.setPublisher(gameDetails.getPublisher());
            game.setGenre(gameDetails.getGenre());
            game.setYear(gameDetails.getYear());
            game.setDeveloper(gameDetails.getDeveloper());
            game.setRating(gameDetails.getRating());
            game.setOs(gameDetails.getOs());
            game.setDownloads(gameDetails.getDownloads());
            game.setPrice(gameDetails.getPrice());
            return gameRepository.save(game);
        }
        return null;
    }

    @Override
    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }

    @Override
    public List<Game> searchByTitle(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Game> searchByYear(int year) {
        return gameRepository.findByYear(year);
    }

    @Override
    public List<Game> searchByGenre(String genre) {
        return gameRepository.findByGenreIgnoreCase(genre);
    }

    @Override
    public List<Game> searchByPublisher(String publisher) {
        return gameRepository.findByPublisherIgnoreCase(publisher);
    }

    @Override
    public List<Game> searchByRating(String rating) {
        return gameRepository.findByRating(rating);
    }

    @Override
    public List<Game> searchByDeveloper(String developer) {
        return gameRepository.findByDeveloper(developer);
    }

    @Override
    public List<Game> searchByOs(String os) {
        return gameRepository.findByOs(os);
    }

    @Override
    public List<Game> searchByDownloads(String downloads) {
        return gameRepository.findByDownloads(downloads);
    }

    @Override
    public Game addComment(Long gameId, String comment) {
        Game game = getGameById(gameId);
        if (game != null) {
            game.getComments().add(comment);
            return gameRepository.save(game);
        }
        return null;
    }
}
