package com.proyect.Open.Source.IT.Ticket.System.services;

import okhttp3.*;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class GeminiService {

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String API_KEY = "AIzaSyDNnduVXnlEPeJ37knAPs-4m2zgNeyx-hU"; // ← Tu API Key

    public String sendMessage(String message) throws IOException {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

        String jsonBody = """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """.formatted(message);

        RequestBody body = RequestBody.create(
                jsonBody, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-goog-api-key", API_KEY)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            String responseBody = response.body().string();

            // Parseamos el JSON para extraer solo el texto de la respuesta
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode textNode = root
                    .path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            return textNode.asText("No se pudo obtener respuesta de Gemini.");
        }
    }
}
