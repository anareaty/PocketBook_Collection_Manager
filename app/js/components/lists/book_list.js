var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookList = function (_React$Component) {
  _inherits(BookList, _React$Component);

  function BookList() {
    _classCallCheck(this, BookList);

    return _possibleConstructorReturn(this, (BookList.__proto__ || Object.getPrototypeOf(BookList)).apply(this, arguments));
  }

  _createClass(BookList, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var books = funcs.bookFilterFav(funcs.bookFilterRead(funcs.bookFilterAuthor(funcs.bookFilterSeries(funcs.bookFilterTags(funcs.bookFilterShelfs(state.books))))));

      var checkedVal = function checkedVal(a) {
        if (state.checkedBooks.indexOf(a.bookId) != -1) return true;else return false;
      };

      var isFavorite = function isFavorite(a) {
        if (a.favorite == 1) return "fa fa-heart";else return "fa fa-heart-o";
      };

      var isCompleted = function isCompleted(a) {
        if (a.completed == 1) return "fa fa-check";else return "fa fa-times";
      };

      var series = function series(a) {
        if (a.numinseries != 0) {
          return React.createElement(
            "div",
            { className: "series", id: "series" + a.bookId },
            "(" + a.series + " - " + a.numinseries + ")"
          );
        } else return null;
      };

      return React.createElement(
        "div",
        { id: "booktable" },
        books.map(function (a) {
          return React.createElement(
            "div",
            { key: a.bookId, id: "b" + a.bookId, className: "bookrow" },
            React.createElement(
              "div",
              { id: "completed" + a.bookId, onClick: funcs.toggleCompleted },
              React.createElement("i", { className: isCompleted(a) })
            ),
            React.createElement(
              "div",
              { id: "favorite" + a.bookId, onClick: funcs.toggleFavorite },
              React.createElement("i", { className: isFavorite(a) })
            ),
            React.createElement("input", { type: "checkbox", className: "bookcheck", id: "bookcheck" + a.bookId, checked: checkedVal(a), onChange: funcs.checkBook }),
            React.createElement(
              "div",
              { id: "booksell" + a.bookId },
              React.createElement(
                "div",
                { className: "bookname", id: "bookname" + a.bookId },
                a.bookName
              ),
              series(a)
            ),
            React.createElement(
              "div",
              { className: "author", id: "author" + a.bookId },
              a.author
            ),
            React.createElement(
              "button",
              { className: "bookbutton", id: "bookbutton" + a.bookId, onClick: funcs.openShelfsWindow },
              funcs.loc().shelfs
            ),
            React.createElement("hr", null)
          );
        })
      );
    }
  }]);

  return BookList;
}(React.Component);

module.exports.BookList = BookList;