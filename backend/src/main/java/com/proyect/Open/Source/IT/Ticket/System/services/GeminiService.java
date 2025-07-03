package com.proyect.Open.Source.IT.Ticket.System.services;

import okhttp3.*;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class GeminiService {

    private final OkHttpClient client = new OkHttpClient();
    private final String API_KEY = "AIzaSyDNnduVXnlEPeJ37knAPs-4m2zgNeyx-hU";

    public String sendMessage(String message) throws IOException {
    String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

    String jsonBody = """
    {
      "contents": [{
        "parts": [{
          "text": "%s"
        }]
      }]
    }
    """.formatted(message);

    RequestBody body = RequestBody.create(
        jsonBody, MediaType.get("application/json"));

    Request request = new Request.Builder()
        .url(url)
        .post(body)
        .build();

    try (Response response = client.newCall(request).execute()) {
        if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

        String responseBody = response.body().string();

        // Analizar JSON con Jackson
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseBody);
        JsonNode candidates = root.path("candidates");

        if (candidates.isArray() && candidates.size() > 0) {
            JsonNode first = candidates.get(0);
            JsonNode parts = first.path("content").path("parts");

            if (parts.isArray() && parts.size() > 0) {
                return parts.get(0).path("text").asText();
            }
        }

        return "Lo siento, no se pudo procesar tu mensaje.";
    }
}
}
