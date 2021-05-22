const { sortByProp, cyrillic } = window.reqAppJs("sort.js");

class ShelfList extends React.Component {

  turnShelf = (e) => {
    let id = e.target.id
    if (id != "noshelf") {
      id = Number(e.target.id.substr(11));
    }
    this.props.state.funcs.setMainState({view: "books on shelf", currentShelf: id, currentBook: undefined, checkedBooks: [], allBooksSelected: -1, changeMethod: undefined})
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;
    shelfs = sortByProp(state.shelfs, "shelfName", cyrillic)

    return <div>
      <button  id="noshelf" className="shelfbutton" onClick={this.turnShelf}>{funcs.loc().booksWithoutShelfs}</button>
      {shelfs.map((a) => <div key={a.shelfId} id={"s" + a.shelfId} className="shelfrow">
        <button id={"shelfbutton" + a.shelfId} className="shelfbutton" onClick={this.turnShelf}>
          {a.shelfName}
        </button>
      </div>)}
    </div>
  }
}

module.exports.ShelfList = ShelfList;
