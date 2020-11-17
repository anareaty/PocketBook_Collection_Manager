class ShelfList extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

  return <div>
    <button  id="noshelf" className="shelfbutton" onClick={funcs.turnShelf}>{funcs.loc().booksWithoutShelfs}</button>
    {state.shelfs.map((a) => <div key={a.shelfId} id={"s" + a.shelfId} className="shelfrow">
      <button id={"shelfbutton" + a.shelfId} className="shelfbutton" onClick={funcs.turnShelf}>
        {a.shelfName}
      </button>
    </div>)}
  </div>
}
}

module.exports.ShelfList = ShelfList;
