import "dotenv/config";
import express from "express";
import generateCardWithAI from "./fetchAIResponse.js";
import parseWebpage from "./parseWebpage.js";

const app = express();
const port = 3000;

const textEls = await parseWebpage(
  // "https://dri.es/my-solar-powered-and-self-hosted-website"
  "http://www.catb.org/~esr/faqs/things-every-hacker-once-knew/"
);

const paragraph1 = textEls.slice(0, 4).join("\n");
console.log(paragraph1);

const cards = await generateCardWithAI(paragraph1);

console.log(cards);

const cardElement = card => `
<div class="card">
    <h3> ${card.front} </h3>
    <p> ${card.back} </p>
</div>
`;

app.get("/", (req, res) => {
  const cardEls = cards.map(card => cardElement(card)).join("<br />");
  res.send(paragraph1 + "<hr />" + cardEls);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
