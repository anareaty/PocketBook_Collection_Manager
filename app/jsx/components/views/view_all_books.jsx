const {BookList} = window.reqAppJs("components/lists/book_list.js");
const {ChangeButtons} = window.reqAppJs("components/buttons/change_buttons.js");
const {MenuButtons} = window.reqAppJs("components/buttons/menu_buttons.js");
const {AllWindows} = window.reqAppJs("components/windows/all_windows.js");


class ViewAllBooks extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    return <div className="view">
      <h1>{state.funcs.loc().allBooks}</h1>
      <MenuButtons state={state}/>
      <BookList state={state}/>
      <ChangeButtons state={state}/>
      <AllWindows state={state}/>
    </div>
  }
}


module.exports.ViewAllBooks = ViewAllBooks;
