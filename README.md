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

## Resources

- [OMDb API](http://www.omdbapi.com/)
- [Bootwatch - Cyborg theme](https://bootswatch.com/cyborg/)
- [axios - npm](https://www.npmjs.com/package/axios)
- [jQuery CDN](https://code.jquery.com/)
