const {getFromDB, addBookToDB, removeBookFromDB, clearDB, getLocale} = window.reqAppJs("async.js");
const { sortByProp, cyrillic } = window.reqAppJs("sort.js");
const {localize} = window.reqAppJs("localization.js");
const {LocaleSelect} = window.reqAppJs("components/locale_select.js");
const {ViewAllBooks} = window.reqAppJs("components/views/view_all_books.js");
const {ViewAllShelfs} = window.reqAppJs("components/views/view_all_shelfs.js");
const {ViewBooksOnShelf} = window.reqAppJs("components/views/view_books_on_shelf.js");


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en",
      books: [],
      shelfs: [],
      booksOnShelfs: [],
      tags: [],
      tagsInBooks: [],
      booksSettings: [],
      dbLoaded: false,
      view: "books",
      checkedBooks: [],
	    includeTags: [],
      excludeTags: [],
      filterFav: 0,
      filterRead: 0,
      sort: "name",
	    tagsWindowOpened: false,
      seriesWindowOpened: false,
      authorsWindowOpened: false,
      newShelfName: "",
      renderBookChunks: 1,
      funcs: {
        turnAllBooks: this.turnAllBooks,
	      isBookOnShelf: this.isBookOnShelf,
	      closeAllWindows: this.closeAllWindows,
        sortByName: this.sortByName,
        sortBySeriesNum: this.sortBySeriesNum,
        changeBook: this.changeBook,
        loc: this.loc,
        setMainState: this.setMainState,
      }
    }
  }

  setMainState = (obj) => {
    this.setState(obj)
  }

  sortByName = () => {
    let books = [...this.state.books]
    let sort = "name"
    books = sortByProp(books, "bookName", cyrillic)
    this.setState({books, sort, renderBookChunks: 1})
  }

  sortBySeriesNum = () => {
    let books = [...this.state.books]
    let sort = "series number"
    books = sortByProp(books, "numinseries", cyrillic)
    this.setState({books, sort, renderBookChunks: 1})
  }

  isBookOnShelf = (bookId, shelfId) => {
    let booksOnShelfs = this.state.booksOnShelfs;
    if (booksOnShelfs.find(a => a.bookId == bookId && a.shelfId == shelfId) == undefined) {
	   return false
    } else {
	   return true
    }
  }

  turnAllBooks = () => {
    this.setState({view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, includeTags: [], excludeTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0})
    this.sortByName()
  }

  changeBook = (booksOnShelfs, bookId, shelfId, method) => {
    let books = this.state.books;
    let shelfs = this.state.shelfs;
    if (method == "add" && this.isBookOnShelf(bookId, shelfId) == false) {
      let bookName = books.find(a => a.bookId == bookId).bookName;
      let shelfName = shelfs.find(a => a.shelfId == shelfId).shelfName;
      booksOnShelfs.push({bookId, shelfId});
      addBookToDB(bookId, shelfId)
    } else if (method == "del" && this.isBookOnShelf(bookId, shelfId) == true) {
      booksOnShelfs = booksOnShelfs.filter(a => !(a.bookId == bookId && a.shelfId == shelfId));
      removeBookFromDB(bookId, shelfId)
    }
    return booksOnShelfs;
  }

  closeAllWindows = () => {
    this.setState({currentBook: undefined, changeMethod: undefined, tagsWindowOpened: false, seriesWindowOpened: false, authorsWindowOpened: false})
  }

  loc = () => {
    return localize(this.state.locale)
  }

  componentDidMount() {
    let locale = getLocale()
    clearDB().then(() => {
      getFromDB().then(({books, shelfs, booksOnShelfs, tags, tagsInBooks, booksSettings}) => {
        this.setState({books, shelfs, booksOnShelfs, tags, tagsInBooks, booksSettings, dbLoaded: true, locale: locale})
      })
    });
  }




  render() {
    let state = this.state;

    const view = () => {
      if (state.view == "books") {
        return <ViewAllBooks state={state}/>
      } else if (state.view == "shelfs") {
        return <ViewAllShelfs  state={state}/>
      } else {
        return <ViewBooksOnShelf state={state}/>
      }
    }

    if (state.dbLoaded == true) {
      return <div id="app">
        <LocaleSelect  state={state} />
        {view()}
      </div>
    } else {
      return <h1>{this.loc().loading}</h1>
    }
  }
}


module.exports.App = App;
