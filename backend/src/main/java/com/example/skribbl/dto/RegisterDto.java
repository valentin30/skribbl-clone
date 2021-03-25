package com.example.skribbl.dto;

import java.util.UUID;

public class RegisterDto {
    private String roomId;
    private String name;
    private Boolean isPrivate;

    public RegisterDto(String roomId, String name, Boolean isPrivate) {
        this.roomId = roomId;
        this.name = name;
        this.isPrivate = isPrivate;
    }

    public Boolean getPrivate() {
        return isPrivate;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
