var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("bookfilter.js"),
    bookFilter = _window$reqAppJs.bookFilter;

var SelectButtons = function (_React$Component) {
  _inherits(SelectButtons, _React$Component);

  function SelectButtons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectButtons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectButtons.__proto__ || Object.getPrototypeOf(SelectButtons)).call.apply(_ref, [this].concat(args))), _this), _this.selectAllBooks = function () {
      var books = bookFilter(_this.props.state);
      var checkedBooks = books.map(function (a) {
        return a.bookId;
      });
      _this.props.state.funcs.setMainState({ checkedBooks: checkedBooks, allBooksSelected: 1, renderBookChunks: 1 });
    }, _this.clearSelectedBooks = function () {
      _this.props.state.funcs.setMainState({ checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1 });
    }, _this.selectTags = function () {
      _this.props.state.funcs.setMainState({ tagsWindowOpened: true, checkedBooks: [], allBooksSelected: -1 });
    }, _this.selectSeries = function () {
      _this.props.state.funcs.setMainState({ seriesWindowOpened: true, checkedBooks: [], allBooksSelected: -1 });
    }, _this.selectAuthor = function () {
      _this.props.state.funcs.setMainState({ authorsWindowOpened: true, checkedBooks: [], allBooksSelected: -1 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectButtons, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var styleFilter = function styleFilter(prop, value) {
        if (state[prop] != value) return { backgroundColor: "#ddd" };else return {};
      };

      var styleTagFilter = function styleTagFilter() {
        if (state.filterByTags.length != 0) return { backgroundColor: "#ddd" };else return {};
      };

      return React.createElement(
        "div",
        { id: "selectbuttons" },
        React.createElement(
          "button",
          { onClick: this.selectAllBooks },
          funcs.loc().selectAllBooks
        ),
        React.createElement(
          "button",
          { onClick: this.clearSelectedBooks },
          funcs.loc().clearSelected
        ),
        React.createElement(
          "button",
          { onClick: this.selectTags, style: styleTagFilter() },
          funcs.loc().filterByTags
        ),
        React.createElement(
          "button",
          { onClick: this.selectSeries, style: styleFilter("currentSeries", undefined) },
          funcs.loc().filterBySeries
        ),
        React.createElement(
          "button",
          { onClick: this.selectAuthor, style: styleFilter("currentAuthor", undefined) },
          funcs.loc().filterByAuthors
        )
      );
    }
  }]);

  return SelectButtons;
}(React.Component);

module.exports.SelectButtons = SelectButtons;