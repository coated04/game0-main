package com.game0.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "games")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String publisher;
    private String genre;
    private int year;
    private String developer;
    private String rating;
    private String os;
    private String downloads;
    private BigDecimal price;

    private String imagePath;
    private String videoPath;

    @ElementCollection
    @CollectionTable(name = "game_comments", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "comment")
    private List<String> comments = new ArrayList<>();
}
