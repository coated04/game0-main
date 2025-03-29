package com.game0.backend.controllers;

import com.game0.backend.models.Game;
import com.game0.backend.service.GameService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/v1/games")
@Slf4j
public class GameController {

    private final GameService gameService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames() {
        log.info("Fetching all games.");
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        log.info("Getting a game by id: {}", id);
        return gameService.getGameById(id);
    }

    @PostMapping
    public Game addGame(@RequestBody Game game) {
        log.info("Adding a new game.");
        if (game.getPrice() == null) {
            game.setPrice(new BigDecimal("0.00"));
        }
        return gameService.addGame(game);
    }

    @PutMapping("/{id}")
    public Game updateGame(@PathVariable Long id, @RequestBody Game gameDetails) {
        log.info("Updating a game by id: {}", id);
        return gameService.updateGame(id, gameDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable Long id) {
        log.info("Deleting a game by id: {}", id);
        gameService.deleteGame(id);
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<String> addComment(@PathVariable Long id, @RequestParam String comment) {
        log.info("Adding comment to game with id: {}", id);
        Game updatedGame = gameService.addComment(id, comment);
        if (updatedGame != null) {
            return ResponseEntity.ok("Comment added successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search/title")
    public List<Game> searchByTitle(@RequestParam String title) {
        log.info("Searching for games by title: {}", title);
        return gameService.searchByTitle(title);
    }

    @GetMapping("/search/year")
    public List<Game> searchByYear(@RequestParam int year) {
        log.info("Searching for games by year: {}", year);
        return gameService.searchByYear(year);
    }

    @GetMapping("/search/genre")
    public List<Game> searchByGenre(@RequestParam String genre) {
        log.info("Searching for games by genre: {}", genre);
        return gameService.searchByGenre(genre);
    }

    @GetMapping("/search/publisher")
    public List<Game> searchByPublisher(@RequestParam String publisher) {
        log.info("Searching for games by publisher: {}", publisher);
        return gameService.searchByPublisher(publisher);
    }

    @GetMapping("/search/rating")
    public List<Game> searchByRating(@RequestParam String rating) {
        log.info("Searching for games by rating: {}", rating);
        return gameService.searchByRating(rating);
    }

    @GetMapping("/search/developer")
    public List<Game> searchByDeveloper(@RequestParam String developer) {
        log.info("Searching for games by developer: {}", developer);
        return gameService.searchByDeveloper(developer);
    }

    @GetMapping("/search/os")
    public List<Game> searchByOs(@RequestParam String os) {
        log.info("Searching for games by OS: {}", os);
        return gameService.searchByOs(os);
    }

    @GetMapping("/search/downloads")
    public List<Game> searchByDownloads(@RequestParam String downloads) {
        log.info("Searching for games by downloads: {}", downloads);
        return gameService.searchByDownloads(downloads);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        log.info("Uploading image for game with id: {}", id);
        try {
            String filePath = saveUploadedFile(file, id);
            Game updatedGame = gameService.getGameById(id);
            if (updatedGame != null) {
                updatedGame.setImagePath(filePath);
                gameService.updateGame(id, updatedGame);
                return ResponseEntity.ok("Image uploaded successfully. File path: " + filePath);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            log.error("Failed to upload image for game with id: {}", id, e);
            return ResponseEntity.status(500).body("Failed to upload image.");
        }
    }

    @PostMapping("/{id}/upload-video")
    public ResponseEntity<String> uploadVideo(@PathVariable Long id, @RequestParam("video") MultipartFile file) {
        log.info("Uploading video for game with id: {}", id);
        try {
            String filePath = saveUploadedFile(file, id);
            Game updatedGame = gameService.getGameById(id);
            if (updatedGame != null) {
                updatedGame.setVideoPath(filePath);
                gameService.updateGame(id, updatedGame);
                return ResponseEntity.ok("Video uploaded successfully. File path: " + filePath);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            log.error("Failed to upload video for game with id: {}", id, e);
            return ResponseEntity.status(500).body("Failed to upload video.");
        }
    }

    private String saveUploadedFile(MultipartFile file, Long id) throws IOException {
        byte[] bytes = file.getBytes();
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = id + extension;
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, bytes);
        return fileName;
    }
}
