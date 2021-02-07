const fakeMovies = [
  {
    Title: 'Home Alone',
    Year: '1990',
    imdbID: 'tt0099785',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  },
  {
    Title: 'Spider-Man: Far from Home',
    Year: '2019',
    imdbID: 'tt6320628',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
  },
  {
    Title: 'Home Alone 2: Lost in New York',
    Year: '1992',
    imdbID: 'tt0104431',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  },
  {
    Title: "Miss Peregrine's Home for Peculiar Children",
    Year: '2016',
    imdbID: 'tt1935859',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTU0Nzc5NzI5NV5BMl5BanBnXkFtZTgwNTk1MDE4MDI@._V1_SX300.jpg',
  },
  {
    Title: "Daddy's Home",
    Year: '2015',
    imdbID: 'tt1528854',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTQ0OTE1MTk4N15BMl5BanBnXkFtZTgwMDM5OTk5NjE@._V1_SX300.jpg',
  },
  {
    Title: 'Home Alone 3',
    Year: '1997',
    imdbID: 'tt0119303',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZTJhYjVhOWMtYTUyOS00NWM0LThjNzYtZWYxOTkwN2FhODg2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  },
  {
    Title: 'Sweet Home Alabama',
    Year: '2002',
    imdbID: 'tt0256415',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjEwMjIwMDQ4OV5BMl5BanBnXkFtZTYwNzc3OTY3._V1_SX300.jpg',
  },
  {
    Title: 'Home',
    Year: '2015',
    imdbID: 'tt2224026',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjExOTQ4MDMyMV5BMl5BanBnXkFtZTgwMTE3NDM2MzE@._V1_SX300.jpg',
  },
  {
    Title: 'Star Trek IV: The Voyage Home',
    Year: '1986',
    imdbID: 'tt0092007',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWM4MWEwNWYtZjNhYS00ZWVhLWE2ZjAtMDAyMGRkMDk2NDBlXkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg',
  },
  {
    Title: "Daddy's Home 2",
    Year: '2017',
    imdbID: 'tt5657846',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNDA4Nzc1OTg2OV5BMl5BanBnXkFtZTgwODE3ODgwNDI@._V1_SX300.jpg',
  },
];

$(document).ready(() => {
  $('#searchForm').on('submit', async (e) => {
    e.preventDefault();
    const searchText = $('#searchText').val();
    const movies = await getMovies(searchText);
    renderMovies(movies);
  });

  renderMovies(fakeMovies);
});

async function getMovies(searchText) {
  // jQuery(1.5.1+) ajax methods returns jqXHR objects which implement the Promise interface!
  // https://api.jquery.com/jQuery.ajax/#jqXHR
  try {
    const data = await $.get(
      // shorthand for $.ajax(getOptions)
      `http://www.omdbapi.com/?apikey=${process.env.ODMB_API}&s=${searchText}`
    );
    const { Search: movies } = data;
    return movies;
  } catch (err) {
    console.log(err);
  }
}

function renderMovies(movies = []) {
  const movieHtmls = movies.map(
    (movie) => `
        <div class="col-md-6 col-lg-4 mb-3">
          <div class="card h-100">
            <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${movie.Title}</h5> 
              <a onClick="viewMovieInfo('${movie.imdbID}')" class="btn btn-primary align-self-end" href="#">Movie Details</a> 
            </div>
          </div>
        </div>`
  );

  $('#movies').html(movieHtmls.join(''));
}

function viewMovieInfo(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

async function getMovie() {
  const movieId = sessionStorage.getItem('movieId');
  const movie = await $.get(
    // shorthand for $.ajax(getOptions)
    `http://www.omdbapi.com/?apikey=${process.env.ODMB_API}&i=${movieId}`
  );
  console.log(movie);
  return movie;
}

function renderMovie(movie = []) {
  const movieHtml = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="img-thumbnail" alt="${movie.Title}"/>
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre} </li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released} </li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated} </li>
            <li class="list-group-item"><strong>imdb Rating:</strong> ${movie.imdbRating} </li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director} </li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer} </li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors} </li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <h3>Plot</h3>
          <p>${movie.Plot}</p>
          <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View imdb</a>
          <a href="index.html" class="btn btn-dark">Go Back To Search</a>
        </div>
      </div>      
    `;
  $('#movie').html(movieHtml);
}
