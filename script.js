window.addEventListener("load", () => fetchNews("India"));

let curSelectedNav = null;

function reload() {
  fetchNews("India");
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
}

async function fetchNews(query) {
  axios
    .get(`https://news-app-server-sand.vercel.app/api/getnews?query=${query}`)
    .then(function (response) {
      bindData(response.data.articles);
    });
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function changeToDarkMode(){
  const darkMode=document.querySelector("#darkmode");
  const lightMode=document.querySelector("#lightmode");
  const darkCSS=document.querySelector("#darkcss");
  const lightCSS=document.querySelector("#lightcss");

  darkCSS.rel="stylesheet";
  lightCSS.rel="not_ss";

  darkMode.style.display="none";
  lightMode.style.display="inline-block";
}

function changeToLightMode(){
  const darkMode=document.querySelector("#darkmode");
  const lightMode=document.querySelector("#lightmode");
  const darkCSS=document.querySelector("#darkcss");
  const lightCSS=document.querySelector("#lightcss");

  darkCSS.rel="not_ss";
  lightCSS.rel="stylesheet";

  lightMode.style.display="none";
  darkMode.style.display="inline-block";
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}


function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
