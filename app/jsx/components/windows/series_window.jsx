const { sort, cyrillic} = window.reqAppJs("sort.js");

class SeriesWindow extends React.Component {
  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.seriesWindowOpened == false) return null;
    else {

      let books = funcs.bookFilterFav(
        funcs.bookFilterRead(
          funcs.bookFilterAuthor(
            funcs.bookFilterTags(
              funcs.bookFilterShelfs(state.books)))))

      let series = [...new Set(books.map(a => a.series))].filter(a => a != "")
      series = sort(series, cyrillic)

      const checkedVal = (a) => state.currentSeries == a

      return <div className="window" id="serieswindow">
	      <h2>{funcs.loc().selectSeries}</h2>
        <div className="scrolled">
          {series.map((a, i) => <div key={i} id={"s-" + a} className="seriesrow">
            <input type="checkbox" className="seriescheck" id={"seriescheck-" + a} checked={checkedVal(a)} onChange={funcs.changeSeries} />
            <span className="seriesname" id={"seriesname-" + a}>{a}</span>
          </div>)}
        </div>
	      <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
        <button onClick={funcs.clearSelectedSeries} className="clearbutton">{funcs.loc().clear}</button>
      </div>
    }
  }
}

module.exports.SeriesWindow = SeriesWindow;
