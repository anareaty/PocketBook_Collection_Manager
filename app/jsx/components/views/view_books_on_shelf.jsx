const {BookList} = window.reqAppJs("components/lists/book_list.js");
const {MenuButtons} = window.reqAppJs("components/buttons/menu_buttons.js");
const {ChangeButtons} = window.reqAppJs("components/buttons/change_buttons.js");
const {AllWindows} = window.reqAppJs("components/windows/all_windows.js");


class ViewBooksOnShelf extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    const shelfName = () => {
      if (state.currentShelf != "noshelf") {
        return state.shelfs.find((a) => a.shelfId == state.currentShelf).shelfName
      } else {
        return funcs.loc().booksWithoutShelfs;
      }
    }

    return <div  className="view">
      <h1>{shelfName()}</h1>
      <MenuButtons state={state}/>
      <BookList state={state}/>
      <ChangeButtons state={state}/>
      <AllWindows state={state}/>
    </div>
  }
}


module.exports.ViewBooksOnShelf = ViewBooksOnShelf;
