const btn = document.getElementById("search-btn");
const inputDetails = document.getElementById("search-input");
const container = document.getElementById("movie-container");

btn.addEventListener("click", () => {
  const movieName = inputDetails.value;

  fetch(
    `http://www.omdbapi.com/?apikey=4d977415&s=${encodeURIComponent(movieName)}`,
  )
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = "";

      if (!data.Search) {
        container.innerHTML =
          "<p class='enter-data'>Unable to find what you’re looking for. Please try another search.</p>";
        return;
      }

      data.Search.forEach((singFilm) => {
        // 第二次 fetch（用 imdbID 拿详情）
        fetch(`http://www.omdbapi.com/?apikey=4d977415&i=${singFilm.imdbID}`)
          .then((res) => res.json())
          .then((detail) => {
            const isInWatchlist = watchlistArr.includes(singFilm.imdbID);
            container.innerHTML += `
                            <div class="movies">
                                <img class="poster" src="${singFilm.Poster !== "N/A" ? singFilm.Poster : ""}">
                                <div>
                                <div class='movie-head'>
                                    <h2>${singFilm.Title}</h2>
                                    <img  class = 'star' src='./Icon (1).svg'>
                                    <p>${detail.imdbRating}</p>
                                    </div>
                                    <div class='detail-sub'>
                                    <p>${detail.Runtime}</p>
                                    <p>${detail.Genre}</p>
                                    <div class='watch-list' data-id="${singFilm.imdbID}">
                                    <img class='plus' src='./Icon (2).svg'>
                                    <p>Watchlist</p>
                                    </div>
                                    </div>
                                    <p>${detail.Plot}</p>
                                </div>
                            </div>
                        `;
          });
      });
    });
});

//this part below is for storing my film
const storedWatchlist = localStorage.getItem("watchlist");

let watchlistArr = storedWatchlist
  ? JSON.parse(storedWatchlist)
  : [];

container.addEventListener("click", (e) => {
  const watchlistBtn = e.target.closest(".watch-list");

  if (watchlistBtn) {
    const movieId = watchlistBtn.dataset.id;

    if (watchlistArr.includes(movieId)) {
      watchlistArr = watchlistArr.filter((item) => {
        return item !== movieId;
      });

      localStorage.setItem("watchlist", JSON.stringify(watchlistArr));

    } else {
      watchlistArr.push(movieId);
      localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
      console.log(localStorage.getItem("watchlist"));
    }
    console.log(watchlistArr.includes(movieId));
  }
});
