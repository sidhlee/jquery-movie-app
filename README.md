# jQuery Movie App

A simple movie app with jQuery and OMDB api based on the tutorial:<br/>
[Build A JavaScript & jQuery Movie Info App in 30 Minutes](https://youtu.be/YsPqjYGauns)

## What I learned

### You can await $.get(url)

jQuery's ajax static method returns `jqXHR` objects which implement the Promise interface.  
If you decided to use jQuery, you don't need to use 3rd party libraries (eg. axios) to fetch your data.

```js
const data = await $.get(
  // shorthand for $.ajax(getOptions)
  `http://www.omdbapi.com/?apikey=${process.env.ODMB_API}&s=${searchText}`
);
const { Search: movies } = data;
```

### HTML `<template>` tag are not supported in IE

If you're using jQuery, chances are you're doing it for supporting IE.
If you don't care about supporting IE, then you'd be probably using React.
I like `<template>` tag, but feel like its real-life use cases are limited.

### How to add .env to vanilla JS project?

.env is mostly used with .gitignore to prevent sensitive information (eg. api keys) from being pushed into public repositories.  
You can implement this with pure JS like so:

`config/process.js`

```js
const process = {
  env: {
    API_KEY: 'your_api_key',
  },
};
```

`index.html`

```html
<body>
  ...your markups

  <script src="config/process.js"></script>
  ...other CDNs (eg. jQuery)...
  <script src="js/main.js"></script>
</body>
```

Then use it like in node.js

```js
const data = await $.get(
  // shorthand for $.ajax(getOptions)
  `http://www.omdbapi.com/?apikey=${process.env.ODMB_API}&s=${searchText}`
);
```

### jQuery is a lot slower than React

Especially when you have to manipulate DOM (as oppose to just traversing DOM or adding event listeners).  
You will see the initial markup, then jQuery filling up the placeholder with data-populated htmls.

### Use Handlebars for templating

Advantages include:

- Keep the markups inside html files -> separate presentation from logic. cleaner js code
- IDE syntax highlighting & correct Emmet (you get className instead of class inside .js files)

`index.html`

```html
<div class="container">
  <div id="movies" class="row"></div>
</div>

<!-- Templates -->
<script id="movies-template" type="text/x-handlebars-template">
  <div class='col-md-6 col-lg-4 mb-3'>
    <div class='card h-100'>
      <img class='card-img-top' src='{{Poster}}' alt='{{Title}}' />
      <div class='card-body d-flex flex-column justify-content-between'>
        <h5 class='card-title'>
          {{Title}}
        </h5>
        <a
          onClick='viewMovieInfo('{{imdbID}}')'
          class='btn btn-primary align-self-end'
          href='#'
        >
          Movie Details
        </a>
      </div>
    </div>
  </div>
</script>
```

`main.js`

```js
function renderMovies(movies = []) {
  const source = $('#movies-template').html(); // get html from template
  const template = Handlebars.compile(source); // create new html-generator function
  const movieHtmls = movies.map(
    ({ Poster, Title, imdbID }) => template({ Poster, Title, imdbID }) // pass context to generate html
  );

  $('#movies').html(movieHtmls); // you can pass an array to $.html()
}
```

## jQuery Workflow

1. Add markup for layouts
   - start with index.html
   - First write static components (header, footer, etc...)
   - Copy & paste static components across pages
   - Then add placeholder elements to individual pages whose content will be populated with jQuery.
2. Add event listeners inside `$(document).ready(() => {})`
   - forms, buttons, links, etc...
3. Get form data
   - `$(inputElm).val()`
4. Write fetch functions
   - pass form data to query API
   - return API data, usually in object format or an array of objects
5. Write render functions
   - pass API data
   - map it into a html template string. (or use Handlebars to generate them)
   - insert the dom string into the placeholder with `$(placeholder).html(items.join(" "))`

## Resources

- [OMDb API](http://www.omdbapi.com/)
- [Bootwatch - Cyborg theme](https://bootswatch.com/cyborg/)
- [axios - npm](https://www.npmjs.com/package/axios)
- [jQuery CDN](https://code.jquery.com/)
