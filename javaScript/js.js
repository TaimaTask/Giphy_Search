const mainGifUrl = "iI0SXrNLP7CjxfM8a1azBmBbW0XXn6wb";
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modalContent");
let gifButton = document.getElementById("gifButton");
let xIcon = document.getElementById("xIcon");
let gifs = [];
let page = 1;

gifButton.onclick = function () {
  modal.style.display = "block";
  document.getElementById("loader").innerHTML = "";
  document.getElementById("searchTerm").value = "";
  xIcon.style.visibility = "hidden";
  gifApi("");
};

window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("loader").innerHTML = "";
    modal.style.display = "none";
  }
};

document.getElementById("searchTerm").addEventListener("keyup", searchfunc);
let t = 0;
function searchfunc() {
  page = 1;
  document.getElementById("loader").innerHTML = "";
  let searchText = document.getElementById("searchTerm").value;
  if (searchText == "") {
    xIcon.style.visibility = "hidden";
    gifApi("");
  } else {
    xIcon.style.visibility = "visible";
    gifApi(searchText);
    console.log(searchText);
  }
}

xIcon.onclick = function () {
  document.getElementById("searchTerm").value = "";
  xIcon.style.visibility = "hidden";
  gifApi("");
};

function gifApi(searchText) {
  page = 1;
  document.getElementById("gifView").innerHTML = "";

  let gifUrl = `https://api.giphy.com/v1/gifs/search?q=${searchText}&rating=g&api_key=${mainGifUrl}`;
  if (searchText == "" || searchText.indexOf(" ") >= 0)
    gifUrl = `https://api.giphy.com/v1/gifs/trending?rating=g&api_key=${mainGifUrl}`;

  fetch(gifUrl)
    .then((response) => response.json())
    .then((content) => {
      console.log(content);
      gifs = content.data;
      setTimeout(function () {
        LoadingGifs();
      }, 200);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderGifs() {
  document.getElementById("loader").innerHTML = "";
  var slicegifs = gifs.slice((page - 1) * 5, page * 5);
  slicegifs.map((gif) => getGif(gif));
}

function getGif(gif) {
  var figure = document.createElement("figure");
  var img = document.createElement("img");
  img.src = gif.images.downsized.url;
  img.width = 530;
  img.height = gif.images.downsized.height * 0.82;
  img.alt = gif.title;
  figure.appendChild(img);
  document.querySelector(".gifView").insertAdjacentElement("beforeend", figure);
  img.onclick = () => {
    console.log(img.alt);
  };
}

function LoadingGifs() {
  document.getElementById("loader").innerHTML = "";
  var showLoader = document.createElement("showLoader");
  var img = document.createElement("img");
  img.src = "../images/loader.GIF";
  img.width = 280;
  img.height = 220;
  img.alt = "LoadingGif";
  showLoader.appendChild(img);
  showLoader.style.margin = "110px";
  document
    .querySelector(".loader")
    .insertAdjacentElement("beforeend", showLoader);
  setTimeout(function () {
    renderGifs();
  }, 1100);
}

let waitScroll = 0;
modalContent.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = modalContent;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    setTimeout(function () {
      waitScroll = 0;
    }, 1000);
    if (page <= gifs.length / 5 && waitScroll == 0) {
      waitScroll = 1;
      page++;
      LoadingGifs();
    }
  }
});
