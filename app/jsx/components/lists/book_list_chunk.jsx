const {BookRow} = window.reqAppJs("components/lists/bookrow.js");

class BookListChunk extends React.Component {

  render() {
    let state = this.props.state
    let booksChunk = this.props.booksChunk
    let index = this.props.index
    let renderBookChunks = state.renderBookChunks

    if (renderBookChunks < index) {
      return null;
    } else {
      return <React.Fragment>
  	    {booksChunk.map((a) => <BookRow book={a} key={a.bookId} state={state}/>)}
  	  </React.Fragment>
    }
  }
}

module.exports.BookListChunk = BookListChunk;
