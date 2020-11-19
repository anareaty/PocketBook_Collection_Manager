const { sort, cyrillic} = window.reqAppJs("sort.js");
const {bookFilter} = window.reqAppJs("bookfilter.js");


class AuthorsWindow extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.authorsWindowOpened == false) return null
    else {

      let books = bookFilter(state, "authors")

      let authors = [...new Set(books.map(a => a.author))]
      authors = sort(authors, cyrillic)

	    let checkedVal = (a) => {
        if (state.currentAuthor == a) return true
        else return false
      }

    return <div className="window" id="authorswindow">
	    <h2>{funcs.loc().selectAuthor}</h2>
      <div className="scrolled">
        {authors.map((a, i) => <div key={i} id={"a-" + a} className="authorrow">
          <input type="checkbox" className="authorcheck" id={"authorcheck-" + a} checked={checkedVal(a)} onChange={funcs.changeAuthor} />
          <span className="authorname" id={"authorname-" + a}>{a}</span>
        </div>)}
      </div>
	    <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      <button onClick={funcs.clearSelectedAuthors} className="clearbutton">{funcs.loc().clear}</button>
    </div>
    }
  }
}


module.exports.AuthorsWindow = AuthorsWindow;
