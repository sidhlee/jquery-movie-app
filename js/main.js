$(document).ready(() => {
  console.log('main.js loaded');
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    const searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  console.log(searchText);
  axios.get('');
}
