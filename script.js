const btn = document.getElementById('search-btn');
const inputDetails = document.getElementById('search-input');
const container = document.getElementById("movie-container");

btn.addEventListener('click', () => {
    const movieName = inputDetails.value;

    fetch(`http://www.omdbapi.com/?apikey=4d977415&s=${encodeURIComponent(movieName)}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            container.innerHTML = "";

            if (!data.Search) {
                container.innerHTML = "<p class='enter-data'>Unable to find what you’re looking for. Please try another search.</p>";
                return;
            }

            data.Search.forEach((singFilm) => {

                // 第二次 fetch（用 imdbID 拿详情）
                fetch(`http://www.omdbapi.com/?apikey=4d977415&i=${singFilm.imdbID}`)
                    .then(res => res.json())
                    .then(detail => {

                        container.innerHTML += `
                            <div class="movies">
                                <img class="poster" src="${singFilm.Poster !== "N/A" ? singFilm.Poster : ''}">
                                <div>
                                <div class='movie-head'>
                                    <h2>${singFilm.Title}</h2>
                                    <img  class = 'star' src='./Icon (1).svg'>
                                    <p>${detail.imdbRating}</p>
                                    </div>
                                    <div class='detail-sub'>
                                    <p>${detail.Runtime}</p>
                                    <p>${detail.Genre}</p>
                                    <div class='watch-list'>
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