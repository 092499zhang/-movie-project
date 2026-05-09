
const storedWatchlist = localStorage.getItem("watchlist");
const watchlistArr = storedWatchlist ? JSON.parse(storedWatchlist) : []
const container = document.getElementById("movie-container");
container.innerHTML = "";

watchlistArr.forEach((id) => {
fetch(`http://www.omdbapi.com/?apikey=4d977415&i=${id}`)
          .then((res) => res.json())
          .then((detail) => {
            container.innerHTML += `
                            <div class="movies">
                                <img class="poster" src="${detail.Poster !== "N/A" ? detail.Poster : ""}">
                                <div>
                                <div class='movie-head'>
                                    <h2>${detail.Title}</h2>
                                    <img  class = 'star' src='./Icon (1).svg'>
                                    <p>${detail.imdbRating}</p>
                                    </div>
                                    <div class='detail-sub'>
                                    <p>${detail.Runtime}</p>
                                    <p>${detail.Genre}</p>
                                    <div class='watch-list' data-id="${detail.imdbID}">
                                    <img class='minus' src='./Icon (3).svg'>
                                    <p>Remove</p>
                                    </div>
                                    </div>
                                    <p>${detail.Plot}</p>
                                </div>
                            </div>
                        `;
          });
      });