const bookFilter = (state, ignored) => {
  let books = state.books;

  const favCond = (book) => {
    if (state.filterFav == 1) return book.favorite == 1
    else if (state.filterFav == -1) return book.favorite == 0
    else return true
  }

  const readCond = (book) => {
    if (state.filterRead == 1) return book.completed == 1
    else if (state.filterRead == -1) return book.completed == 0
    else return true
  }

  const authorCond = (book) => {
    if (ignored == "authors") return true
    if (state.currentAuthor != undefined) return book.author == state.currentAuthor
    else return true
  }

  const seriesCond = (book) => {
    if (ignored == "series") return true
    if (state.currentSeries != undefined) return book.series == state.currentSeries
    else return true
  }

  const tagsCond = (book) => {
    if (ignored == "tags") return true
    let filterByTags = state.filterByTags
    if (filterByTags.length != 0) {
      for (let i=0; i<filterByTags.length; i++) {
        if (state.tagsInBooks.find(a => a.bookId == book.bookId && a.tagId == filterByTags[i]) == undefined) {
          return false;
        }
      }
      return true
    } else return true
  }

  const shelfCond = (book) => {
    if (state.currentShelf != undefined) {
      if (state.currentShelf == "noshelf") {
        return state.booksOnShelfs.find(a => a.bookId == book.bookId) == undefined
      } else {
        return state.funcs.isBookOnShelf(book.bookId, state.currentShelf)
      }
    } return true
  }

  return books.filter(book => favCond(book) &&
    readCond(book) &&
    authorCond(book) &&
    seriesCond(book) &&
    tagsCond(book) &&
    shelfCond(book)
  )
}

module.exports = { bookFilter }
