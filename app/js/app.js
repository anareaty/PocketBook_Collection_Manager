var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    getFromDB = _window$reqAppJs.getFromDB,
    addBookToDB = _window$reqAppJs.addBookToDB,
    removeBookFromDB = _window$reqAppJs.removeBookFromDB,
    clearDB = _window$reqAppJs.clearDB,
    getLocale = _window$reqAppJs.getLocale;

var _window$reqAppJs2 = window.reqAppJs("sort.js"),
    sortByProp = _window$reqAppJs2.sortByProp,
    cyrillic = _window$reqAppJs2.cyrillic;

var _window$reqAppJs3 = window.reqAppJs("localization.js"),
    localize = _window$reqAppJs3.localize;

var _window$reqAppJs4 = window.reqAppJs("components/locale_select.js"),
    LocaleSelect = _window$reqAppJs4.LocaleSelect;

var _window$reqAppJs5 = window.reqAppJs("components/views/view_all_books.js"),
    ViewAllBooks = _window$reqAppJs5.ViewAllBooks;

var _window$reqAppJs6 = window.reqAppJs("components/views/view_all_shelfs.js"),
    ViewAllShelfs = _window$reqAppJs6.ViewAllShelfs;

var _window$reqAppJs7 = window.reqAppJs("components/views/view_books_on_shelf.js"),
    ViewBooksOnShelf = _window$reqAppJs7.ViewBooksOnShelf;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.setMainState = function (obj) {
      _this.setState(obj);
    };

    _this.sortByName = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      var sort = "name";
      books = sortByProp(books, "bookName", cyrillic);
      _this.setState({ books: books, sort: sort, renderBookChunks: 1 });
    };

    _this.sortBySeriesNum = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      var sort = "series number";
      books = sortByProp(books, "numinseries", cyrillic);
      _this.setState({ books: books, sort: sort, renderBookChunks: 1 });
    };

    _this.isBookOnShelf = function (bookId, shelfId) {
      var booksOnShelfs = _this.state.booksOnShelfs;
      if (booksOnShelfs.find(function (a) {
        return a.bookId == bookId && a.shelfId == shelfId;
      }) == undefined) {
        return false;
      } else {
        return true;
      }
    };

    _this.turnAllBooks = function () {
      _this.setState({ view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, includeTags: [], excludeTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0 });
      _this.sortByName();
    };

    _this.changeBook = function (booksOnShelfs, bookId, shelfId, method) {
      var books = _this.state.books;
      var shelfs = _this.state.shelfs;
      if (method == "add" && _this.isBookOnShelf(bookId, shelfId) == false) {
        var bookName = books.find(function (a) {
          return a.bookId == bookId;
        }).bookName;
        var shelfName = shelfs.find(function (a) {
          return a.shelfId == shelfId;
        }).shelfName;
        booksOnShelfs.push({ bookId: bookId, shelfId: shelfId });
        addBookToDB(bookId, shelfId);
      } else if (method == "del" && _this.isBookOnShelf(bookId, shelfId) == true) {
        booksOnShelfs = booksOnShelfs.filter(function (a) {
          return !(a.bookId == bookId && a.shelfId == shelfId);
        });
        removeBookFromDB(bookId, shelfId);
      }
      return booksOnShelfs;
    };

    _this.closeAllWindows = function () {
      _this.setState({ currentBook: undefined, changeMethod: undefined, tagsWindowOpened: false, seriesWindowOpened: false, authorsWindowOpened: false });
    };

    _this.loc = function () {
      return localize(_this.state.locale);
    };

    _this.state = {
      locale: "en",
      books: [],
      shelfs: [],
      booksOnShelfs: [],
      tags: [],
      tagsInBooks: [],
      booksSettings: [],
      dbLoaded: false,
      view: "books",
      checkedBooks: [],
      includeTags: [],
      excludeTags: [],
      filterFav: 0,
      filterRead: 0,
      sort: "name",
      tagsWindowOpened: false,
      seriesWindowOpened: false,
      authorsWindowOpened: false,
      newShelfName: "",
      renderBookChunks: 1,
      funcs: {
        turnAllBooks: _this.turnAllBooks,
        isBookOnShelf: _this.isBookOnShelf,
        closeAllWindows: _this.closeAllWindows,
        sortByName: _this.sortByName,
        sortBySeriesNum: _this.sortBySeriesNum,
        changeBook: _this.changeBook,
        loc: _this.loc,
        setMainState: _this.setMainState
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var locale = getLocale();
      clearDB().then(function () {
        getFromDB().then(function (_ref) {
          var books = _ref.books,
              shelfs = _ref.shelfs,
              booksOnShelfs = _ref.booksOnShelfs,
              tags = _ref.tags,
              tagsInBooks = _ref.tagsInBooks,
              booksSettings = _ref.booksSettings;

          _this2.setState({ books: books, shelfs: shelfs, booksOnShelfs: booksOnShelfs, tags: tags, tagsInBooks: tagsInBooks, booksSettings: booksSettings, dbLoaded: true, locale: locale });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state;

      var view = function view() {
        if (state.view == "books") {
          return React.createElement(ViewAllBooks, { state: state });
        } else if (state.view == "shelfs") {
          return React.createElement(ViewAllShelfs, { state: state });
        } else {
          return React.createElement(ViewBooksOnShelf, { state: state });
        }
      };

      if (state.dbLoaded == true) {
        return React.createElement(
          "div",
          { id: "app" },
          React.createElement(LocaleSelect, { state: state }),
          view()
        );
      } else {
        return React.createElement(
          "h1",
          null,
          this.loc().loading
        );
      }
    }
  }]);

  return App;
}(React.Component);

module.exports.App = App;