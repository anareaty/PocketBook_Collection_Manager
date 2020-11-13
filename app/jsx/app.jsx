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

const {
  sort,
  sortByProp,
  cyrillic
} = window.reqAppJs("sort.js");

const {localize} = window.reqAppJs("localization.js");


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
    bookFilterShelfs: this.bookFilterShelfs,
    bookFilterTags: this.bookFilterTags,
    bookFilterSeries: this.bookFilterSeries,
    bookFilterAuthor: this.bookFilterAuthor,
    toggleCompleted: this.toggleCompleted,
    toggleFavorite: this.toggleFavorite,
    toggleFilterFav: this.toggleFilterFav,
    toggleFilterRead: this.toggleFilterRead,
    bookFilterRead: this.bookFilterRead,
    bookFilterFav: this.bookFilterFav,
    changeSettingsAll: this.changeSettingsAll,
    loc: this.loc,
    selectLocale: this.selectLocale
	}
  };
}

selectLocale = (e) => {
  let index = e.target.selectedIndex
  let locale = e.target.options[index].value
  this.setState({locale})
  saveLocale(locale)
}


changeSettingsAll = (e) => {
  let id = e.currentTarget.id
  let checkedBooks = this.state.checkedBooks
  let books = [...this.state.books]
  let booksSettings = [...this.state.booksSettings]
  checkedBooks.forEach((bookId) => {
    let book = books.find(a => a.bookId == bookId)
    if (id == "fav-all") {
      book.favorite = 1
    } else if (id =="unfav-all") {
      book.favorite = 0
    } else if (id =="complete-all") {
      book.completed = 1
    } else if (id =="uncomplete-all") {
      book.completed = 0
    }
    let bookInSettings = booksSettings.find(a => a.bookId == bookId)
    if (bookInSettings == undefined) {
      booksSettings.push({bookId, completed: book.completed, favorite: book.favorite})
      addSettingsToDB(bookId, book.completed, book.favorite)
    } else {
      bookInSettings.completed = book.completed;
      updateSettingsInDB(bookId, book.completed, book.favorite)
    }
  });
  this.setState({books, booksSettings, filterRead: 0, filterFav: 0})
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
  this.setState({filterFav, checkedBooks: []})
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
  this.setState({filterRead, checkedBooks: []})
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

  this.setState({books, booksSettings})
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

  this.setState({books, booksSettings})
}

bookFilterShelfs = (books) => {
  let booksOnShelfs = this.state.booksOnShelfs;
  let shelfId = this.state.currentShelf
  if (shelfId != undefined) {
    if (shelfId == "noshelf") {
      let booksWithShelfs = booksOnShelfs.map(a => a.bookId)
      books = books.filter(a => booksWithShelfs.indexOf(a.bookId) == -1)
    } else {
      books = books.filter((a) => this.isBookOnShelf(a.bookId, shelfId) == true)
    }
  }
  return books;
}

bookFilterTags = (books) => {
  let filterByTags = this.state.filterByTags
  if (filterByTags.length != 0) {
    let tagsInBooks = this.state.tagsInBooks
    for (let i=0; i<filterByTags.length; i++) {
      let tag = filterByTags[i]
      let booksInTag = tagsInBooks.filter(a => a.tagId == tag).map(a => a.bookId)
      books = books.filter(a => booksInTag.indexOf(a.bookId) != -1)
    }
  }
  return books;
}

bookFilterSeries = (books) => {
  let currentSeries = this.state.currentSeries
  if (currentSeries != undefined) {
    books = books.filter(a => a.series == currentSeries)
  }
  return books;
}

bookFilterAuthor = (books) => {
  let currentAuthor = this.state.currentAuthor
  if (currentAuthor != undefined) {
    books = books.filter(a => a.author == currentAuthor)
  }
  return books;
}

bookFilterRead = (books) => {
  let filterRead = this.state.filterRead
  if (filterRead == 1) {
    books = books.filter(a => a.completed == 1)
  } else if (filterRead == -1) {
    books = books.filter(a => a.completed == 0)
  }
  return books;
}

bookFilterFav = (books) => {
  let filterFav = this.state.filterFav
  if (filterFav == 1) {
    books = books.filter(a => a.favorite == 1)
  } else if (filterFav == -1) {
    books = books.filter(a => a.favorite == 0)
  }
  return books;
}


sortByName = () => {
  let books = [...this.state.books]
  books = sortByProp(books, "bookName", cyrillic)
  this.setState({books})
}

sortByAuthor = () => {
  let books = [...this.state.books]
  books = sortByProp(books, "author", cyrillic)
  this.setState({books})
}

sortBySeriesNum = () => {
  let books = [...this.state.books]
  books = sortByProp(books, "numinseries", cyrillic)
  this.setState({books})
}

  isBookOnShelf = (bookId, shelfId) => {
    let booksOnShelfs = this.state.booksOnShelfs;
    if (booksOnShelfs.find(a => a.bookId == bookId & a.shelfId == shelfId) == undefined) {
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
    this.setState({shelfs, booksOnShelfs, currentShelf: undefined, checkedBooks: [], filterByTags: [], view: "shelfs", currentSeries: undefined, currentAuthor: undefined})
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
    this.setState({tagsWindowOpened: true, checkedBooks: []})
  }

  selectSeries = () => {
    this.setState({seriesWindowOpened: true, checkedBooks: []})
  }

  selectAuthor = () => {
    this.setState({authorsWindowOpened: true, checkedBooks: []})
  }

  changeTag = (e) => {
    let tagId = Number(e.target.id.substr(8))
	  let filterByTags = [...this.state.filterByTags]

	  if (e.target.checked == true & filterByTags.indexOf(tagId) == -1) {
	    filterByTags.push(tagId)
	  } else if (e.target.checked == false & filterByTags.indexOf(tagId) != -1) {
	    let index = filterByTags.indexOf(tagId)
        filterByTags.splice(index, 1)
	  } else {return}

	  this.setState({filterByTags})
  }

  changeSeries = (e) => {
    let seriesId = e.target.id.substr(12)
	  let currentSeries = this.state.currentSeries

	  if (e.target.checked == true) {
	    currentSeries = seriesId;
      this.sortBySeriesNum()
	  } else if (e.target.checked == false & currentSeries == seriesId) {
	    currentSeries = undefined;
      this.sortByName()
	  } else {return}

	  this.setState({currentSeries})
  }


  changeAuthor = (e) => {
    let authorId = e.target.id.substr(12)
	  let currentAuthor = this.state.currentAuthor

	  if (e.target.checked == true) {
	    currentAuthor = authorId;
	  } else if (e.target.checked == false & currentAuthor == authorId) {
	    currentAuthor = undefined;
	  } else {return}

	  this.setState({currentAuthor})
  }



  selectAllBooks = () => {
    let shelfId = this.state.currentShelf;
	  let checkedBooks;
    if (shelfId == undefined) {
	    checkedBooks = this.state.books.map(a => a.bookId)
	  } else if (shelfId == "noshelf") {
      let booksWithShelfs = this.state.booksOnShelfs.map(a => a.bookId)
      checkedBooks = this.state.books.filter(a => booksWithShelfs.indexOf(a.bookId) == -1).map(a => a.bookId)
    } else {
	    checkedBooks = this.state.booksOnShelfs.filter(a => a.shelfId == shelfId).map(a => a.bookId)
	  }

    let filterByTags = this.state.filterByTags
    if (filterByTags.length != 0) {
      let tagsInBooks = this.state.tagsInBooks
  	  for (let i=0; i<filterByTags.length; i++) {
  	    let tag = filterByTags[i]
  	    let booksInTag = tagsInBooks.filter(a => a.tagId == tag).map(a => a.bookId)
        checkedBooks = checkedBooks.filter(a => booksInTag.indexOf(a) != -1)
  	  }
    }

	  this.setState({checkedBooks})
  }


  clearSelectedBooks = () => {
  this.setState({checkedBooks: []})
  }

  clearSelectedAuthors = () => {
  this.setState({currentAuthor: undefined})
  }

  clearSelectedSeries = () => {
  this.setState({currentSeries: undefined})
  }

  clearSelectedTags = () => {
  this.setState({filterByTags: []})
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
  this.setState({view: "books on shelf", currentShelf: id, currentBook: undefined, checkedBooks: [], changeMethod: undefined})
}

openShelfsWindow = (e) => {
  let id = Number(e.target.id.substr(10));
  this.setState({currentBook: id, checkedBooks: [], changeMethod: undefined})
}



  checkBook = (e) => {
    let id = Number(e.target.id.substr(9))
    let checkedBooks = [...this.state.checkedBooks]
    let findChecked = checkedBooks.find(a => a == id)
    if (e.target.checked == true & findChecked == undefined) {
      checkedBooks.push(id)

    } else if (e.target.checked == false & findChecked != undefined) {
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

  if (method == "add" & this.isBookOnShelf(bookId, shelfId) == false) {
    let bookName = books.find(a => a.bookId == bookId).bookName;




    let shelfName = shelfs.find(a => a.shelfId == shelfId).shelfName;
    booksOnShelfs.push({bookId, shelfId});
    addBookToDB(bookId, shelfId)

  } else if (method == "del" & this.isBookOnShelf(bookId, shelfId) == true) {
    booksOnShelfs = booksOnShelfs.filter(a => !(a.bookId == bookId & a.shelfId == shelfId));
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

    if (currentShelf == "noshelf" & changeMethod == "add") {
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

	this.setState({booksOnShelfs, checkedBooks: []});
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
    if (this.state.dbLoaded == true) {
      if (this.state.view == "books") {
        return <div>
          <LocaleSelect  state={this.state} />
          <ViewAllBooks state={this.state}/>
          </div>
      } else if (this.state.view == "shelfs") {
        return <div>
          <LocaleSelect  state={this.state} />
          <ViewAllShelfs  state={this.state} />
        </div>
      } else {
        return <div>
          <LocaleSelect  state={this.state} />
          <ViewBooksOnShelf state={this.state}/>
        </div>
      }

    } else {
      return <h1>{this.loc().loading}</h1>
    }





}
}

class LocaleSelect extends React.Component {
  render() {
    let locale = this.props.state.locale
    return <select id='locale-select' value={locale} onChange={this.props.state.funcs.selectLocale}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  }
}

class ViewAllBooks extends React.Component {
  render() {
  return <div className="view">
    <h1>{this.props.state.funcs.loc().allBooks}</h1>
	<div id="viewbuttons">
	  <ButtonAllShelfs state={this.props.state}/>
    <FavAndReadFilters state={this.props.state}/>

	</div>
    <BookList state={this.props.state}/>
  </div>
}
}

class ViewAllShelfs extends React.Component {
  render() {
  return <div  className="view">
    <h1>{this.props.state.funcs.loc().allShelfs}</h1>
	<div id="viewbuttons">
	  <ButtonAllBooks state={this.props.state}/>
    <div>
      <input type="text" onChange={this.props.state.funcs.inputNewShelfName} value={this.props.state.newShelfName} placeholder={this.props.state.funcs.loc().newShelfName}/>
      <button id="addshelf" onClick={this.props.state.funcs.addNewShelf}>{this.props.state.funcs.loc().addShelf}</button>
    </div>

  </div>
    <ShelfList state={this.props.state}/>
  </div>
}
}

class ViewBooksOnShelf extends React.Component {
  render() {
  let funcs = this.props.state.funcs;
  let state = this.props.state;
  let shelfName = funcs.loc().booksWithoutShelfs
  if (state.currentShelf != "noshelf") {
    shelfName = state.shelfs.find((a) => a.shelfId == state.currentShelf).shelfName
  }
  return <div  className="view">
    <h1>{shelfName}</h1>
	<div id="viewbuttons">
	  <ButtonAllBooks state={this.props.state}/>
    <ButtonAllShelfs state={this.props.state}/>
    <FavAndReadFilters state={this.props.state}/>


    {(()=>{
      if (state.currentShelf != "noshelf") {
        return <button id="deleteshelf" onClick={state.funcs.deleteShelf}>{this.props.state.funcs.loc().deleteShelf}</button>
      }
    })()}
	</div>
    <BookList state={this.props.state}/>
  </div>
}
}

class ButtonAllBooks extends React.Component {
  render() {
  return <button onClick={this.props.state.funcs.turnAllBooks}>{this.props.state.funcs.loc().allBooks}</button>
}
}

class ButtonAllShelfs extends React.Component {
  render() {
  return <button onClick={this.props.state.funcs.turnAllShelfs}>{this.props.state.funcs.loc().allShelfs}</button>
}
}

class FavAndReadFilters extends React.Component {
  render() {
    let styleFav = () => {
      if (this.props.state.filterFav == 1) {
        return {backgroundColor: "#bbbbbb"}
      } else return {}
    }

    let styleNonFav = () => {
      if (this.props.state.filterFav == -1) {
      return {backgroundColor: "#bbbbbb"}
    } else return {}
  }

    let styleRead = () => {
      if (this.props.state.filterRead == 1) {
      return {backgroundColor: "#bbbbbb"}
    } else return {}
  }

    let styleNonRead = () => {
      if (this.props.state.filterRead == -1) {
      return {backgroundColor: "#bbbbbb"}
    } else return {}
  }

  return <div id="fav-and-read">
    <button id="favorite" style={styleFav()} onClick={this.props.state.funcs.toggleFilterFav}><i className="fa fa-heart"></i></button>
    <button id="non-favorite" style={styleNonFav()} onClick={this.props.state.funcs.toggleFilterFav}><i className="fa fa-heart-o"></i></button>
    <button id="completed" style={styleRead()} onClick={this.props.state.funcs.toggleFilterRead}><i className="fa fa-check"></i></button>
    <button id="non-completed" style={styleNonRead()} onClick={this.props.state.funcs.toggleFilterRead}><i className="fa fa-times"></i></button>
  </div>
}
}

class ChangeButtons extends React.Component {
  render() {
    if (this.props.state.checkedBooks.length != 0) {
	    let delText = this.props.state.funcs.loc().delFromShelf;
      let currentShelf = this.props.state.currentShelf
	    if (currentShelf != undefined) {
	      delText = this.props.state.funcs.loc().delFromAnotherShelf
	    }

      return <div id="changebuttons">
        <button id="add" onClick={this.props.state.funcs.selectChangeMethod}>{this.props.state.funcs.loc().addToShelf}</button>
        <button id="del" onClick={this.props.state.funcs.selectChangeMethod}>{delText}</button>
	   	  {(()=>{
		      if (currentShelf != undefined & currentShelf != "noshelf") {
		        return <button  id="delcurrent" onClick={this.props.state.funcs.delFromCurrent}>{this.props.state.funcs.loc().delFromThisShelf}</button>
		      }
		    })()}
        <button id="fav-all" onClick={this.props.state.funcs.changeSettingsAll}><i className="fa fa-heart"></i></button>
        <button id="unfav-all" onClick={this.props.state.funcs.changeSettingsAll}><i className="fa fa-heart-o"></i></button>
        <button id="complete-all" onClick={this.props.state.funcs.changeSettingsAll}><i className="fa fa-check"></i></button>
        <button id="uncomplete-all" onClick={this.props.state.funcs.changeSettingsAll}><i className="fa fa-times"></i></button>
      </div>
    } else {return <div/>}
  }
}



class BookList extends React.Component {
  render() {

  let state = this.props.state
  let funcs = state.funcs

  let books = funcs.bookFilterFav(funcs.bookFilterRead(funcs.bookFilterAuthor(funcs.bookFilterSeries(funcs.bookFilterTags(funcs.bookFilterShelfs(state.books))))))

  let checkedVal = (a) => {
	  if (state.checkedBooks.indexOf(a.bookId) != -1) {
	    return true
	  } else {
	    return false
	  }
	}

  let isFavorite = (a) => {
	  if (a.favorite == 1) {
	    return "fa fa-heart"
	  } else {
	    return "fa fa-heart-o"
	  }
	}

  let isCompleted = (a) => {
	  if (a.completed == 1) {
	    return "fa fa-check"
	  } else {
	    return "fa fa-times"
	  }
	}

  return <div>
    <div id="selectbuttons">
	    <button onClick={funcs.selectAllBooks}>{funcs.loc().selectAllBooks}</button>
	    <button onClick={funcs.clearSelectedBooks}>{funcs.loc().clearSelected}</button>
	    <button onClick={funcs.selectTags}>{funcs.loc().filterByTags}</button>
      <button onClick={funcs.selectSeries}>{funcs.loc().filterBySeries}</button>
      <button onClick={funcs.selectAuthor}>{funcs.loc().filterByAuthors}</button>
  	</div>
    <div id="filterbuttons">
      <span>{funcs.loc().sort}</span>
      <button onClick={funcs.sortByName}>{funcs.loc().byName}</button>
      <button onClick={funcs.sortByAuthor}>{funcs.loc().byAuthor}</button>
      <button onClick={funcs.sortBySeriesNum}>{funcs.loc().byNumInSeries}</button>
    </div>

    <div id="booktable">
	  {books.map((a) => <div key={a.bookId} id={"b" + a.bookId} className="bookrow">
        <div id={"completed" + a.bookId} onClick={funcs.toggleCompleted}><i className={isCompleted(a)}></i></div>
        <div id={"favorite" + a.bookId} onClick={funcs.toggleFavorite}><i className={isFavorite(a)}></i></div>
        <input type="checkbox" className="bookcheck" id={"bookcheck" + a.bookId} checked={checkedVal(a)} onChange={funcs.checkBook}/>
        <div>
          <div className="bookname" id={"bookname" + a.bookId}>{a.bookName}</div>
          {(() => {
            if (a.numinseries != 0) {
              return <div className="series" id={"series" + a.bookId}>{"(" + a.series +" - "+ a.numinseries + ")"}</div>
            } else {
              return null;
            }
           })()}
        </div>
        <div className="author" id={"author" + a.bookId}>{a.author}</div>
        <button className="bookbutton" id={"bookbutton" + a.bookId} onClick={funcs.openShelfsWindow}>{funcs.loc().shelfs}</button>
        <hr/>
	  </div>)}

	</div>

  <ChangeButtons state={this.props.state}/>
  <ShelfWindow state={this.props.state}/>
  <MassShelfChangeWindow state={this.props.state}/>
  <TagsWindow state={this.props.state}/>
  <SeriesWindow state={this.props.state}/>
  <AuthorsWindow state={this.props.state}/>


  </div>

}
}

class ShelfList extends React.Component {
  render() {
  return <div>
    <button  id="noshelf" className="shelfbutton" onClick={this.props.state.funcs.turnShelf}>{this.props.state.funcs.loc().booksWithoutShelfs}</button>
    {this.props.state.shelfs.map((a) => <div key={a.shelfId} id={"s" + a.shelfId} className="shelfrow">
    <button id={"shelfbutton" + a.shelfId} className="shelfbutton" onClick={this.props.state.funcs.turnShelf}>
      {a.shelfName}
    </button>
  </div>)}
  </div>
}
}

class ShelfWindow extends React.Component {
  render() {
  let bookId = this.props.state.currentBook;
  let shelfs = this.props.state.shelfs;
  let books = this.props.state.books;
  let booksOnShelfs = this.props.state.booksOnShelfs;

  if (bookId == undefined) {
    return <div></div>
  } else {

	let bookName = books.find(a => a.bookId == bookId).bookName;
	let header = this.props.state.funcs.loc().changeShelfsForBook + bookName;

	let checkedVal = (a) => {
	  if (this.props.state.funcs.isBookOnShelf(this.props.state.currentBook, a.shelfId) == true) {
	    return true
	  } else {
	    return false
	  }
	}

  return <div className="window" id="shelfwindow">
  <h2>{header}</h2>
  <div className="scrolled">
    {shelfs.map((a) => <div key={a.shelfId} id={"sb" + a.shelfId} className="shelfinbookrow">
      <input type="checkbox" className="shelfcheck" id={"shelfcheck" + a.shelfId} checked={checkedVal(a)} onChange={this.props.state.funcs.changeOne} />
    <span className="shelfinbookname" id={"shelfinbookname" + a.shelfId}>{a.shelfName}</span>
    </div>)}
  </div>

  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">{this.props.state.funcs.loc().close}</button>
  </div>
  }
}
}

class MassShelfChangeWindow extends React.Component {
  render() {
    if (this.props.state.changeMethod != undefined & this.props.state.checkedBooks.length != 0) {

	  let header;
	  if (this.props.state.changeMethod == "add") {
	    header = this.props.state.funcs.loc().addToShelf
	  } else {
	    header = this.props.state.funcs.loc().delFromShelf
	  }

	  let shelfs = this.props.state.shelfs.filter(a => a.shelfId != this.props.state.currentShelf)

	  return <div className="window">
	    <h2>{header}</h2>
      <div className="scrolled">
        {shelfs.map((a) => <div key={a.shelfId} id={"msc" + a.shelfId} className="shelfchangerow">
          <button id={"shelfchangebutton" + a.shelfId} className="shelfchangebutton" onClick={this.props.state.funcs.massChange}>
            {a.shelfName}
          </button>
        </div>)}
      </div>

		<button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">{this.props.state.funcs.loc().close}</button>
      </div>
	} else {
	  return <div/>
	}
  }
}

class TagsWindow extends React.Component {
  render() {
  if (this.props.state.tagsWindowOpened == false) {
    return null
  } else {
  let tags = this.props.state.tags;
  let booksIds = this.props.state.funcs.bookFilterFav(
    this.props.state.funcs.bookFilterRead(
      this.props.state.funcs.bookFilterAuthor(
        this.props.state.funcs.bookFilterSeries(
          this.props.state.funcs.bookFilterShelfs(
            this.props.state.books)))))
            .map(a => a.bookId)
  let tagsIds = this.props.state.tagsInBooks.filter(a => booksIds.indexOf(a.bookId) != -1)
    .map(a => a.tagId)
  tags = tags.filter(a => tagsIds.indexOf(a.tagId) != -1)


  let header = this.props.state.funcs.loc().selectTags;

	let checkedVal = (a) => {
	  if (this.props.state.filterByTags.indexOf(a.tagId) != -1) {
	    return true
	  } else {
	    return false
	  }
	}

    return <div className="window" id="tagswindow">
	  <h2>{header}</h2>
    <div className="scrolled">
      {tags.map((a) => <div key={a.tagId} id={"t" + a.tagId} className="tagrow">
        <input type="checkbox" className="tagcheck" id={"tagcheck" + a.tagId} checked={checkedVal(a)} onChange={this.props.state.funcs.changeTag} />
      <span className="tagname" id={"tagname" + a.tagId}>{a.tagName}</span>
    </div>)}
    </div>

	  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">{this.props.state.funcs.loc().close}</button>
    <button onClick={this.props.state.funcs.clearSelectedTags} className="clearbutton">{this.props.state.funcs.loc().clear}</button>
    </div>
    }
  }
}




class SeriesWindow extends React.Component {
  render() {
  if (this.props.state.seriesWindowOpened == false) {
    return null;
  } else {
    let books = this.props.state.funcs.bookFilterFav(this.props.state.funcs.bookFilterRead(this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)))))
    let series = [...new Set(books.map(a => a.series))].filter(a => a != "")
    series = sort(series, cyrillic)
	let header = this.props.state.funcs.loc().selectSeries;

	let checkedVal = (a) => {
	  if (this.props.state.currentSeries == a) {
	    return true
	  } else {
	    return false
	  }
	}

    return <div className="window" id="serieswindow">
	  <h2>{header}</h2>
    <div className="scrolled">
      {series.map((a, i) => <div key={i} id={"s-" + a} className="seriesrow">
        <input type="checkbox" className="seriescheck" id={"seriescheck-" + a} checked={checkedVal(a)} onChange={this.props.state.funcs.changeSeries} />
      <span className="seriesname" id={"seriesname-" + a}>{a}</span>
    </div>)}
    </div>

	  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">{this.props.state.funcs.loc().close}</button>
    <button onClick={this.props.state.funcs.clearSelectedSeries} className="clearbutton">{this.props.state.funcs.loc().clear}</button>
    </div>
    }
  }
}


class AuthorsWindow extends React.Component {
  render() {
  if (this.props.state.authorsWindowOpened == false) {
    return null;
  } else {
    let books = this.props.state.funcs.bookFilterFav(this.props.state.funcs.bookFilterRead(this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)))))
    let authors = [...new Set(books.map(a => a.author))]
    authors = sort(authors, cyrillic)
	let header = this.props.state.funcs.loc().selectAuthor;

	let checkedVal = (a) => {
	  if (this.props.state.currentAuthor == a) {
	    return true
	  } else {
	    return false
	  }
	}

    return <div className="window" id="authorswindow">
	  <h2>{header}</h2>
    <div className="scrolled">
      {authors.map((a, i) => <div key={i} id={"a-" + a} className="authorrow">
        <input type="checkbox" className="authorcheck" id={"authorcheck-" + a} checked={checkedVal(a)} onChange={this.props.state.funcs.changeAuthor} />
      <span className="authorname" id={"authorname-" + a}>{a}</span>
    </div>)}
    </div>

	  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">{this.props.state.funcs.loc().close}</button>
    <button onClick={this.props.state.funcs.clearSelectedAuthors} className="clearbutton">{this.props.state.funcs.loc().clear}</button>
    </div>
    }
  }
}

module.exports.App = App;
