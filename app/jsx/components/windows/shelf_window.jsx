class ShelfWindow extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.currentBook == undefined) return null;
    else {

	    let bookName = state.books.find(a => a.bookId == state.currentBook).bookName;
	    let header = funcs.loc().changeShelfsForBook + bookName;

	    const checkedVal = (a) => funcs.isBookOnShelf(state.currentBook, a.shelfId)

      return <div className="window" id="shelfwindow">
        <h2>{header}</h2>
        <div className="scrolled">
          {state.shelfs.map((a) => <div key={a.shelfId} id={"sb" + a.shelfId} className="shelfinbookrow">
            <input type="checkbox" className="shelfcheck" id={"shelfcheck" + a.shelfId} checked={checkedVal(a)} onChange={funcs.changeOne} />
            <span className="shelfinbookname" id={"shelfinbookname" + a.shelfId}>{a.shelfName}</span>
          </div>)}
        </div>
        <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      </div>
    }
  }
}

module.exports.ShelfWindow = ShelfWindow;
