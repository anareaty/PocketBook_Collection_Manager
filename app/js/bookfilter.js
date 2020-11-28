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

  const tagsIncludeCond = (book) => {
    if (ignored == "tags") return true
    let includeTags = state.includeTags
    if (includeTags.length != 0) {
      for (let i=0; i<includeTags.length; i++) {
        if (state.tagsInBooks.find(a => a.bookId == book.bookId && a.tagId == includeTags[i]) == undefined) {
          return false;
        }
      }
      return true
    } else return true
  }

  const tagsExcludeCond = (book) => {
    if (ignored == "tags") return true
    let excludeTags = state.excludeTags
    if (excludeTags.length != 0) {
      for (let i=0; i<excludeTags.length; i++) {
        if (state.tagsInBooks.find(a => a.bookId == book.bookId && a.tagId == excludeTags[i]) != undefined) {
          return false;
        }
      }
      return true
    } else return true
  }

  const tagsCond = (book) => {
    if (ignored == "tags") return true
    let includeTags = state.includeTags
    let excludeTags = state.excludeTags
    if (includeTags.length == 0 && excludeTags.length == 0) return true
    let tagsInBook = state.tagsInBooks.filter(a => a.bookId == book.bookId).map(a => a.tagId)
    if (tagsInBook.length == 0 && includeTags.length != 0) return false

    let include = false
    let exclude = false

    for (i = 0; i < tagsInBook.length; i++) {
      let tag = tagsInBook[i]
      if (excludeTags.indexOf(tag) != -1) {
        exclude = true
      }
      if (includeTags.indexOf(tag) != -1) {
        include = true
      }
    }

    if (include && exclude) return false
    if (include && !exclude) return true
    if (!include && exclude) return false
    if (!include && !exclude && includeTags.length != 0) return false
    if (!include && !exclude && includeTags.length == 0) return true


    return true
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
