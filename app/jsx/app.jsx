const {
  getFromDB,
  addBookToDB,
  removeBookFromDB,
  addNewShelfToDB,
  findLastShelfId,
  clearDB,
  deleteShelfFromDB,
  sortByProp,
  sortCyrillic
} = window.reqAppJs("async.js");


class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
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
	  filterByTags: [],
    currentSeries: undefined,
	  tagsWindowOpened: false,
    seriesWindowOpened: false,
    newShelfName: "",
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
	  closeAllWindows: this.closeAllWindows,
    delFromCurrent: this.delFromCurrent,
	  selectTags: this.selectTags,
	  changeTag: this.changeTag,
    addNewShelf: this.addNewShelf,
    inputNewShelfName: this.inputNewShelfName,
    deleteShelf: this.deleteShelf,
    selectSeries: this.selectSeries,
    changeSeries: this.changeSeries
	}
  };
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
    this.setState({shelfs, booksOnShelfs, currentShelf: undefined, checkedBooks: [], filterByTags: [], view: "shelfs", currentSeries: undefined})
  }

  addNewShelf = () => {
    let shelfs = [...this.state.shelfs]
    let shelfNames = shelfs.map(a => a.shelfName)
    newShelfName = this.state.newShelfName;

    if (newShelfName == "") {
      newShelfName = "Новая полка"
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
	  } else if (e.target.checked == false & currentSeries == seriesId) {
	    currentSeries = undefined;
	  } else {return}

	  this.setState({currentSeries})
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



  turnAllBooks = () => {
    this.setState({view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined})
  }

turnAllShelfs = () => {
      this.setState({view: "shelfs", currentShelf: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined})
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
    this.setState({currentBook: undefined, changeMethod: undefined, tagsWindowOpened: false, seriesWindowOpened: false})
  }



  componentDidMount() {
    clearDB().then(() => {
      getFromDB().then(({books, shelfs, booksOnShelfs, tags, tagsInBooks}) => {
        this.setState({books, shelfs, booksOnShelfs, tags, tagsInBooks, dbLoaded: true})
      })
    });

  }




  render() {
    if (this.state.dbLoaded == true) {
      if (this.state.view == "books") {
        return <ViewAllBooks state={this.state}/>
      } else if (this.state.view == "shelfs") {
        return <ViewAllShelfs  state={this.state} />
      } else {
        return <ViewBooksOnShelf state={this.state}/>
      }

    } else {
      return <h1>Загрузка...</h1>
    }





}
}

class ViewAllBooks extends React.Component {
  render() {
  return <div className="view">
    <h1>Все книги</h1>
	<div id="viewbuttons">
	  <ButtonAllShelfs state={this.props.state}/>
	</div>
    <BookList state={this.props.state}/>
  </div>
}
}

class ViewAllShelfs extends React.Component {
  render() {
  return <div  className="view">
    <h1>Все полки</h1>
	<div id="viewbuttons">
	  <ButtonAllBooks state={this.props.state}/>
    <div>
      <input type="text" onChange={this.props.state.funcs.inputNewShelfName} value={this.props.state.newShelfName} placeholder="Название новой полки"/>
      <button id="addshelf" onClick={this.props.state.funcs.addNewShelf}>Добавить полку</button>
    </div>

  </div>
    <ShelfList state={this.props.state}/>
  </div>
}
}

class ViewBooksOnShelf extends React.Component {
  render() {
  let state = this.props.state;
  let shelfName = "Книги без полок"
  if (state.currentShelf != "noshelf") {
    shelfName = state.shelfs.find((a) => a.shelfId == state.currentShelf).shelfName
  }
  return <div  className="view">
    <h1>{shelfName}</h1>
	<div id="viewbuttons">
	  <ButtonAllBooks state={this.props.state}/>
    <ButtonAllShelfs state={this.props.state}/>
    {(()=>{
      if (state.currentShelf != "noshelf") {
        return <button id="deleteshelf" onClick={state.funcs.deleteShelf}>Удалить полку</button>
      }
    })()}
	</div>
    <BookList state={this.props.state}/>
  </div>
}
}

class ButtonAllBooks extends React.Component {
  render() {
  return <button onClick={this.props.state.funcs.turnAllBooks}>Все книги</button>
}
}

class ButtonAllShelfs extends React.Component {
  render() {
  return <button onClick={this.props.state.funcs.turnAllShelfs}>Все полки</button>
}
}

class ChangeButtons extends React.Component {
  render() {
    if (this.props.state.checkedBooks.length != 0) {
	    let delText = "Удалить с полки";
      let currentShelf = this.props.state.currentShelf
	    if (currentShelf != undefined) {
	      delText = "Удалить с другой полки"
	    }

      return <div id="changebuttons">
        <button id="add" onClick={this.props.state.funcs.selectChangeMethod}>Добавить на полку</button>
        <button id="del" onClick={this.props.state.funcs.selectChangeMethod}>{delText}</button>
	   	  {(()=>{
		      if (currentShelf != undefined & currentShelf != "noshelf") {
		        return <button  id="delcurrent" onClick={this.props.state.funcs.delFromCurrent}>Удалить с этой полки</button>
		      }
		    })()}
      </div>
    } else {return <div/>}
  }
}



class BookList extends React.Component {
  render() {

  let books = this.props.state.books;
  let booksOnShelfs = this.props.state.booksOnShelfs;
  let shelfId = this.props.state.currentShelf
  if (shelfId != undefined) {

    if (shelfId == "noshelf") {
      let booksWithShelfs = booksOnShelfs.map(a => a.bookId)
      books = books.filter(a => booksWithShelfs.indexOf(a.bookId) == -1)
    } else {
      books = books.filter((a) => this.props.state.funcs.isBookOnShelf(a.bookId, shelfId) == true)
    }

  }

  let filterByTags = this.props.state.filterByTags

  if (filterByTags.length != 0) {
    let tagsInBooks = this.props.state.tagsInBooks

	  for (let i=0; i<filterByTags.length; i++) {
	    let tag = filterByTags[i]

	    let booksInTag = tagsInBooks.filter(a => a.tagId == tag).map(a => a.bookId)

      books = books.filter(a => booksInTag.indexOf(a.bookId) != -1)

	  }
  }

  let currentSeries = this.props.state.currentSeries
  if (currentSeries != undefined) {
    books = sortByProp(books.filter(a => a.series == currentSeries), "numinseries")
  }


  let checkedVal = (a) => {
	  if (this.props.state.checkedBooks.indexOf(a.bookId) != -1) {
	    return true
	  } else {
	    return false
	  }
	}

  return <div>
    <div id="selectbuttons">
	  <button onClick={this.props.state.funcs.selectAllBooks}>Выбрать все книги</button>
	  <button onClick={this.props.state.funcs.clearSelectedBooks}>Очистить выбранные</button>
	  <button onClick={this.props.state.funcs.selectTags}>Фильтр по тегам</button>
    <button onClick={this.props.state.funcs.selectSeries}>Фильтр по сериям</button>
	</div>

    <div id="booktable">
	  {books.map((a) => <div key={a.bookId} id={"b" + a.bookId} className="bookrow">
        <input type="checkbox" className="bookcheck" id={"bookcheck" + a.bookId} checked={checkedVal(a)} onChange={this.props.state.funcs.checkBook}/>
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
        <button className="bookbutton" id={"bookbutton" + a.bookId} onClick={this.props.state.funcs.openShelfsWindow}>Полки</button>
        <hr/>
	  </div>)}

	</div>

  <ChangeButtons state={this.props.state}/>
  <ShelfWindow state={this.props.state}/>
  <MassShelfChangeWindow state={this.props.state}/>
  <TagsWindow state={this.props.state}/>
  <SeriesWindow state={this.props.state}/>


  </div>

}
}

class ShelfList extends React.Component {
  render() {
  return <div>
    <button  id="noshelf" className="shelfbutton" onClick={this.props.state.funcs.turnShelf}>Книги без полок</button>
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
	let header = "Редактировать коллекции для книги " + bookName;

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

  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">Закрыть</button>
  </div>
  }
}
}

class MassShelfChangeWindow extends React.Component {
  render() {
    if (this.props.state.changeMethod != undefined & this.props.state.checkedBooks.length != 0) {

	  let header;
	  if (this.props.state.changeMethod == "add") {
	    header = "Добавить на полку"
	  } else {
	    header = "Удалить с полки"
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

		<button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">Закрыть</button>
      </div>
	} else {
	  return <div/>
	}
  }
}

class TagsWindow extends React.Component {
  render() {

  let tags = this.props.state.tags;

  if (this.props.state.tagsWindowOpened == false) {
    return <div/>
  } else {
	let header = "Выбрать теги";

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

	  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">Закрыть</button>
    </div>
    }
  }
}




class SeriesWindow extends React.Component {
  render() {



  if (this.props.state.seriesWindowOpened == false) {
    return <div/>;
  } else {
    let books = this.props.state.books;
    let series = [...new Set(books.map(a => a.series))].filter(a => a != "")
    series = sortCyrillic(series)
	let header = "Выбрать серию";

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

	  <button onClick={this.props.state.funcs.closeAllWindows} className="closebutton">Закрыть</button>
    </div>
    }
  }
}

module.exports.App = App;
