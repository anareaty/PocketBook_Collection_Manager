class MenuButtons extends React.Component {
  render() {
    let state = this.props.state
    let funcs = state.funcs

    const deleteButton = () => {
      if (state.view == "books on shelf" && state.currentShelf != "noshelf") {
        return <button id="deleteshelf" onClick={funcs.deleteShelf}>{funcs.loc().deleteShelf}</button>
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

    let styleFilter = (prop, value) => {
      if (state[prop] != value) return {backgroundColor: "#ddd"}
      else return {}
    }

    let styleTagFilter = () => {
      if (state.filterByTags.length != 0) return {backgroundColor: "#ddd"}
      else return {}
    }

    return <div id="menubuttons">
      <div id="viewbuttons">
        {allBooksButton()}
        <button onClick={funcs.turnAllShelfs}>{funcs.loc().allShelfs}</button>
        <div id="fav-and-read">
          <button id="favorite" style={styleButton("filterFav", 1)} onClick={funcs.toggleFilterFav}><i className="fa fa-heart"></i></button>
          <button id="non-favorite" style={styleButton("filterFav", -1)} onClick={funcs.toggleFilterFav}><i className="fa fa-heart-o"></i></button>
          <button id="completed" style={styleButton("filterRead", 1)} onClick={funcs.toggleFilterRead}><i className="fa fa-check"></i></button>
          <button id="non-completed" style={styleButton("filterRead", -1)} onClick={funcs.toggleFilterRead}><i className="fa fa-times"></i></button>
        </div>
        {deleteButton()}
      </div>
      
      <div id="selectbuttons">
        <button onClick={funcs.selectAllBooks}>{funcs.loc().selectAllBooks}</button>
        <button onClick={funcs.clearSelectedBooks}>{funcs.loc().clearSelected}</button>
        <button onClick={funcs.selectTags} style={styleTagFilter()}>{funcs.loc().filterByTags}</button>
        <button onClick={funcs.selectSeries} style={styleFilter("currentSeries", undefined)}>{funcs.loc().filterBySeries}</button>
        <button onClick={funcs.selectAuthor} style={styleFilter("currentAuthor", undefined)}>{funcs.loc().filterByAuthors}</button>
      </div>

      <div id="sortbuttons">
        <span>{funcs.loc().sort}</span>
        <button onClick={funcs.sortByName} style={styleButton("sort", "name")}>{funcs.loc().byName}</button>
        <button onClick={funcs.sortByAuthor} style={styleButton("sort", "author")}>{funcs.loc().byAuthor}</button>
        <button onClick={funcs.sortBySeriesNum} style={styleButton("sort", "series number")}>{funcs.loc().byNumInSeries}</button>
      </div>
    </div>
  }
}

module.exports.MenuButtons = MenuButtons;
