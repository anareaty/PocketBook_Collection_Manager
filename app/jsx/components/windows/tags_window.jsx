const {bookFilter} = window.reqAppJs("bookfilter.js");

class TagsWindow extends React.Component {

  changeTag = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let tagId = Number(e.target.id.substr(8))
	  let filterByTags = [...state.filterByTags]
	  if (e.target.checked == true && filterByTags.indexOf(tagId) == -1) {
	    filterByTags.push(tagId)
	  } else if (e.target.checked == false && filterByTags.indexOf(tagId) != -1) {
	    let index = filterByTags.indexOf(tagId)
        filterByTags.splice(index, 1)
	  } else {return}
	  funcs.setMainState({filterByTags, renderBookChunks: 1})
  }

  clearSelectedTags = () => {
  this.props.state.funcs.setMainState({filterByTags: [], renderBookChunks: 1})
  }

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
            <input type="checkbox" className="tagcheck" id={"tagcheck" + a.tagId} checked={checkedVal(a)} onChange={this.changeTag}/>
            <span className="tagname" id={"tagname" + a.tagId}>{a.tagName}</span>
          </div>)}
        </div>
	      <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
        <button onClick={this.clearSelectedTags} className="clearbutton">{funcs.loc().clear}</button>
      </div>
    }
  }
}

module.exports.TagsWindow = TagsWindow;
