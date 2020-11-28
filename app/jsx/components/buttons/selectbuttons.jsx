const {bookFilter} = window.reqAppJs("bookfilter.js");

class SelectButtons extends React.Component {

  selectAllBooks = () => {
    let books = bookFilter(this.props.state)
    let checkedBooks = books.map(a => a.bookId)
	  this.props.state.funcs.setMainState({checkedBooks, allBooksSelected: 1, renderBookChunks: 1})
  }

  clearSelectedBooks = () => {
  this.props.state.funcs.setMainState({checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1})
  }

  selectTags = () => {
    this.props.state.funcs.setMainState({tagsWindowOpened: true, checkedBooks: [], allBooksSelected: -1})
  }

  selectSeries = () => {
    this.props.state.funcs.setMainState({seriesWindowOpened: true, checkedBooks: [], allBooksSelected: -1})
  }

  selectAuthor = () => {
    this.props.state.funcs.setMainState({authorsWindowOpened: true, checkedBooks: [], allBooksSelected: -1})
  }

  render() {
    let state = this.props.state
    let funcs = state.funcs

    let styleFilter = (prop, value) => {
      if (state[prop] != value) return {backgroundColor: "#ddd"}
      else return {}
    }

    let styleTagFilter = () => {
      if (state.includeTags.length != 0 || state.excludeTags.length != 0 ) return {backgroundColor: "#ddd"}
      else return {}
    }

    return <div id="selectbuttons">
        <button onClick={this.selectAllBooks}>{funcs.loc().selectAllBooks}</button>
        <button onClick={this.clearSelectedBooks}>{funcs.loc().clearSelected}</button>
        <button onClick={this.selectTags} style={styleTagFilter()}>{funcs.loc().filterByTags}</button>
        <button onClick={this.selectSeries} style={styleFilter("currentSeries", undefined)}>{funcs.loc().filterBySeries}</button>
        <button onClick={this.selectAuthor} style={styleFilter("currentAuthor", undefined)}>{funcs.loc().filterByAuthors}</button>
      </div>
  }
}

module.exports.SelectButtons = SelectButtons;
