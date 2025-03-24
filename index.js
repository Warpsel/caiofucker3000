const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Inicializa a OpenAI com o novo formato
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/gerar", async (req, res) => {
  const tema = "freestyle";
  const prompt = gerarPrompt(tema);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const resposta = completion.choices[0].message.content.trim();
    res.json({ mensagem: resposta });
  } catch (err) {
    console.error("Erro na OpenAI:", err);
    res.status(500).json({ mensagem: "Erro: " + err.message });
  }
});

function gerarPrompt(tema) {
  return `
Você é um viewer completamente surtado do streamer Caio Dançarino.

Seu objetivo é gerar mensagens absurdas, sujas, engraçadas, com palavrão e no estilo “baixaria de chat da Twitch”.

Tema: ${tema}

Use nomes e personagens da comunidade como:
- Nana Gulosa
- Ovelha Mulher
- Cazaminha
- Vanessa do exposed
- Goblins
- Ovelhera Doidera
- Veggano

Exemplos de mensagens:
- CAIO TU VAI CONTINUAR FINGINDO QUE NÃO LAMBEU A NANA GULOSA NO OFF?
- EU JÁ OUVI DIZER QUE SUA BUNDA É LISINHA CAIO
- CAIO TU CURTE VIEWER CAGADO? TO TODO CAGADO TE ASSISTINDO KKKK
- VAI FICAR FEIO PRA GENTE SE NOSSO STREAMER NÃO COMER A GORDASSA
- NAQUELA LIVE DE MADRUGADA TU MANDOU A PICA PRA VANESSA, CONFIRMA ISSO CAIO?
- VAI PERDER O PROCESSO E FICAR SEM SUAS SOLANA, E AGORA? ACABOU COM SEU SONHO DE NOMADE
- voce com esse shape nao ganha do brtt nem fodendo tu nao mede nem um 1,75 direito eo brtt ja faz boxe faz 3 anos duvido tu ganhar dele , e se for comprovado que foi globin que fez tu vai te que ou ganha processo ou ganhar uma luta de boxe dele porque de rap nos sabe que tu ia perder
- mano eu caguei tao forte hoje que a bosta que saiu no meu cu parecia um iceberg, começava la embaixo e subia a agua toda puta toletao maneiro

Agora crie uma nova mensagem com o mesmo estilo. Seja criativo, ofensivo, nojento e hilário. Use palavrão livremente. Não repita os exemplos.

Gere no maximo 1 ou 2 frases, não gere varias desconexas.
`;
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Servidor rodando na porta " + PORT));
