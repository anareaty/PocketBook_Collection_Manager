var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/lists/book_list.js"),
    BookList = _window$reqAppJs.BookList;

var _window$reqAppJs2 = window.reqAppJs("components/buttons/menu_buttons.js"),
    MenuButtons = _window$reqAppJs2.MenuButtons;

var _window$reqAppJs3 = window.reqAppJs("components/buttons/change_buttons.js"),
    ChangeButtons = _window$reqAppJs3.ChangeButtons;

var _window$reqAppJs4 = window.reqAppJs("components/windows/all_windows.js"),
    AllWindows = _window$reqAppJs4.AllWindows;

var ViewBooksOnShelf = function (_React$Component) {
  _inherits(ViewBooksOnShelf, _React$Component);

  function ViewBooksOnShelf() {
    _classCallCheck(this, ViewBooksOnShelf);

    return _possibleConstructorReturn(this, (ViewBooksOnShelf.__proto__ || Object.getPrototypeOf(ViewBooksOnShelf)).apply(this, arguments));
  }

  _createClass(ViewBooksOnShelf, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var shelfName = function shelfName() {
        if (state.currentShelf != "noshelf") {
          return state.shelfs.find(function (a) {
            return a.shelfId == state.currentShelf;
          }).shelfName;
        } else {
          return funcs.loc().booksWithoutShelfs;
        }
      };

      return React.createElement(
        "div",
        { className: "view" },
        React.createElement(
          "h1",
          null,
          shelfName()
        ),
        React.createElement(MenuButtons, { state: state }),
        React.createElement(BookList, { state: state }),
        React.createElement(ChangeButtons, { state: state }),
        React.createElement(AllWindows, { state: state })
      );
    }
  }]);

  return ViewBooksOnShelf;
}(React.Component);

module.exports.ViewBooksOnShelf = ViewBooksOnShelf;