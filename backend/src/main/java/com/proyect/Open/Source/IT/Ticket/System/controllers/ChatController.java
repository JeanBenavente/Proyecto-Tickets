package com.proyect.Open.Source.IT.Ticket.System.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyect.Open.Source.IT.Ticket.System.services.GeminiService;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Para que React pueda acceder
public class ChatController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public String chat(@RequestBody ChatRequest request) throws Exception {
        return geminiService.sendMessage(request.getMessage());
    }
}

class ChatRequest {
    private String message;
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
