const { addSettingsToDB, updateSettingsInDB } = window.reqAppJs("async.js");

class BookRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {checked: false}
  }

  componentDidMount() {
    let book = this.props.book
    this.setState({favorite: book.favorite, completed: book.completed})
  }

  componentDidUpdate() {
    console.log("update")
    let state = this.props.state
    if (state.allBooksSelected == 1 && this.state.checked == false) {
      this.setState({checked: true})
    } else if (state.allBooksSelected == -1 && this.state.checked == true) {
      this.setState({checked: false})
    }
    let book = this.props.book
    let bookId = book.bookId
    let newBook = state.books.find(a => a.bookId == bookId)
    if (this.state.favorite != newBook.favorite || this.state.completed != newBook.completed) {
      this.setState({favorite: book.favorite, completed: book.completed})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let bookId = this.props.book.bookId
    let nextBook = nextProps.state.books.find(a => a.bookId == bookId)
    if (this.state.favorite != nextBook.favorite) return true
    else if (this.state.completed != nextBook.completed) return true
    else if (this.props.state.allBooksSelected != nextProps.state.allBooksSelected) return true
    else if (this.state != nextState) return true
    else return false
  }

  toggleSettings = (e) => {
    let state = this.props.state.funcs.getMainState()
    let id = e.currentTarget.id
    let setting = "favorite"
    if (/completed/.test(id)) setting = "completed"

    let book = this.props.book
    let bookId = book.bookId
    let booksSettings = [...state.booksSettings]
    let books = [...state.books]

    if (book[setting] == 1) book[setting] = 0
    else book[setting] = 1

    let bookInSettings = booksSettings.find(a => a.bookId == bookId)
    if (bookInSettings == undefined) {
      booksSettings.push({bookId, completed: book.completed, favorite: book.favorite})
      addSettingsToDB(bookId, book.completed, book.favorite)
    } else {
      bookInSettings[setting] = book[setting];
      updateSettingsInDB(bookId, book.completed, book.favorite)
    }

    this.props.state.funcs.setMainState({books, booksSettings})
    this.setState({completed: book.completed, favorite: book.favorite})
  }


  checkBook = (e) => {
    let id = this.props.book.bookId
    let state = this.props.state.funcs.getMainState()
    let checkedBooks = [...state.checkedBooks]
    let findChecked = checkedBooks.find(a => a == id)
    let checked;
    if (e.target.checked == true && findChecked == undefined) {
      checkedBooks.push(id)
      checked = true;
    } else if (e.target.checked == false && findChecked != undefined) {
      let index = checkedBooks.indexOf(id)
      checkedBooks.splice(index, 1)
      checked = false;
    } else {return}
    this.props.state.funcs.setMainState({checkedBooks, changeMethod: undefined, allBooksSelected: 0})
    this.setState({checked})
  }

  checkedVal = () => {
    return this.state.checked
  }

  isFavorite = () => {
    if (this.state.favorite == 1) return "fa fa-heart"
    else return "fa fa-heart-o"
  }

  isCompleted = () => {
    if (this.state.completed == 1) return "fa fa-check"
    else return "fa fa-times"
  }

  series = (a) => {
    if (a.numinseries != 0) {
      return <div className="series" id={"series" + a.bookId}>{"(" + a.series +" - "+ a.numinseries + ")"}</div>
    } else return null
  }


  render() {
    let state = this.props.state;
    let funcs = state.funcs;
    let book = this.props.book
    let { bookId, bookName, author } = book

    return <div key={bookId} id={"b" + bookId} className="bookrow">
      <div id={"completed" + bookId} onClick={this.toggleSettings}><i className={this.isCompleted()}></i></div>
      <div id={"favorite" + bookId} onClick={this.toggleSettings}><i className={this.isFavorite()}></i></div>
      <input type="checkbox" className="bookcheck" id={"bookcheck" + bookId} checked={this.checkedVal()} onChange={this.checkBook}/>
      <div id={"booksell" + bookId}>
        <div className="bookname" id={"bookname" + bookId}>{bookName}</div>
        {this.series(book)}

      </div>
      <div className="author" id={"author" + bookId}>{author}</div>
      <button className="bookbutton" id={"bookbutton" + bookId} onClick={funcs.openShelfsWindow}>{funcs.loc().shelfs}</button>
      <hr/>
    </div>
  }
}

module.exports.BookRow = BookRow;
