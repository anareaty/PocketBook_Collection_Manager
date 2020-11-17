const {ShelfList} = window.reqAppJs("components/lists/shelf_list.js");


class ViewAllShelfs extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    return <div  className="view">
      <h1>{funcs.loc().allShelfs}</h1>
	    <div id="viewbuttons">
	      <button onClick={funcs.turnAllBooks}>{funcs.loc().allBooks}</button>
        <div>
          <input type="text" onChange={funcs.inputNewShelfName} value={state.newShelfName} placeholder={funcs.loc().newShelfName}/>
          <button id="addshelf" onClick={funcs.addNewShelf}>{funcs.loc().addShelf}</button>
        </div>
      </div>
      <ShelfList state={state}/>
    </div>
  }
}


module.exports.ViewAllShelfs = ViewAllShelfs;
