const { sort, cyrillic} = window.reqAppJs("sort.js");
const {bookFilter} = window.reqAppJs("bookfilter.js");

class SeriesWindow extends React.Component {

  changeSeries = (e) => {
    let state = this.props.state
    let funcs = state.funcs
    let seriesId = e.target.id.substr(12)
    let currentSeries = state.currentSeries
    if (e.target.checked == true) {
      currentSeries = seriesId;
      funcs.sortBySeriesNum()
    } else if (e.target.checked == false && currentSeries == seriesId) {
      currentSeries = undefined;
      funcs.sortByName()
    } else {return}
    funcs.setMainState({currentSeries, renderBookChunks: 1})
  }

  clearSelectedSeries = () => {
  this.props.state.funcs.setMainState({currentSeries: undefined, renderBookChunks: 1})
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.seriesWindowOpened == false) return null;
    else {

      let books = bookFilter(state, "series")

      let series = [...new Set(books.map(a => a.series))].filter(a => a != "")
      series = sort(series, cyrillic)

      const checkedVal = (a) => state.currentSeries == a

      return <div className="window" id="serieswindow">
	      <h2>{funcs.loc().selectSeries}</h2>
        <div className="scrolled">
          {series.map((a, i) => <div key={i} id={"s-" + a} className="seriesrow">
            <input type="checkbox" className="seriescheck" id={"seriescheck-" + a} checked={checkedVal(a)} onChange={this.changeSeries} />
            <span className="seriesname" id={"seriesname-" + a}>{a}</span>
          </div>)}
        </div>
	      <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
        <button onClick={this.clearSelectedSeries} className="clearbutton">{funcs.loc().clear}</button>
      </div>
    }
  }
}

module.exports.SeriesWindow = SeriesWindow;
