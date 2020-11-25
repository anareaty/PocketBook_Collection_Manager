const { sortByProp, cyrillic } = window.reqAppJs("sort.js");

class SortButtons extends React.Component {

  sortByAuthor = () => {
    let books = [...this.props.state.books]
    let sort = "author"
    books = sortByProp(books, "author", cyrillic)
    this.props.state.funcs.setMainState({books, sort, renderBookChunks: 1})
  }

  render() {
    let state = this.props.state
    let funcs = state.funcs

    let styleButton = (prop, value) => {
      if (state[prop] == value) return {backgroundColor: "#ddd"}
      else return {}
    }

    return <div id="sortbuttons">
        <span>{funcs.loc().sort}</span>
        <button onClick={funcs.sortByName} style={styleButton("sort", "name")}>{funcs.loc().byName}</button>
        <button onClick={this.sortByAuthor} style={styleButton("sort", "author")}>{funcs.loc().byAuthor}</button>
        <button onClick={funcs.sortBySeriesNum} style={styleButton("sort", "series number")}>{funcs.loc().byNumInSeries}</button>
      </div>
  }
}

module.exports.SortButtons = SortButtons;
