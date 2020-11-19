const {bookFilter} = window.reqAppJs("bookfilter.js");

class BookList extends React.Component {

  componentDidMount() {
    let length = this.props.state.books.length


    incr = () => {
      let renderListItems = this.props.state.renderListItems
      if (renderListItems < length) {
        this.props.state.funcs.setMainState({renderListItems: renderListItems + 100})
      }
    }

    let intervalId = setInterval(incr, 100);
    this.props.state.funcs.setMainState({intervalId: intervalId, intervalActive: true});
  }

  componentWillUnmount() {
    clearInterval(this.props.state.intervalId);
    this.props.state.funcs.setMainState({intervalActive: false});
  }

  componentDidUpdate() {
    let length = this.props.state.books.length
    let renderListItems = this.props.state.renderListItems
    if (renderListItems >= length && this.props.state.intervalActive === true) {
      clearInterval(this.props.state.intervalId);
      this.props.state.funcs.setMainState({intervalActive: false});
    } else if (renderListItems < length && this.props.state.intervalActive === false) {
      incr = () => {
        let renderListItems = this.props.state.renderListItems
        if (renderListItems < length) {
          this.props.state.funcs.setMainState({renderListItems: renderListItems + 100})
        }
      }
      let intervalId = setInterval(incr, 100);
      this.props.state.funcs.setMainState({intervalId: intervalId, intervalActive: true});
    }
  }

  render() {
    let state = this.props.state
    let funcs = state.funcs

    let books = bookFilter(state)
    books = books.slice(0, state.renderListItems)
    console.log(books.length)

    let checkedVal = (a) => {
	    if (state.checkedBooks.indexOf(a.bookId) != -1) return true
      else return false
	  }

    let isFavorite = (a) => {
	    if (a.favorite == 1) return "fa fa-heart"
      else return "fa fa-heart-o"
	  }

    let isCompleted = (a) => {
	    if (a.completed == 1) return "fa fa-check"
      else return "fa fa-times"
  	}

    const series = (a) => {
      if (a.numinseries != 0) {
        return <div className="series" id={"series" + a.bookId}>{"(" + a.series +" - "+ a.numinseries + ")"}</div>
      } else return null
    }



    return <div id="booktable">
	    {books.map((a) => <div key={a.bookId} id={"b" + a.bookId} className="bookrow">
        <div id={"completed" + a.bookId} onClick={funcs.toggleCompleted}><i className={isCompleted(a)}></i></div>
        <div id={"favorite" + a.bookId} onClick={funcs.toggleFavorite}><i className={isFavorite(a)}></i></div>
        <input type="checkbox" className="bookcheck" id={"bookcheck" + a.bookId} checked={checkedVal(a)} onChange={funcs.checkBook}/>
        <div id={"booksell" + a.bookId}>
          <div className="bookname" id={"bookname" + a.bookId}>{a.bookName}</div>
          {series(a)}
        </div>
        <div className="author" id={"author" + a.bookId}>{a.author}</div>
        <button className="bookbutton" id={"bookbutton" + a.bookId} onClick={funcs.openShelfsWindow}>{funcs.loc().shelfs}</button>
        <hr/>
	    </div>)}
	  </div>
  }
}

module.exports.BookList = BookList;
