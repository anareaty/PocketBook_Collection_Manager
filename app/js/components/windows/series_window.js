var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("sort.js"),
    sort = _window$reqAppJs.sort,
    cyrillic = _window$reqAppJs.cyrillic;

var _window$reqAppJs2 = window.reqAppJs("bookfilter.js"),
    bookFilter = _window$reqAppJs2.bookFilter;

var SeriesWindow = function (_React$Component) {
  _inherits(SeriesWindow, _React$Component);

  function SeriesWindow() {
    _classCallCheck(this, SeriesWindow);

    return _possibleConstructorReturn(this, (SeriesWindow.__proto__ || Object.getPrototypeOf(SeriesWindow)).apply(this, arguments));
  }

  _createClass(SeriesWindow, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      if (state.seriesWindowOpened == false) return null;else {

        var books = bookFilter(state, "series");

        var series = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.series;
        })))).filter(function (a) {
          return a != "";
        });
        series = sort(series, cyrillic);

        var checkedVal = function checkedVal(a) {
          return state.currentSeries == a;
        };

        return React.createElement(
          "div",
          { className: "window", id: "serieswindow" },
          React.createElement(
            "h2",
            null,
            funcs.loc().selectSeries
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            series.map(function (a, i) {
              return React.createElement(
                "div",
                { key: i, id: "s-" + a, className: "seriesrow" },
                React.createElement("input", { type: "checkbox", className: "seriescheck", id: "seriescheck-" + a, checked: checkedVal(a), onChange: funcs.changeSeries }),
                React.createElement(
                  "span",
                  { className: "seriesname", id: "seriesname-" + a },
                  a
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: funcs.closeAllWindows, className: "closebutton" },
            funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: funcs.clearSelectedSeries, className: "clearbutton" },
            funcs.loc().clear
          )
        );
      }
    }
  }]);

  return SeriesWindow;
}(React.Component);

module.exports.SeriesWindow = SeriesWindow;