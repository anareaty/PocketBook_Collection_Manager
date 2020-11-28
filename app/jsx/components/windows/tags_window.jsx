const {bookFilter} = window.reqAppJs("bookfilter.js");

class TagsWindow extends React.Component {

  changeTag = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let tagId = Number(e.target.id.substr(8))
	  let includeTags = [...state.includeTags]
    let excludeTags = [...state.excludeTags]

    let indexIncluded = includeTags.indexOf(tagId)
    let indexExcluded = excludeTags.indexOf(tagId)

    if (indexIncluded != -1) {
      includeTags.splice(indexIncluded, 1)
      excludeTags.push(tagId)
    } else if (indexExcluded != -1) {
      excludeTags.splice(indexExcluded, 1)
    } else {
      includeTags.push(tagId)
    }

	  funcs.setMainState({includeTags, excludeTags, renderBookChunks: 1})
  }

  isTagSelected = (a) => {
    let state = this.props.state
	  let includeTags = state.includeTags
    let excludeTags = state.excludeTags

    if (includeTags.indexOf(a.tagId) != -1) {
      return "tagcheck fa fa-check-square-o"
    } else if (excludeTags.indexOf(a.tagId) != -1) {
      return "tagcheck fa fa-minus-square-o"
    } else {
      return "tagcheck fa fa-square-o"
    }
  }

  clearSelectedTags = () => {
  this.props.state.funcs.setMainState({includeTags: [], excludeTags: [], renderBookChunks: 1})
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.tagsWindowOpened == false) return null;
    else {
      let booksIds = bookFilter(state, "tags").map(a => a.bookId)
      let tagsIds = state.tagsInBooks.filter(a => booksIds.indexOf(a.bookId) != -1).map(a => a.tagId)
      let tags = state.tags.filter(a => tagsIds.indexOf(a.tagId) != -1)

      return <div className="window" id="tagswindow">
	      <h2>{funcs.loc().selectTags}</h2>
        <div className="scrolled">
          {tags.map((a) => <div key={a.tagId} id={"t" + a.tagId} className="tagrow">
            <span id={"tagcheck" + a.tagId} className={this.isTagSelected(a)} onClick={this.changeTag}></span>
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
