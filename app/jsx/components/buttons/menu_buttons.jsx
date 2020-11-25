const {ViewButtons} = window.reqAppJs("components/buttons/viewbuttons.js");
const {SelectButtons} = window.reqAppJs("components/buttons/selectbuttons.js");
const {SortButtons} = window.reqAppJs("components/buttons/sortbuttons.js");

class MenuButtons extends React.Component {
  render() {
    let state = this.props.state

    return <div id="menubuttons">
      <ViewButtons state={state}/>
      <SelectButtons state={state}/>
      <SortButtons state={state}/>
    </div>
  }
}

module.exports.MenuButtons = MenuButtons;
