const {ShelfList} = window.reqAppJs("components/lists/shelf_list.js");
const { addNewShelfToDB, findLastShelfId } = window.reqAppJs("async.js");


class ViewAllShelfs extends React.Component {

  addNewShelf = () => {
    let state = this.props.state
    let funcs = state.funcs
    let shelfs = [...state.shelfs]
    let shelfNames = shelfs.map(a => a.shelfName)
    newShelfName = state.newShelfName;
    if (newShelfName == "") {
      newShelfName = funcs.loc().newShelf
    }
    if (shelfNames.indexOf(newShelfName) != -1) {
      let nameStart = newShelfName;
      let num = 0;
      while (shelfNames.indexOf(newShelfName) != -1) {
        num++;
        newShelfName = nameStart + " (" + num + ")";
      }
    }
    findLastShelfId().then((lastId) => {
      newShelfId = lastId + 1;
      let newShelf = {shelfId: newShelfId, shelfName: newShelfName}
      shelfs.push(newShelf)
      funcs.setMainState({shelfs, newShelfName: ""})
      addNewShelfToDB(newShelfName, newShelfId)
    })
  }

  inputNewShelfName = (e) => {
    this.props.state.funcs.setMainState({newShelfName: e.target.value})
  }


  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    return <div  className="view">
      <h1>{funcs.loc().allShelfs}</h1>
	    <div id="viewbuttons">
	      <button onClick={funcs.turnAllBooks}>{funcs.loc().allBooks}</button>
        <div>
          <input type="text" onChange={this.inputNewShelfName} value={state.newShelfName} placeholder={funcs.loc().newShelfName}/>
          <button id="addshelf" onClick={this.addNewShelf}>{funcs.loc().addShelf}</button>
        </div>
      </div>
      <ShelfList state={state}/>
    </div>
  }
}


module.exports.ViewAllShelfs = ViewAllShelfs;
