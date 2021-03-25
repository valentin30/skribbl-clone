package com.example.skribbl.dto;

public class CreateRoomDto {
    private int rounds;
    private int secondsPerRound;

    public CreateRoomDto(int rounds, int secondsPerRound) {
        this.rounds = rounds;
        this.secondsPerRound = secondsPerRound;
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
}
