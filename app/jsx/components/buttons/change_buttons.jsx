class ChangeButtons extends React.Component {
  render() {
    let state = this.props.state
    let funcs = state.funcs

    if (state.checkedBooks.length != 0) {
      const delText = () => {
        if (state.currentShelf == undefined || state.currentShelf == "noshelf" ) return funcs.loc().delFromShelf;
        else return funcs.loc().delFromAnotherShelf;
      }

      const delCurrent = () => {
        if (state.currentShelf != undefined && state.currentShelf != "noshelf") {
          return <button  id="delcurrent" onClick={funcs.delFromCurrent}>{funcs.loc().delFromThisShelf}</button>
        }
      }

      return <div id="changebuttons">
        <button id="add" onClick={funcs.selectChangeMethod}>{funcs.loc().addToShelf}</button>
        <button id="del" onClick={funcs.selectChangeMethod}>{delText()}</button>
	   	  {delCurrent()}
        <button id="fav-all" onClick={funcs.changeSettingsAll}><i className="fa fa-heart"></i></button>
        <button id="unfav-all" onClick={funcs.changeSettingsAll}><i className="fa fa-heart-o"></i></button>
        <button id="complete-all" onClick={funcs.changeSettingsAll}><i className="fa fa-check"></i></button>
        <button id="uncomplete-all" onClick={funcs.changeSettingsAll}><i className="fa fa-times"></i></button>
      </div>
    } else return null
  }
}

module.exports.ChangeButtons = ChangeButtons;
