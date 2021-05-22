const { sortByProp, cyrillic } = window.reqAppJs("sort.js");

class TagList extends React.Component {

  turnTag = (e) => {
    let id = e.target.id
    if (id != "notag") {
      id = Number(e.target.id.substr(9));
    }
    this.props.state.funcs.setMainState({view: "books with tag", currentTag: id, currentBook: undefined, checkedBooks: [], allBooksSelected: -1, changeMethod: undefined})
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;
    tags = sortByProp(state.tags, "tagName", cyrillic)

    return <div>
      <button  id="notag" className="tagbutton" onClick={this.turnTag}>{funcs.loc().booksWithoutTags}</button>
      {tags.map((a) => <div key={a.tagId} id={"t" + a.tagId} className="tagrow">
        <button id={"tagbutton" + a.tagId} className="tagbutton" onClick={this.turnTag}>
          {a.tagName}
        </button>
      </div>)}
    </div>
  }
}

module.exports.TagList = TagList;
