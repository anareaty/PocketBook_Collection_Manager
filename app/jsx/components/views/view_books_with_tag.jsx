const {BookList} = window.reqAppJs("components/lists/book_list.js");
const {MenuButtons} = window.reqAppJs("components/buttons/menu_buttons.js");
const {ChangeButtons} = window.reqAppJs("components/buttons/change_buttons.js");
const {AllWindows} = window.reqAppJs("components/windows/all_windows.js");


class ViewBooksWithTag extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    const tagName = () => {
      if (state.currentTag != "notag") {
        return state.tags.find((a) => a.tagId == state.currentTag).tagName
      } else {
        return funcs.loc().booksWithoutTags;
      }
    }

    return <div  className="view">
      <h1>{tagName()}</h1>
      <MenuButtons state={state}/>
      <BookList state={state}/>
      <ChangeButtons state={state}/>
      <AllWindows state={state}/>
    </div>
  }
}


module.exports.ViewBooksWithTag = ViewBooksWithTag;
