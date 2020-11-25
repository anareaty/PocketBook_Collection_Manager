var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("sort.js"),
    sortByProp = _window$reqAppJs.sortByProp,
    cyrillic = _window$reqAppJs.cyrillic;

var SortButtons = function (_React$Component) {
  _inherits(SortButtons, _React$Component);

  function SortButtons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SortButtons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortButtons.__proto__ || Object.getPrototypeOf(SortButtons)).call.apply(_ref, [this].concat(args))), _this), _this.sortByAuthor = function () {
      var books = [].concat(_toConsumableArray(_this.props.state.books));
      var sort = "author";
      books = sortByProp(books, "author", cyrillic);
      _this.props.state.funcs.setMainState({ books: books, sort: sort, renderBookChunks: 1 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SortButtons, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var styleButton = function styleButton(prop, value) {
        if (state[prop] == value) return { backgroundColor: "#ddd" };else return {};
      };

      return React.createElement(
        "div",
        { id: "sortbuttons" },
        React.createElement(
          "span",
          null,
          funcs.loc().sort
        ),
        React.createElement(
          "button",
          { onClick: funcs.sortByName, style: styleButton("sort", "name") },
          funcs.loc().byName
        ),
        React.createElement(
          "button",
          { onClick: this.sortByAuthor, style: styleButton("sort", "author") },
          funcs.loc().byAuthor
        ),
        React.createElement(
          "button",
          { onClick: funcs.sortBySeriesNum, style: styleButton("sort", "series number") },
          funcs.loc().byNumInSeries
        )
      );
    }
  }]);

  return SortButtons;
}(React.Component);

module.exports.SortButtons = SortButtons;