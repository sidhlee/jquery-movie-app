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

  // load movies by default
  if (window.location.pathname === '/index.html') {
    renderMovies(fakeMovies);
  }
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
  const source = $('#movies-template').html();
  const template = Handlebars.compile(source);
  const movieHtmls = movies.map(({ Poster, Title, imdbID }) =>
    template({ Poster, Title, imdbID })
  );

  $('#movies').html(movieHtmls); // you can pass an array to $.html()
}

function viewMovieInfo(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

async function getMovie() {
  const movieId = sessionStorage.getItem('movieId');
  const movie = await $.get(
    `http://www.omdbapi.com/?apikey=${process.env.ODMB_API}&i=${movieId}`
  );
  return movie;
}

function renderMovie(movie = []) {
  const source = $('#movie-template').html();
  const template = Handlebars.compile(source);
  const movieHtml = template({ ...movie });
  $('#movie').html(movieHtml);
}
