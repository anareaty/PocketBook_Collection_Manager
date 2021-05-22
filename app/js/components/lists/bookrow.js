var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    addSettingsToDB = _window$reqAppJs.addSettingsToDB,
    updateSettingsInDB = _window$reqAppJs.updateSettingsInDB;

var BookRow = function (_React$Component) {
  _inherits(BookRow, _React$Component);

  function BookRow(props) {
    _classCallCheck(this, BookRow);

    var _this = _possibleConstructorReturn(this, (BookRow.__proto__ || Object.getPrototypeOf(BookRow)).call(this, props));

    _this.toggleSettings = function (e) {
      var state = _this.props.state;
      var id = e.currentTarget.id;
      var setting = "favorite";
      if (/completed/.test(id)) setting = "completed";

      var book = _this.props.book;
      var bookId = book.bookId;
      var booksSettings = [].concat(_toConsumableArray(state.booksSettings));
      var books = [].concat(_toConsumableArray(state.books));

      if (book[setting] == 1) book[setting] = 0;else book[setting] = 1;

      var bookInSettings = booksSettings.find(function (a) {
        return a.bookId == bookId;
      });
      if (bookInSettings == undefined) {
        booksSettings.push({ bookId: bookId, completed: book.completed, favorite: book.favorite });
        addSettingsToDB(bookId, book.completed, book.favorite);
      } else {
        bookInSettings[setting] = book[setting];
        updateSettingsInDB(bookId, book.completed, book.favorite);
      }

      _this.props.state.funcs.setMainState({ books: books, booksSettings: booksSettings });
      _this.setState({ completed: book.completed, favorite: book.favorite });
    };

    _this.checkBook = function (e) {
      var id = _this.props.book.bookId;
      var state = _this.props.state;
      var checkedBooks = [].concat(_toConsumableArray(state.checkedBooks));
      var findChecked = checkedBooks.find(function (a) {
        return a == id;
      });
      var checked = void 0;
      if (e.target.checked == true && findChecked == undefined) {
        checkedBooks.push(id);
        checked = true;
      } else if (e.target.checked == false && findChecked != undefined) {
        var index = checkedBooks.indexOf(id);
        checkedBooks.splice(index, 1);
        checked = false;
      } else {
        return;
      }
      _this.props.state.funcs.setMainState({ checkedBooks: checkedBooks, changeMethod: undefined, allBooksSelected: 0 });
      _this.setState({ checked: checked });
    };

    _this.checkedVal = function () {
      return _this.state.checked;
    };

    _this.isFavorite = function () {
      if (_this.state.favorite == 1) return "fa fa-heart";else return "fa fa-heart-o";
    };

    _this.isCompleted = function () {
      if (_this.state.completed == 1) return "fa fa-check";else return "fa fa-times";
    };

    _this.series = function (a) {
      if (a.numinseries != 0) {
        return React.createElement(
          "div",
          { className: "series", id: "series" + a.bookId },
          "(" + a.series + " - " + a.numinseries + ")"
        );
      } else return null;
    };

    _this.openShelfsWindow = function (e) {
      var id = Number(e.target.id.substr(10));
      _this.props.state.funcs.setMainState({ currentBook: id, checkedBooks: [], allBooksSelected: -1, changeMethod: undefined });
    };

    _this.state = { checked: false };
    return _this;
  }

  _createClass(BookRow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var book = this.props.book;
      this.setState({ favorite: book.favorite, completed: book.completed });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var state = this.props.state;
      if (state.allBooksSelected == 1 && this.state.checked == false) {
        this.setState({ checked: true });
      } else if (state.allBooksSelected == -1 && this.state.checked == true) {
        this.setState({ checked: false });
      }
      var book = this.props.book;
      var bookId = book.bookId;
      var newBook = state.books.find(function (a) {
        return a.bookId == bookId;
      });
      if (this.state.favorite != newBook.favorite || this.state.completed != newBook.completed) {
        this.setState({ favorite: book.favorite, completed: book.completed });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var bookId = this.props.book.bookId;
      var nextBook = nextProps.state.books.find(function (a) {
        return a.bookId == bookId;
      });
      if (this.state.favorite != nextBook.favorite) return true;else if (this.state.completed != nextBook.completed) return true;else if (this.props.state.allBooksSelected != nextProps.state.allBooksSelected) return true;else if (this.state != nextState) return true;else if (this.props.state.locale != nextProps.state.locale) return true;else return false;
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;
      var book = this.props.book;
      var bookId = book.bookId,
          bookName = book.bookName,
          author = book.author;

      if (author == "") author = funcs.loc().noauthor;

      return React.createElement(
        "div",
        { key: bookId, id: "b" + bookId, className: "bookrow" },
        React.createElement(
          "div",
          { id: "completed" + bookId, onClick: this.toggleSettings },
          React.createElement("i", { className: this.isCompleted() })
        ),
        React.createElement(
          "div",
          { id: "favorite" + bookId, onClick: this.toggleSettings },
          React.createElement("i", { className: this.isFavorite() })
        ),
        React.createElement("input", { type: "checkbox", className: "bookcheck", id: "bookcheck" + bookId, checked: this.checkedVal(), onChange: this.checkBook }),
        React.createElement(
          "div",
          { id: "booksell" + bookId },
          React.createElement(
            "div",
            { className: "bookname", id: "bookname" + bookId },
            bookName
          ),
          this.series(book)
        ),
        React.createElement(
          "div",
          { className: "author", id: "author" + bookId },
          author
        ),
        React.createElement(
          "button",
          { className: "bookbutton", id: "bookbutton" + bookId, onClick: this.openShelfsWindow },
          funcs.loc().shelfs
        ),
        React.createElement("hr", null)
      );
    }
  }]);

  return BookRow;
}(React.Component);

module.exports.BookRow = BookRow;