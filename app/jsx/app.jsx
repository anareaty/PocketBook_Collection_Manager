const {
  getFromDB,
  addBookToDB,
  removeBookFromDB,
  addNewShelfToDB,
  findLastShelfId,
  clearDB,
  deleteShelfFromDB,
  addSettingsToDB,
  updateSettingsInDB,
  getLocale,
  saveLocale
} = window.reqAppJs("async.js");

const { sort, sortByProp, cyrillic } = window.reqAppJs("sort.js");
const {localize} = window.reqAppJs("localization.js");
const {bookFilter} = window.reqAppJs("bookfilter.js");

const {LocaleSelect} = window.reqAppJs("components/locale_select.js");
const {ViewAllBooks} = window.reqAppJs("components/views/view_all_books.js");
const {ViewAllShelfs} = window.reqAppJs("components/views/view_all_shelfs.js");
const {ViewBooksOnShelf} = window.reqAppJs("components/views/view_books_on_shelf.js");



class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    locale: "en",
    dbLoaded: false,
    view: "books",
    currentShelf: undefined,
    currentBook: undefined,
    checkedBooks: [],
	  changeMethod: undefined,
    books: [],
    shelfs: [],
    booksOnShelfs: [],
    tags: [],
    tagsInBooks: [],
    booksSettings: [],
	  filterByTags: [],
    currentSeries: undefined,
    currentAuthor: undefined,
	  tagsWindowOpened: false,
    seriesWindowOpened: false,
    authorsWindowOpened: false,
    newShelfName: "",
    filterFav: 0,
    filterRead: 0,
    sort: "name",
    renderBookChunks: 1,
    settingsUpdated: false,
    funcs: {
      turnAllBooks: this.turnAllBooks,
      turnAllShelfs: this.turnAllShelfs,
      turnShelf: this.turnShelf,
      openShelfsWindow: this.openShelfsWindow,
      changeOne: this.changeOne,
      checkBook: this.checkBook,
	    selectChangeMethod: this.selectChangeMethod,
	    massChange: this.massChange,
	    isBookOnShelf: this.isBookOnShelf,
	    selectAllBooks: this.selectAllBooks,
	    clearSelectedBooks: this.clearSelectedBooks,
      clearSelectedAuthors: this.clearSelectedAuthors,
      clearSelectedSeries: this.clearSelectedSeries,
      clearSelectedTags: this.clearSelectedTags,
	    closeAllWindows: this.closeAllWindows,
      delFromCurrent: this.delFromCurrent,
	    selectTags: this.selectTags,
	    changeTag: this.changeTag,
      addNewShelf: this.addNewShelf,
      inputNewShelfName: this.inputNewShelfName,
      deleteShelf: this.deleteShelf,
      selectSeries: this.selectSeries,
      changeSeries: this.changeSeries,
      selectAuthor: this.selectAuthor,
      changeAuthor: this.changeAuthor,
      sortByName: this.sortByName,
      sortByAuthor: this.sortByAuthor,
      sortBySeriesNum: this.sortBySeriesNum,
      toggleCompleted: this.toggleCompleted,
      toggleFavorite: this.toggleFavorite,
      toggleFilterFav: this.toggleFilterFav,
      toggleFilterRead: this.toggleFilterRead,
      changeSettingsAll: this.changeSettingsAll,
      loc: this.loc,
      setMainState: this.setMainState,
      getMainState: this.getMainState
	}
  };
}

setMainState = (obj) => {
  this.setState(obj)
}

getMainState = () => {
  return this.state
}











toggleFilterFav = (e) => {
  let id = e.currentTarget.id;
  let filterFav = this.state.filterFav;
  if (id == "favorite" && filterFav != 1) {
    filterFav = 1
  } else if (id == "non-favorite" && filterFav != -1) {
    filterFav = -1
  } else {
    filterFav = 0
  }
  this.setState({filterFav, checkedBooks: [], allBooksSelected: 0, renderBookChunks: 1})
}

toggleFilterRead = (e) => {
  let id = e.currentTarget.id;
  let filterRead = this.state.filterRead;
  if (id == "completed" && filterRead != 1) {
    filterRead = 1
  } else if (id == "non-completed" && filterRead != -1) {
    filterRead = -1
  } else {
    filterRead = 0
  }
  this.setState({filterRead, checkedBooks: [], allBooksSelected: 0, renderBookChunks: 1})
}

toggleCompleted = (e) => {
  let bookId = Number(e.currentTarget.id.substr(9))
  let booksSettings = [...this.state.booksSettings]
  let books = [...this.state.books]
  let book = books.find(a => a.bookId == bookId)
  if (book.completed == 1) {
    book.completed = 0
  } else {
    book.completed = 1
  }

  let bookInSettings = booksSettings.find(a => a.bookId == bookId)
  if (bookInSettings == undefined) {
    booksSettings.push({bookId, completed: book.completed, favorite: 0})
    addSettingsToDB(bookId, book.completed, book.favorite)
  } else {
    bookInSettings.completed = book.completed;
    updateSettingsInDB(bookId, book.completed, book.favorite)
  }

  this.setState({books, booksSettings, renderBookChunks: 1})
}

toggleFavorite = (e) => {
  let bookId = Number(e.currentTarget.id.substr(8))
  let booksSettings = [...this.state.booksSettings]
  let books = [...this.state.books]
  let book = books.find(a => a.bookId == bookId)
  if (book.favorite == 1) {
    book.favorite = 0
  } else {
    book.favorite = 1
  }

  let bookInSettings = booksSettings.find(a => a.bookId == bookId)
  if (bookInSettings == undefined) {
    booksSettings.push({bookId, completed: 0, favorite: book.favorite})
    addSettingsToDB(bookId, book.completed, book.favorite)
  } else {
    bookInSettings.favorite = book.favorite;
    updateSettingsInDB(bookId, book.completed, book.favorite)
  }

  this.setState({books, booksSettings, renderBookChunks: 1})
}





sortByName = () => {
  let books = [...this.state.books]
  let sort = "name"
  books = sortByProp(books, "bookName", cyrillic)
  this.setState({books, sort, renderBookChunks: 1})
}

sortByAuthor = () => {
  let books = [...this.state.books]
  let sort = "author"
  books = sortByProp(books, "author", cyrillic)
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

  deleteShelf = () => {
    let shelfId = this.state.currentShelf;

    let shelfs = [...this.state.shelfs].filter(a => a.shelfId != shelfId);
    let booksOnShelfs = [...this.state.booksOnShelfs].filter(a => a.shelfId != shelfId);

    deleteShelfFromDB(shelfId)
    this.setState({shelfs, booksOnShelfs, currentShelf: undefined, checkedBooks: [], allBooksSelected: 0, filterByTags: [], view: "shelfs", currentSeries: undefined, currentAuthor: undefined})
  }

  addNewShelf = () => {
    let shelfs = [...this.state.shelfs]
    let shelfNames = shelfs.map(a => a.shelfName)
    newShelfName = this.state.newShelfName;

    if (newShelfName == "") {
      newShelfName = this.loc().newShelf
    }

    if (shelfNames.indexOf(newShelfName) != -1) {
      let nameStart = newShelfName;
      let num = 0;
      while (shelfNames.indexOf(newShelfName) != -1) {
        num++;
        newShelfName = nameStart + " (" + num + ")";
      }
    }

    findLastShelfId().then((lastId) => {
      newShelfId = lastId + 1;
      let newShelf = {shelfId: newShelfId, shelfName: newShelfName}
      shelfs.push(newShelf)
      this.setState({shelfs, newShelfName: ""})
      addNewShelfToDB(newShelfName, newShelfId)
    })

  }

  inputNewShelfName = (e) => {
    this.setState({newShelfName: e.target.value})
  }

  selectTags = () => {
    this.setState({tagsWindowOpened: true, checkedBooks: [], allBooksSelected: 0})
  }

  selectSeries = () => {
    this.setState({seriesWindowOpened: true, checkedBooks: [], allBooksSelected: 0})
  }

  selectAuthor = () => {
    this.setState({authorsWindowOpened: true, checkedBooks: [], allBooksSelected: 0})
  }

  changeTag = (e) => {
    let tagId = Number(e.target.id.substr(8))
	  let filterByTags = [...this.state.filterByTags]

	  if (e.target.checked == true && filterByTags.indexOf(tagId) == -1) {
	    filterByTags.push(tagId)
	  } else if (e.target.checked == false && filterByTags.indexOf(tagId) != -1) {
	    let index = filterByTags.indexOf(tagId)
        filterByTags.splice(index, 1)
	  } else {return}

	  this.setState({filterByTags, renderBookChunks: 1})
  }

  changeSeries = (e) => {
    let seriesId = e.target.id.substr(12)
	  let currentSeries = this.state.currentSeries

	  if (e.target.checked == true) {
	    currentSeries = seriesId;
      this.sortBySeriesNum()
	  } else if (e.target.checked == false && currentSeries == seriesId) {
	    currentSeries = undefined;
      this.sortByName()
	  } else {return}

	  this.setState({currentSeries, renderBookChunks: 1})
  }


  changeAuthor = (e) => {
    let authorId = e.target.id.substr(12)
	  let currentAuthor = this.state.currentAuthor

	  if (e.target.checked == true) {
	    currentAuthor = authorId;
	  } else if (e.target.checked == false && currentAuthor == authorId) {
	    currentAuthor = undefined;
	  } else {return}

	  this.setState({currentAuthor, renderBookChunks: 1})
  }



  selectAllBooks = () => {
    let books = bookFilter(this.state)
    let checkedBooks = books.map(a => a.bookId)
	  this.setState({checkedBooks, allBooksSelected: 1, renderBookChunks: 1})
  }


  clearSelectedBooks = () => {
  this.setState({checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1})
  }

  clearSelectedAuthors = () => {
  this.setState({currentAuthor: undefined, renderBookChunks: 1})
  }

  clearSelectedSeries = () => {
  this.setState({currentSeries: undefined, renderBookChunks: 1})
  }

  clearSelectedTags = () => {
  this.setState({filterByTags: [], renderBookChunks: 1})
  }



  turnAllBooks = () => {
    this.setState({view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0})
    this.sortByName()
  }

turnAllShelfs = () => {
      this.setState({view: "shelfs", currentShelf: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0})
      this.sortByName()
}

turnShelf = (e) => {
  let id = e.target.id
  if (id != "noshelf") {
    id = Number(e.target.id.substr(11));
  }
  this.setState({view: "books on shelf", currentShelf: id, currentBook: undefined, checkedBooks: [], allBooksSelected: 0, changeMethod: undefined})
}

openShelfsWindow = (e) => {
  let id = Number(e.target.id.substr(10));
  this.setState({currentBook: id, checkedBooks: [], allBooksSelected: 0, changeMethod: undefined})
}



  checkBook = (e) => {
    let id = Number(e.target.id.substr(9))
    let checkedBooks = [...this.state.checkedBooks]
    let findChecked = checkedBooks.find(a => a == id)
    if (e.target.checked == true && findChecked == undefined) {
      checkedBooks.push(id)

    } else if (e.target.checked == false && findChecked != undefined) {
      let index = checkedBooks.indexOf(id)
      checkedBooks.splice(index, 1)
    } else {return}
    this.setState({checkedBooks, changeMethod: undefined})

  }

  selectChangeMethod = (e) => {
	let id = e.target.id;
    this.setState({changeMethod: id, currentBook: undefined})
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

  changeOne = (e) => {
  let booksOnShelfs = [...this.state.booksOnShelfs];
  let bookId = this.state.currentBook;
  let shelfId = Number(e.target.id.substr(10));
  let method = "add";
  if (e.target.checked == false) {
    method = "del";
  }
  booksOnShelfs = this.changeBook(booksOnShelfs, bookId, shelfId, method);
  this.setState({booksOnShelfs});
}

  massChange = (e) => {
    let booksOnShelfs = [...this.state.booksOnShelfs];
    let shelfId = Number(e.target.id.substr(17));
	  let checkedBooks = this.state.checkedBooks;
	  let changeMethod = this.state.changeMethod;
    let currentShelf = this.state.currentShelf

	  for (let i=0; i<checkedBooks.length; i++) {
	    booksOnShelfs = this.changeBook(booksOnShelfs, checkedBooks[i], shelfId, changeMethod)
	  }

    if (currentShelf == "noshelf" && changeMethod == "add") {
      checkedBooks = [];
    }

	  this.setState({booksOnShelfs, checkedBooks, changeMethod: undefined});
  }


  delFromCurrent = () => {
    let booksOnShelfs = [...this.state.booksOnShelfs];
    let shelfId = this.state.currentShelf;
	let checkedBooks = this.state.checkedBooks;

	for (let i=0; i<checkedBooks.length; i++) {
	  booksOnShelfs = this.changeBook(booksOnShelfs, checkedBooks[i], shelfId, "del")
	}

	this.setState({booksOnShelfs, checkedBooks: [], allBooksSelected: 0});
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
