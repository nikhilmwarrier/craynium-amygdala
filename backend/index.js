import express from "express";
import generateCardWithAI from "./generateCardWithAI.js";
import parseWebpage from "./parseWebpage.js";

const app = express();
const port = 3000;

const textEls = await parseWebpage(
  "https://dri.es/my-solar-powered-and-self-hosted-website"
  // "http://www.catb.org/~esr/faqs/things-every-hacker-once-knew/"
);

const paragraph1 = textEls.slice(0, 4).join("\n");

let paragraphs = [];

let i = 1;
let currentParagraph = "";
while (textEls.length > 0) {
  if (i % 8 === 0) {
    paragraphs.push(currentParagraph);
    currentParagraph = "";
  } else currentParagraph += textEls.shift();
  i++;
}
if (currentParagraph.length > 0) paragraphs.push(currentParagraph);

let outputs = [];

for (const para of paragraphs) {
  const l = JSON.parse(await generateCardWithAI(para));
  console.log(l);
  outputs.push(l);
}

console.log(outputs);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  let sendworthyJSON = [];

  for (const i in paragraphs) {
    sendworthyJSON.push(paragraphs[i]);
    sendworthyJSON.push(outputs[i]);
  }
  res.json(sendworthyJSON);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
