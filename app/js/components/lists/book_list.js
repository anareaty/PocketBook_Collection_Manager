var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("bookfilter.js"),
    bookFilter = _window$reqAppJs.bookFilter;

var _window$reqAppJs2 = window.reqAppJs("components/lists/book_list_chunk.js"),
    BookListChunk = _window$reqAppJs2.BookListChunk;

var BookList = function (_React$Component) {
  _inherits(BookList, _React$Component);

  function BookList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BookList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BookList.__proto__ || Object.getPrototypeOf(BookList)).call.apply(_ref, [this].concat(args))), _this), _this.incrementChunks = function () {
      var maxChunks = bookFilter(_this.props.state).length / 30;
      var renderBookChunks = _this.props.state.renderBookChunks;
      if (renderBookChunks < maxChunks) {
        _this.props.state.funcs.setMainState({ renderBookChunks: renderBookChunks + 1 });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BookList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var intervalId = setInterval(this.incrementChunks, 100);
      this.props.state.funcs.setMainState({ intervalId: intervalId, intervalActive: true });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.props.state.intervalId);
      this.props.state.funcs.setMainState({ intervalActive: false });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var maxChunks = bookFilter(this.props.state).length / 30;
      var renderBookChunks = this.props.state.renderBookChunks;
      if (renderBookChunks >= maxChunks && this.props.state.intervalActive === true) {
        clearInterval(this.props.state.intervalId);
        this.props.state.funcs.setMainState({ intervalActive: false });
      } else if (renderBookChunks < maxChunks && this.props.state.intervalActive === false) {
        var intervalId = setInterval(this.incrementChunks, 100);
        this.props.state.funcs.setMainState({ intervalId: intervalId, intervalActive: true });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var books = bookFilter(state);

      var chunks = [];
      while (books.length > 0) {
        var chunk = books.splice(0, 30);
        chunks.push(chunk);
      }

      return React.createElement(
        "div",
        { id: "booktable" },
        chunks.map(function (a, i) {
          return React.createElement(BookListChunk, { booksChunk: a, key: i, index: i, state: state });
        })
      );
    }
  }]);

  return BookList;
}(React.Component);

module.exports.BookList = BookList;