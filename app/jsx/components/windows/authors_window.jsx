const { sort, cyrillic} = window.reqAppJs("sort.js");
const {bookFilter} = window.reqAppJs("bookfilter.js");


class AuthorsWindow extends React.Component {

  changeAuthor = (e) => {
    let state = this.props.state;
    let funcs = state.funcs;
    let authorId = e.target.id.substr(12)
    let currentAuthor = state.currentAuthor
    if (e.target.checked == true) {
      currentAuthor = authorId;
    } else if (e.target.checked == false && currentAuthor == authorId) {
      currentAuthor = undefined;
    } else {return}
    funcs.setMainState({currentAuthor, renderBookChunks: 1})
  }

  clearSelectedAuthors = () => {
  this.props.state.funcs.setMainState({currentAuthor: undefined, renderBookChunks: 1})
  }

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
          <input type="checkbox" className="authorcheck" id={"authorcheck-" + a} checked={checkedVal(a)} onChange={this.changeAuthor} />
          <span className="authorname" id={"authorname-" + a}>{a}</span>
        </div>)}
      </div>
	    <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      <button onClick={this.clearSelectedAuthors} className="clearbutton">{funcs.loc().clear}</button>
    </div>
    }
  }
}


module.exports.AuthorsWindow = AuthorsWindow;
