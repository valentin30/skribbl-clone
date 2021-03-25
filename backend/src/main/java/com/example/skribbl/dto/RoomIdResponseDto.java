package com.example.skribbl.dto;

import java.util.UUID;

public class RoomIdResponseDto {
    private UUID id;

    public RoomIdResponseDto(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
