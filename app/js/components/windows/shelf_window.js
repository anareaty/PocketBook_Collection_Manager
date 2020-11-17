var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShelfWindow = function (_React$Component) {
  _inherits(ShelfWindow, _React$Component);

  function ShelfWindow() {
    _classCallCheck(this, ShelfWindow);

    return _possibleConstructorReturn(this, (ShelfWindow.__proto__ || Object.getPrototypeOf(ShelfWindow)).apply(this, arguments));
  }

  _createClass(ShelfWindow, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      if (state.currentBook == undefined) return null;else {

        var bookName = state.books.find(function (a) {
          return a.bookId == state.currentBook;
        }).bookName;
        var header = funcs.loc().changeShelfsForBook + bookName;

        var checkedVal = function checkedVal(a) {
          return funcs.isBookOnShelf(state.currentBook, a.shelfId);
        };

        return React.createElement(
          "div",
          { className: "window", id: "shelfwindow" },
          React.createElement(
            "h2",
            null,
            header
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            state.shelfs.map(function (a) {
              return React.createElement(
                "div",
                { key: a.shelfId, id: "sb" + a.shelfId, className: "shelfinbookrow" },
                React.createElement("input", { type: "checkbox", className: "shelfcheck", id: "shelfcheck" + a.shelfId, checked: checkedVal(a), onChange: funcs.changeOne }),
                React.createElement(
                  "span",
                  { className: "shelfinbookname", id: "shelfinbookname" + a.shelfId },
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
      }
    }
  }]);

  return ShelfWindow;
}(React.Component);

module.exports.ShelfWindow = ShelfWindow;