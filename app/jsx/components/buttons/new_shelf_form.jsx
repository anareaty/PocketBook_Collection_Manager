const { addNewShelfToDB, findLastShelfId } = window.reqAppJs("async.js");

class NewShelfForm extends React.Component {

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

    return <div id="newshelfform" class={this.props.class}>
      <input type="text" onChange={this.inputNewShelfName} value={state.newShelfName} placeholder={funcs.loc().newShelfName}/>
      <button id="addshelf" onClick={this.addNewShelf}>{funcs.loc().addShelf}</button>
    </div>
  }
}

module.exports.NewShelfForm = NewShelfForm;
