const {ShelfWindow} = window.reqAppJs("components/windows/shelf_window.js");
const {MassShelfChangeWindow} = window.reqAppJs("components/windows/mass_shelf_change_window.js");
const {TagsWindow} = window.reqAppJs("components/windows/tags_window.js");
const {SeriesWindow} = window.reqAppJs("components/windows/series_window.js");
const {AuthorsWindow} = window.reqAppJs("components/windows/authors_window.js");

class AllWindows extends React.Component {
  render() {
    let state = this.props.state

    return <div id="allwindows">
      <ShelfWindow state={state}/>
      <MassShelfChangeWindow state={state}/>
      <TagsWindow state={state}/>
      <SeriesWindow state={state}/>
      <AuthorsWindow state={state}/>
    </div>
  }
}

module.exports.AllWindows = AllWindows;
