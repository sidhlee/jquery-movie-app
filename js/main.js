$(document).ready(() => {
  console.log('main.js loaded');
  console.log(process.env.API_KEY);
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    const searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  console.log(searchText);
}
