const {bookFilter} = window.reqAppJs("bookfilter.js");

class TagsWindow extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.tagsWindowOpened == false) return null;
    else {

      let booksIds = bookFilter(state, "tags").map(a => a.bookId)

      let tagsIds = state.tagsInBooks.filter(a => booksIds.indexOf(a.bookId) != -1).map(a => a.tagId)
      let tags = state.tags.filter(a => tagsIds.indexOf(a.tagId) != -1)

	    const checkedVal = (a) => state.filterByTags.indexOf(a.tagId) != -1

      return <div className="window" id="tagswindow">
	      <h2>{funcs.loc().selectTags}</h2>
        <div className="scrolled">
          {tags.map((a) => <div key={a.tagId} id={"t" + a.tagId} className="tagrow">
            <input type="checkbox" className="tagcheck" id={"tagcheck" + a.tagId} checked={checkedVal(a)} onChange={funcs.changeTag}/>
            <span className="tagname" id={"tagname" + a.tagId}>{a.tagName}</span>
          </div>)}
        </div>
	      <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
        <button onClick={funcs.clearSelectedTags} className="clearbutton">{funcs.loc().clear}</button>
      </div>
    }
  }
}

module.exports.TagsWindow = TagsWindow;
