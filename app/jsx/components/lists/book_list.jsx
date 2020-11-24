const {bookFilter} = window.reqAppJs("bookfilter.js");
const {BookListChunk} = window.reqAppJs("components/lists/book_list_chunk.js");

class BookList extends React.Component {

  incrementChunks = () => {
    let maxChunks = bookFilter(this.props.state).length/30
    let renderBookChunks = this.props.state.renderBookChunks
    if (renderBookChunks < maxChunks) {
      this.props.state.funcs.setMainState({renderBookChunks: renderBookChunks + 1})
    }
  }

  componentDidMount() {
    let intervalId = setInterval(this.incrementChunks, 100);
    this.props.state.funcs.setMainState({intervalId: intervalId, intervalActive: true});
  }

  componentWillUnmount() {
    clearInterval(this.props.state.intervalId);
    this.props.state.funcs.setMainState({intervalActive: false});
  }

  componentDidUpdate() {
    let maxChunks = bookFilter(this.props.state).length/30
    let renderBookChunks = this.props.state.renderBookChunks
    if (renderBookChunks >= maxChunks && this.props.state.intervalActive === true) {
      clearInterval(this.props.state.intervalId);
      this.props.state.funcs.setMainState({intervalActive: false});
    } else if (renderBookChunks < maxChunks && this.props.state.intervalActive === false) {
      let intervalId = setInterval(this.incrementChunks, 100);
      this.props.state.funcs.setMainState({intervalId: intervalId, intervalActive: true});
    }
  }

  render() {
    let state = this.props.state
    let books = bookFilter(state)

    let chunks = []
    while (books.length > 0) {
      let chunk = books.splice(0, 30);
      chunks.push(chunk)
    }

    return <div id="booktable">
	    {chunks.map((a, i) => <BookListChunk booksChunk={a} key={i} index={i} state={state}/>)}
	  </div>
  }
}

module.exports.BookList = BookList;
