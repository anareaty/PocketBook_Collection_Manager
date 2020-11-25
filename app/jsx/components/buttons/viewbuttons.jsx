const { deleteShelfFromDB } = window.reqAppJs("async.js");

class ViewButtons extends React.Component {

  toggleFilterFav = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let id = e.currentTarget.id;
    let filterFav = state.filterFav;
    if (id == "favorite" && filterFav != 1) {
      filterFav = 1
    } else if (id == "non-favorite" && filterFav != -1) {
      filterFav = -1
    } else {
      filterFav = 0
    }
    funcs.setMainState({filterFav, checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1})
  }

  toggleFilterRead = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let id = e.currentTarget.id;
    let filterRead = state.filterRead;
    if (id == "completed" && filterRead != 1) {
      filterRead = 1
    } else if (id == "non-completed" && filterRead != -1) {
      filterRead = -1
    } else {
      filterRead = 0
    }
    funcs.setMainState({filterRead, checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1})
  }

  deleteShelf = () => {
    let state = this.props.state
    let funcs = state.funcs
    let shelfId = state.currentShelf;
    let shelfs = [...state.shelfs].filter(a => a.shelfId != shelfId);
    let booksOnShelfs = [...state.booksOnShelfs].filter(a => a.shelfId != shelfId);
    deleteShelfFromDB(shelfId)
    funcs.setMainState({shelfs, booksOnShelfs, currentShelf: undefined, checkedBooks: [], allBooksSelected: -1, filterByTags: [], view: "shelfs", currentSeries: undefined, currentAuthor: undefined})
  }

  turnAllShelfs = () => {
    this.props.state.funcs.setMainState({view: "shelfs", currentShelf: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0})
    this.props.state.funcs.sortByName()
  }

  render() {
    let state = this.props.state
    let funcs = state.funcs

    const deleteButton = () => {
      if (state.view == "books on shelf" && state.currentShelf != "noshelf") {
        return <button id="deleteshelf" onClick={this.deleteShelf}>{funcs.loc().deleteShelf}</button>
      } else return null;
    }

    const allBooksButton = () => {
      if (state.view == "books on shelf") {
        return <button onClick={funcs.turnAllBooks}>{funcs.loc().allBooks}</button>
      } else return null
    }

    let styleButton = (prop, value) => {
      if (state[prop] == value) return {backgroundColor: "#ddd"}
      else return {}
    }

    return <div id="viewbuttons">
        {allBooksButton()}
        <button onClick={this.turnAllShelfs}>{funcs.loc().allShelfs}</button>
        <div id="fav-and-read">
          <button id="favorite" style={styleButton("filterFav", 1)} onClick={this.toggleFilterFav}><i className="fa fa-heart"></i></button>
          <button id="non-favorite" style={styleButton("filterFav", -1)} onClick={this.toggleFilterFav}><i className="fa fa-heart-o"></i></button>
          <button id="completed" style={styleButton("filterRead", 1)} onClick={this.toggleFilterRead}><i className="fa fa-check"></i></button>
          <button id="non-completed" style={styleButton("filterRead", -1)} onClick={this.toggleFilterRead}><i className="fa fa-times"></i></button>
        </div>
        {deleteButton()}
      </div>
  }
}

module.exports.ViewButtons = ViewButtons;
