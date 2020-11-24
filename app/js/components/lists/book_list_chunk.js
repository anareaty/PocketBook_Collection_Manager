var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/lists/bookrow.js"),
    BookRow = _window$reqAppJs.BookRow;

var BookListChunk = function (_React$Component) {
  _inherits(BookListChunk, _React$Component);

  function BookListChunk() {
    _classCallCheck(this, BookListChunk);

    return _possibleConstructorReturn(this, (BookListChunk.__proto__ || Object.getPrototypeOf(BookListChunk)).apply(this, arguments));
  }

  _createClass(BookListChunk, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var booksChunk = this.props.booksChunk;
      var index = this.props.index;
      var renderBookChunks = state.renderBookChunks;

      if (renderBookChunks < index) {
        return null;
      } else {
        return React.createElement(
          React.Fragment,
          null,
          booksChunk.map(function (a) {
            return React.createElement(BookRow, { book: a, key: a.bookId, state: state });
          })
        );
      }
    }
  }]);

  return BookListChunk;
}(React.Component);

module.exports.BookListChunk = BookListChunk;