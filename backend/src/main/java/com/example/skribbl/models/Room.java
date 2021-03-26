package com.example.skribbl.models;

import java.util.ArrayList;
import java.util.UUID;

public class Room {
    private UUID id;
    private int rounds;
    private int secondsPerRound;
    private int capacity;
    private boolean isPrivate;
    private ArrayList<Player> players = new ArrayList<Player>();

    public Room(int rounds, int secondsPerRound, boolean isPrivate) {
        this.id = UUID.randomUUID();
        this.rounds = rounds;
        this.secondsPerRound = secondsPerRound;
        this.players = new ArrayList<Player>();
        this.capacity = 5;
        this.isPrivate = isPrivate;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getRounds() {
        return rounds;
    }

    public void setRounds(int rounds) {
        this.rounds = rounds;
    }

    public int getSecondsPerRound() {
        return secondsPerRound;
    }

    public void setSecondsPerRound(int secondsPerRound) {
        this.secondsPerRound = secondsPerRound;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }
}
