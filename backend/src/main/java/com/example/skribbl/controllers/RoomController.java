package com.example.skribbl.controllers;

import com.example.skribbl.dto.CreateRoomDto;
import com.example.skribbl.dto.RegisterDto;
import com.example.skribbl.dto.RoomIdResponseDto;
import com.example.skribbl.models.Room;
import com.example.skribbl.services.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public RoomController(RoomService roomService, SimpMessagingTemplate simpMessagingTemplate) {
        this.roomService = roomService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping()
    public RoomIdResponseDto getAvailableRoom() {
        return new RoomIdResponseDto(roomService.getAvailableRoom());
    }

    @PostMapping("/create")
    public RoomIdResponseDto createPrivateRoom(@RequestBody CreateRoomDto createRoomDto){
        return new RoomIdResponseDto(roomService.createRoom(createRoomDto));
    }

    @MessageMapping("/register")
    public void register(@Payload RegisterDto registerDto) {
        System.out.println(registerDto);

        Room room = roomService.register(registerDto);

        this.simpMessagingTemplate.convertAndSend("/topic/" + room.getId(), room );
    }
}
