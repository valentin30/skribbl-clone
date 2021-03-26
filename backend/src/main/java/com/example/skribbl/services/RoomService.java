package com.example.skribbl.services;

import com.example.skribbl.dto.CreateRoomDto;
import com.example.skribbl.dto.RegisterDto;
import com.example.skribbl.models.Player;
import com.example.skribbl.models.Room;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomService {
    private ArrayList<Room> rooms;

    public RoomService() {
        this.rooms = new ArrayList<Room>();
    }

    public UUID getAvailableRoom() {
        Optional<Room> first = rooms.stream()
                .filter((room) -> !room.isPrivate())
                .filter((room) -> room.getCapacity() > room.getPlayers().size())
                .findFirst();

        if (first.isEmpty()) {
            Room room = new Room(3, 120, false);

            rooms.add(room);

            return room.getId();
        }

        Room room = first.get();

        return room.getId();
    }

    public UUID createRoom(CreateRoomDto createRoomDto) {
        Room room = new Room(createRoomDto.getRounds(), createRoomDto.getSecondsPerRound(), true);

        return room.getId();
    }

    public Room register(RegisterDto registerDto) {
        Player player = new Player(registerDto.getName());

        Optional<Room> first = rooms.stream()
                .filter((room) -> room.isPrivate() == registerDto.getPrivate())
                .filter((room) -> room.getId().toString().equals(registerDto.getRoomId()))
                .findFirst();


        if (first.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ROOM NOT FOUND");
        }

        Room room = first.get();

        if(room.getCapacity() <= room.getPlayers().size()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ROOM ALREADY FULL");
        }

        room.getPlayers().add(player);

        return room;
    }
}
