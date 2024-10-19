import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

/**
 * Fetch `url` and parse its contents with Readability.js
 * @param {string} url URL of the page to fetch
 * @returns {Promise<string[]>} (Promise) Array of fetched paragraphs
 */
export default async function parseWebpage(url) {
  const res = await fetch(url);

  const text = await res.text();

  const doc = new JSDOM(text);
  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  const readabilifiedDOM = new JSDOM(article.content);

  let textEls = [];
  readabilifiedDOM.window.document.querySelectorAll("p, h3").forEach(textEl => {
    textEls.push(textEl.innerHTML);
  });

  return textEls;
}
