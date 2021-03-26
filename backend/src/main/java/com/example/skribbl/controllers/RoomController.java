package com.example.skribbl.controllers;

import com.example.skribbl.dto.CreateRoomDto;
import com.example.skribbl.dto.RegisterDto;
import com.example.skribbl.dto.RoomIdResponseDto;
import com.example.skribbl.models.Room;
import com.example.skribbl.services.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpSubscriptionMatcher;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SimpUserRegistry userRegistry;

    public RoomController(RoomService roomService, SimpMessagingTemplate simpMessagingTemplate, SimpUserRegistry userRegistry) {
        this.roomService = roomService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRegistry = userRegistry;
    }

    @GetMapping()
    public RoomIdResponseDto getAvailableRoom() {
        return new RoomIdResponseDto(roomService.getAvailableRoom());
    }

    @PostMapping("/create")
    public RoomIdResponseDto createPrivateRoom(@RequestBody CreateRoomDto createRoomDto) {
        return new RoomIdResponseDto(roomService.createRoom(createRoomDto));
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDto registerDto) {
        
        Room room = roomService.register(registerDto);

        this.simpMessagingTemplate.convertAndSend("/topic/" + room.getId(), room);
    }
}
