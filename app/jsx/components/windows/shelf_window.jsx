const {NewShelfForm} = window.reqAppJs("components/buttons/new_shelf_form.js");

class ShelfWindow extends React.Component {

  changeOne = (e) => {
    let state = this.props.state;
    let funcs = state.funcs;
    let shelfId = Number(e.target.id.substr(10));
    let booksOnShelfs = [...state.booksOnShelfs];
    let bookId = state.currentBook;
    let method = "add";
    if (e.target.checked == false) {
      method = "del";
    }
    booksOnShelfs = funcs.changeBook(booksOnShelfs, bookId, shelfId, method);
    funcs.setMainState({booksOnShelfs});
}

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.currentBook == undefined) return null;
    else {

	    let bookName = state.books.find(a => a.bookId == state.currentBook).bookName;
	    let header = bookName + " " + funcs.loc().changeShelfsForBook;

	    const checkedVal = (a) => funcs.isBookOnShelf(state.currentBook, a.shelfId)

      return <div className="window" id="shelfwindow">
        <h3>{header}</h3>

        <div className="scrolled">
          {state.shelfs.map((a) => <div key={a.shelfId} id={"sb" + a.shelfId} className="shelfinbookrow">
            <input type="checkbox" className="shelfcheck" id={"shelfcheck" + a.shelfId} checked={checkedVal(a)} onChange={this.changeOne} />
            <span className="shelfinbookname" id={"shelfinbookname" + a.shelfId}>{a.shelfName}</span>
          </div>)}
          <NewShelfForm state={state}  class="new-shelf-form-in-window"/>
        </div>
        <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      </div>
    }
  }
}

module.exports.ShelfWindow = ShelfWindow;
