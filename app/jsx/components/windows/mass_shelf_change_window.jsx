class MassShelfChangeWindow extends React.Component {

  massChange = (e) => {
    let state = this.props.state;
    let funcs = state.funcs;
    let shelfId = Number(e.target.id.substr(17));
    let booksOnShelfs = [...state.booksOnShelfs];
	  let checkedBooks = state.checkedBooks;
	  let changeMethod = state.changeMethod;
    let currentShelf = state.currentShelf
	  for (let i=0; i<checkedBooks.length; i++) {
	    booksOnShelfs = funcs.changeBook(booksOnShelfs, checkedBooks[i], shelfId, changeMethod)
	  }
    if (currentShelf == "noshelf" && changeMethod == "add") {
      checkedBooks = [];
    }
	  funcs.setMainState({booksOnShelfs, checkedBooks, changeMethod: undefined});
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.changeMethod != undefined) {

      const header = () => {
        if (state.changeMethod == "add") return funcs.loc().addToShelf
        else return funcs.loc().delFromShelf
      }

	    let shelfs = state.shelfs.filter(a => a.shelfId != state.currentShelf)

	    return <div className="window">
	      <h2>{header()}</h2>
        <div className="scrolled">
          {shelfs.map((a) => <div key={a.shelfId} id={"msc" + a.shelfId} className="shelfchangerow">
            <button id={"shelfchangebutton" + a.shelfId} className="shelfchangebutton" onClick={this.massChange}>{a.shelfName}</button>
          </div>)}
        </div>
		    <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      </div>
	  } else return null
  }
}

module.exports.MassShelfChangeWindow = MassShelfChangeWindow;
