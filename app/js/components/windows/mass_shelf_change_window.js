var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MassShelfChangeWindow = function (_React$Component) {
  _inherits(MassShelfChangeWindow, _React$Component);

  function MassShelfChangeWindow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MassShelfChangeWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MassShelfChangeWindow.__proto__ || Object.getPrototypeOf(MassShelfChangeWindow)).call.apply(_ref, [this].concat(args))), _this), _this.massChange = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var shelfId = Number(e.target.id.substr(17));
      var booksOnShelfs = [].concat(_toConsumableArray(state.booksOnShelfs));
      var checkedBooks = state.checkedBooks;
      var changeMethod = state.changeMethod;
      var currentShelf = state.currentShelf;
      for (var i = 0; i < checkedBooks.length; i++) {
        booksOnShelfs = funcs.changeBook(booksOnShelfs, checkedBooks[i], shelfId, changeMethod);
      }
      if (currentShelf == "noshelf" && changeMethod == "add") {
        checkedBooks = [];
      }
      funcs.setMainState({ booksOnShelfs: booksOnShelfs, checkedBooks: checkedBooks, changeMethod: undefined });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MassShelfChangeWindow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      if (state.changeMethod != undefined) {

        var header = function header() {
          if (state.changeMethod == "add") return funcs.loc().addToShelf;else return funcs.loc().delFromShelf;
        };

        var shelfs = state.shelfs.filter(function (a) {
          return a.shelfId != state.currentShelf;
        });

        return React.createElement(
          "div",
          { className: "window" },
          React.createElement(
            "h2",
            null,
            header()
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            shelfs.map(function (a) {
              return React.createElement(
                "div",
                { key: a.shelfId, id: "msc" + a.shelfId, className: "shelfchangerow" },
                React.createElement(
                  "button",
                  { id: "shelfchangebutton" + a.shelfId, className: "shelfchangebutton", onClick: _this2.massChange },
                  a.shelfName
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: funcs.closeAllWindows, className: "closebutton" },
            funcs.loc().close
          )
        );
      } else return null;
    }
  }]);

  return MassShelfChangeWindow;
}(React.Component);

module.exports.MassShelfChangeWindow = MassShelfChangeWindow;