class BookList extends React.Component {
  render() {
    let state = this.props.state
    let funcs = state.funcs

    let books = funcs.bookFilterFav(
      funcs.bookFilterRead(
        funcs.bookFilterAuthor(
          funcs.bookFilterSeries(
            funcs.bookFilterTags(
              funcs.bookFilterShelfs(state.books))))))

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
