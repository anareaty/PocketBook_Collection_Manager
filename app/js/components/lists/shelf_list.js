var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShelfList = function (_React$Component) {
  _inherits(ShelfList, _React$Component);

  function ShelfList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShelfList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShelfList.__proto__ || Object.getPrototypeOf(ShelfList)).call.apply(_ref, [this].concat(args))), _this), _this.turnShelf = function (e) {
      var id = e.target.id;
      if (id != "noshelf") {
        id = Number(e.target.id.substr(11));
      }
      _this.props.state.funcs.setMainState({ view: "books on shelf", currentShelf: id, currentBook: undefined, checkedBooks: [], allBooksSelected: -1, changeMethod: undefined });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShelfList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { id: "noshelf", className: "shelfbutton", onClick: this.turnShelf },
          funcs.loc().booksWithoutShelfs
        ),
        state.shelfs.map(function (a) {
          return React.createElement(
            "div",
            { key: a.shelfId, id: "s" + a.shelfId, className: "shelfrow" },
            React.createElement(
              "button",
              { id: "shelfbutton" + a.shelfId, className: "shelfbutton", onClick: _this2.turnShelf },
              a.shelfName
            )
          );
        })
      );
    }
  }]);

  return ShelfList;
}(React.Component);

module.exports.ShelfList = ShelfList;