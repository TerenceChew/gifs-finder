import "./style.css";
import errorGif from "./404.gif";

const gifHolder = document.querySelector(".gif-holder");
const form = document.querySelector(".form");
const searchInput = document.querySelector("#search-input");
const btn = document.querySelector(".btn");
const defaultUrl =
  "https://api.giphy.com/v1/gifs/translate?api_key=qwTWh27Cqz2uyFZRj0VNrw4oQYt5Ge3C&s=cats";

const createUrl = (searchTerm) => {
  const gifUrl = "api.giphy.com/v1/gifs/translate";
  const apiKey = "qwTWh27Cqz2uyFZRj0VNrw4oQYt5Ge3C"; // Unsafe

  return `https://${gifUrl}?api_key=${apiKey}&s=${searchTerm}`;
};

const getNewGif = (url) => {
  fetch(url, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      gifHolder.src = data.data.images.original.url;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log("Error:", err);
      gifHolder.src = errorGif;
    });
};

const handleBtnClick = () => {
  const searchTerm = searchInput.value || "dogs";
  const url = createUrl(searchTerm);

  getNewGif(url);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleBtnClick();
});
btn.addEventListener("pointerdown", handleBtnClick);
// eslint-disable-next-line no-restricted-globals
onload = () => {
  getNewGif(defaultUrl);
};
