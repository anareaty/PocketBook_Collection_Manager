const { addSettingsToDB, updateSettingsInDB } = window.reqAppJs("async.js");

class ChangeButtons extends React.Component {

  changeSettingsAll = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let id = e.currentTarget.id
    let checkedBooks = state.checkedBooks
    let books = [...state.books]
    let booksSettings = [...state.booksSettings]
    checkedBooks.forEach((bookId) => {
      let book = books.find(a => a.bookId == bookId)
      if (id == "fav-all") {
        book.favorite = 1
      } else if (id =="unfav-all") {
        book.favorite = 0
      } else if (id =="complete-all") {
        book.completed = 1
      } else if (id =="uncomplete-all") {
        book.completed = 0
      }
      let bookInSettings = booksSettings.find(a => a.bookId == bookId)
      if (bookInSettings == undefined) {
        booksSettings.push({bookId, completed: book.completed, favorite: book.favorite})
        addSettingsToDB(bookId, book.completed, book.favorite)
      } else {
        bookInSettings.completed = book.completed;
        updateSettingsInDB(bookId, book.completed, book.favorite)
      }
    });
    funcs.setMainState({books, booksSettings, filterRead: 0, filterFav: 0, settingsUpdated: true})
    if (checkedBooks.length > 100) {
      funcs.setMainState({renderBookChunks: 1})
    }
  }

  render() {
    let state = this.props.state
    let funcs = state.funcs



    if (state.checkedBooks.length != 0) {
      const delText = () => {
        if (state.currentShelf == undefined || state.currentShelf == "noshelf" ) return funcs.loc().delFromShelf;
        else return funcs.loc().delFromAnotherShelf;
      }

      const delCurrent = () => {
        if (state.currentShelf != undefined && state.currentShelf != "noshelf") {
          return <button  id="delcurrent" onClick={funcs.delFromCurrent}>{funcs.loc().delFromThisShelf}</button>
        }
      }

      return <div id="changebuttons">
        <button id="add" onClick={funcs.selectChangeMethod}>{funcs.loc().addToShelf}</button>
        <button id="del" onClick={funcs.selectChangeMethod}>{delText()}</button>
	   	  {delCurrent()}
        <button id="fav-all" onClick={this.changeSettingsAll}><i className="fa fa-heart"></i></button>
        <button id="unfav-all" onClick={this.changeSettingsAll}><i className="fa fa-heart-o"></i></button>
        <button id="complete-all" onClick={this.changeSettingsAll}><i className="fa fa-check"></i></button>
        <button id="uncomplete-all" onClick={this.changeSettingsAll}><i className="fa fa-times"></i></button>
      </div>
    } else return null
  }
}

module.exports.ChangeButtons = ChangeButtons;
