const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_2,
});

app.post("/botapi", async (req, res) => {
  try {
    const messages = req.body.messages;

    // Llama a la API de ChatGPT utilizando la librería openai
    const chatGptResponse = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    // Devuelve la respuesta de ChatGPT como JSON
    res.json({ response: chatGptResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
