var formatter = {
  forApi: function(text) {
    return text.toString()
      .replace(/\s+/g,      '') // Replace spaces with
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-+/g,      '') // Replace -- with -
      .replace(/\-\-+/g,    '') // Replace -- with -
      .replace(/-+$/,       '') // Trim - from end of text
  },
  forSlug: function(text) {
    return text.toString()
      .replace(/\s+/g,      '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-\-+/g,    '') // Replace -- with -
      .replace(/-+$/,       ''); // Trim - from end of text
  }
}

module.exports = formatter;