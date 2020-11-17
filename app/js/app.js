var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    getFromDB = _window$reqAppJs.getFromDB,
    addBookToDB = _window$reqAppJs.addBookToDB,
    removeBookFromDB = _window$reqAppJs.removeBookFromDB,
    addNewShelfToDB = _window$reqAppJs.addNewShelfToDB,
    findLastShelfId = _window$reqAppJs.findLastShelfId,
    clearDB = _window$reqAppJs.clearDB,
    deleteShelfFromDB = _window$reqAppJs.deleteShelfFromDB,
    addSettingsToDB = _window$reqAppJs.addSettingsToDB,
    updateSettingsInDB = _window$reqAppJs.updateSettingsInDB,
    getLocale = _window$reqAppJs.getLocale,
    saveLocale = _window$reqAppJs.saveLocale;

var _window$reqAppJs2 = window.reqAppJs("sort.js"),
    sort = _window$reqAppJs2.sort,
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

    _this.selectLocale = function (e) {
      var index = e.target.selectedIndex;
      var locale = e.target.options[index].value;
      _this.setState({ locale: locale });
      saveLocale(locale);
    };

    _this.changeSettingsAll = function (e) {
      var id = e.currentTarget.id;
      var checkedBooks = _this.state.checkedBooks;
      var books = [].concat(_toConsumableArray(_this.state.books));
      var booksSettings = [].concat(_toConsumableArray(_this.state.booksSettings));
      checkedBooks.forEach(function (bookId) {
        var book = books.find(function (a) {
          return a.bookId == bookId;
        });
        if (id == "fav-all") {
          book.favorite = 1;
        } else if (id == "unfav-all") {
          book.favorite = 0;
        } else if (id == "complete-all") {
          book.completed = 1;
        } else if (id == "uncomplete-all") {
          book.completed = 0;
        }
        var bookInSettings = booksSettings.find(function (a) {
          return a.bookId == bookId;
        });
        if (bookInSettings == undefined) {
          booksSettings.push({ bookId: bookId, completed: book.completed, favorite: book.favorite });
          addSettingsToDB(bookId, book.completed, book.favorite);
        } else {
          bookInSettings.completed = book.completed;
          updateSettingsInDB(bookId, book.completed, book.favorite);
        }
      });
      _this.setState({ books: books, booksSettings: booksSettings, filterRead: 0, filterFav: 0 });
    };

    _this.toggleFilterFav = function (e) {
      var id = e.currentTarget.id;
      var filterFav = _this.state.filterFav;
      if (id == "favorite" && filterFav != 1) {
        filterFav = 1;
      } else if (id == "non-favorite" && filterFav != -1) {
        filterFav = -1;
      } else {
        filterFav = 0;
      }
      _this.setState({ filterFav: filterFav, checkedBooks: [] });
    };

    _this.toggleFilterRead = function (e) {
      var id = e.currentTarget.id;
      var filterRead = _this.state.filterRead;
      if (id == "completed" && filterRead != 1) {
        filterRead = 1;
      } else if (id == "non-completed" && filterRead != -1) {
        filterRead = -1;
      } else {
        filterRead = 0;
      }
      _this.setState({ filterRead: filterRead, checkedBooks: [] });
    };

    _this.toggleCompleted = function (e) {
      var bookId = Number(e.currentTarget.id.substr(9));
      var booksSettings = [].concat(_toConsumableArray(_this.state.booksSettings));
      var books = [].concat(_toConsumableArray(_this.state.books));
      var book = books.find(function (a) {
        return a.bookId == bookId;
      });
      if (book.completed == 1) {
        book.completed = 0;
      } else {
        book.completed = 1;
      }

      var bookInSettings = booksSettings.find(function (a) {
        return a.bookId == bookId;
      });
      if (bookInSettings == undefined) {
        booksSettings.push({ bookId: bookId, completed: book.completed, favorite: 0 });
        addSettingsToDB(bookId, book.completed, book.favorite);
      } else {
        bookInSettings.completed = book.completed;
        updateSettingsInDB(bookId, book.completed, book.favorite);
      }

      _this.setState({ books: books, booksSettings: booksSettings });
    };

    _this.toggleFavorite = function (e) {
      var bookId = Number(e.currentTarget.id.substr(8));
      var booksSettings = [].concat(_toConsumableArray(_this.state.booksSettings));
      var books = [].concat(_toConsumableArray(_this.state.books));
      var book = books.find(function (a) {
        return a.bookId == bookId;
      });
      if (book.favorite == 1) {
        book.favorite = 0;
      } else {
        book.favorite = 1;
      }

      var bookInSettings = booksSettings.find(function (a) {
        return a.bookId == bookId;
      });
      if (bookInSettings == undefined) {
        booksSettings.push({ bookId: bookId, completed: 0, favorite: book.favorite });
        addSettingsToDB(bookId, book.completed, book.favorite);
      } else {
        bookInSettings.favorite = book.favorite;
        updateSettingsInDB(bookId, book.completed, book.favorite);
      }

      _this.setState({ books: books, booksSettings: booksSettings });
    };

    _this.bookFilterShelfs = function (books) {
      var booksOnShelfs = _this.state.booksOnShelfs;
      var shelfId = _this.state.currentShelf;
      if (shelfId != undefined) {
        if (shelfId == "noshelf") {
          var booksWithShelfs = booksOnShelfs.map(function (a) {
            return a.bookId;
          });
          books = books.filter(function (a) {
            return booksWithShelfs.indexOf(a.bookId) == -1;
          });
        } else {
          books = books.filter(function (a) {
            return _this.isBookOnShelf(a.bookId, shelfId) == true;
          });
        }
      }
      return books;
    };

    _this.bookFilterTags = function (books) {
      var filterByTags = _this.state.filterByTags;
      if (filterByTags.length != 0) {
        var tagsInBooks = _this.state.tagsInBooks;

        var _loop = function _loop(i) {
          var tag = filterByTags[i];
          var booksInTag = tagsInBooks.filter(function (a) {
            return a.tagId == tag;
          }).map(function (a) {
            return a.bookId;
          });
          books = books.filter(function (a) {
            return booksInTag.indexOf(a.bookId) != -1;
          });
        };

        for (var i = 0; i < filterByTags.length; i++) {
          _loop(i);
        }
      }
      return books;
    };

    _this.bookFilterSeries = function (books) {
      var currentSeries = _this.state.currentSeries;
      if (currentSeries != undefined) {
        books = books.filter(function (a) {
          return a.series == currentSeries;
        });
      }
      return books;
    };

    _this.bookFilterAuthor = function (books) {
      var currentAuthor = _this.state.currentAuthor;
      if (currentAuthor != undefined) {
        books = books.filter(function (a) {
          return a.author == currentAuthor;
        });
      }
      return books;
    };

    _this.bookFilterRead = function (books) {
      var filterRead = _this.state.filterRead;
      if (filterRead == 1) {
        books = books.filter(function (a) {
          return a.completed == 1;
        });
      } else if (filterRead == -1) {
        books = books.filter(function (a) {
          return a.completed == 0;
        });
      }
      return books;
    };

    _this.bookFilterFav = function (books) {
      var filterFav = _this.state.filterFav;
      if (filterFav == 1) {
        books = books.filter(function (a) {
          return a.favorite == 1;
        });
      } else if (filterFav == -1) {
        books = books.filter(function (a) {
          return a.favorite == 0;
        });
      }
      return books;
    };

    _this.sortByName = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      var sort = "name";
      books = sortByProp(books, "bookName", cyrillic);
      _this.setState({ books: books, sort: sort });
    };

    _this.sortByAuthor = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      var sort = "author";
      books = sortByProp(books, "author", cyrillic);
      _this.setState({ books: books, sort: sort });
    };

    _this.sortBySeriesNum = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      var sort = "series number";
      books = sortByProp(books, "numinseries", cyrillic);
      _this.setState({ books: books, sort: sort });
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

    _this.deleteShelf = function () {
      var shelfId = _this.state.currentShelf;

      var shelfs = [].concat(_toConsumableArray(_this.state.shelfs)).filter(function (a) {
        return a.shelfId != shelfId;
      });
      var booksOnShelfs = [].concat(_toConsumableArray(_this.state.booksOnShelfs)).filter(function (a) {
        return a.shelfId != shelfId;
      });

      deleteShelfFromDB(shelfId);
      _this.setState({ shelfs: shelfs, booksOnShelfs: booksOnShelfs, currentShelf: undefined, checkedBooks: [], filterByTags: [], view: "shelfs", currentSeries: undefined, currentAuthor: undefined });
    };

    _this.addNewShelf = function () {
      var shelfs = [].concat(_toConsumableArray(_this.state.shelfs));
      var shelfNames = shelfs.map(function (a) {
        return a.shelfName;
      });
      newShelfName = _this.state.newShelfName;

      if (newShelfName == "") {
        newShelfName = _this.loc().newShelf;
      }

      if (shelfNames.indexOf(newShelfName) != -1) {
        var nameStart = newShelfName;
        var num = 0;
        while (shelfNames.indexOf(newShelfName) != -1) {
          num++;
          newShelfName = nameStart + " (" + num + ")";
        }
      }

      findLastShelfId().then(function (lastId) {
        newShelfId = lastId + 1;
        var newShelf = { shelfId: newShelfId, shelfName: newShelfName };
        shelfs.push(newShelf);
        _this.setState({ shelfs: shelfs, newShelfName: "" });
        addNewShelfToDB(newShelfName, newShelfId);
      });
    };

    _this.inputNewShelfName = function (e) {
      _this.setState({ newShelfName: e.target.value });
    };

    _this.selectTags = function () {
      _this.setState({ tagsWindowOpened: true, checkedBooks: [] });
    };

    _this.selectSeries = function () {
      _this.setState({ seriesWindowOpened: true, checkedBooks: [] });
    };

    _this.selectAuthor = function () {
      _this.setState({ authorsWindowOpened: true, checkedBooks: [] });
    };

    _this.changeTag = function (e) {
      var tagId = Number(e.target.id.substr(8));
      var filterByTags = [].concat(_toConsumableArray(_this.state.filterByTags));

      if (e.target.checked == true && filterByTags.indexOf(tagId) == -1) {
        filterByTags.push(tagId);
      } else if (e.target.checked == false && filterByTags.indexOf(tagId) != -1) {
        var index = filterByTags.indexOf(tagId);
        filterByTags.splice(index, 1);
      } else {
        return;
      }

      _this.setState({ filterByTags: filterByTags });
    };

    _this.changeSeries = function (e) {
      var seriesId = e.target.id.substr(12);
      var currentSeries = _this.state.currentSeries;

      if (e.target.checked == true) {
        currentSeries = seriesId;
        _this.sortBySeriesNum();
      } else if (e.target.checked == false && currentSeries == seriesId) {
        currentSeries = undefined;
        _this.sortByName();
      } else {
        return;
      }

      _this.setState({ currentSeries: currentSeries });
    };

    _this.changeAuthor = function (e) {
      var authorId = e.target.id.substr(12);
      var currentAuthor = _this.state.currentAuthor;

      if (e.target.checked == true) {
        currentAuthor = authorId;
      } else if (e.target.checked == false && currentAuthor == authorId) {
        currentAuthor = undefined;
      } else {
        return;
      }

      _this.setState({ currentAuthor: currentAuthor });
    };

    _this.selectAllBooks = function () {
      var books = _this.bookFilterFav(_this.bookFilterRead(_this.bookFilterAuthor(_this.bookFilterSeries(_this.bookFilterTags(_this.bookFilterShelfs(_this.state.books))))));
      var checkedBooks = books.map(function (a) {
        return a.bookId;
      });
      _this.setState({ checkedBooks: checkedBooks });
    };

    _this.clearSelectedBooks = function () {
      _this.setState({ checkedBooks: [] });
    };

    _this.clearSelectedAuthors = function () {
      _this.setState({ currentAuthor: undefined });
    };

    _this.clearSelectedSeries = function () {
      _this.setState({ currentSeries: undefined });
    };

    _this.clearSelectedTags = function () {
      _this.setState({ filterByTags: [] });
    };

    _this.turnAllBooks = function () {
      _this.setState({ view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0 });
      _this.sortByName();
    };

    _this.turnAllShelfs = function () {
      _this.setState({ view: "shelfs", currentShelf: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0 });
      _this.sortByName();
    };

    _this.turnShelf = function (e) {
      var id = e.target.id;
      if (id != "noshelf") {
        id = Number(e.target.id.substr(11));
      }
      _this.setState({ view: "books on shelf", currentShelf: id, currentBook: undefined, checkedBooks: [], changeMethod: undefined });
    };

    _this.openShelfsWindow = function (e) {
      var id = Number(e.target.id.substr(10));
      _this.setState({ currentBook: id, checkedBooks: [], changeMethod: undefined });
    };

    _this.checkBook = function (e) {
      var id = Number(e.target.id.substr(9));
      var checkedBooks = [].concat(_toConsumableArray(_this.state.checkedBooks));
      var findChecked = checkedBooks.find(function (a) {
        return a == id;
      });
      if (e.target.checked == true && findChecked == undefined) {
        checkedBooks.push(id);
      } else if (e.target.checked == false && findChecked != undefined) {
        var index = checkedBooks.indexOf(id);
        checkedBooks.splice(index, 1);
      } else {
        return;
      }
      _this.setState({ checkedBooks: checkedBooks, changeMethod: undefined });
    };

    _this.selectChangeMethod = function (e) {
      var id = e.target.id;
      _this.setState({ changeMethod: id, currentBook: undefined });
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

    _this.changeOne = function (e) {
      var booksOnShelfs = [].concat(_toConsumableArray(_this.state.booksOnShelfs));
      var bookId = _this.state.currentBook;
      var shelfId = Number(e.target.id.substr(10));
      var method = "add";
      if (e.target.checked == false) {
        method = "del";
      }
      booksOnShelfs = _this.changeBook(booksOnShelfs, bookId, shelfId, method);
      _this.setState({ booksOnShelfs: booksOnShelfs });
    };

    _this.massChange = function (e) {
      var booksOnShelfs = [].concat(_toConsumableArray(_this.state.booksOnShelfs));
      var shelfId = Number(e.target.id.substr(17));
      var checkedBooks = _this.state.checkedBooks;
      var changeMethod = _this.state.changeMethod;
      var currentShelf = _this.state.currentShelf;

      for (var i = 0; i < checkedBooks.length; i++) {
        booksOnShelfs = _this.changeBook(booksOnShelfs, checkedBooks[i], shelfId, changeMethod);
      }

      if (currentShelf == "noshelf" && changeMethod == "add") {
        checkedBooks = [];
      }

      _this.setState({ booksOnShelfs: booksOnShelfs, checkedBooks: checkedBooks, changeMethod: undefined });
    };

    _this.delFromCurrent = function () {
      var booksOnShelfs = [].concat(_toConsumableArray(_this.state.booksOnShelfs));
      var shelfId = _this.state.currentShelf;
      var checkedBooks = _this.state.checkedBooks;

      for (var i = 0; i < checkedBooks.length; i++) {
        booksOnShelfs = _this.changeBook(booksOnShelfs, checkedBooks[i], shelfId, "del");
      }

      _this.setState({ booksOnShelfs: booksOnShelfs, checkedBooks: [] });
    };

    _this.closeAllWindows = function () {
      _this.setState({ currentBook: undefined, changeMethod: undefined, tagsWindowOpened: false, seriesWindowOpened: false, authorsWindowOpened: false });
    };

    _this.loc = function () {
      return localize(_this.state.locale);
    };

    _this.state = {
      locale: "en",
      dbLoaded: false,
      view: "books",
      currentShelf: undefined,
      currentBook: undefined,
      checkedBooks: [],
      changeMethod: undefined,
      books: [],
      shelfs: [],
      booksOnShelfs: [],
      tags: [],
      tagsInBooks: [],
      booksSettings: [],
      filterByTags: [],
      currentSeries: undefined,
      currentAuthor: undefined,
      tagsWindowOpened: false,
      seriesWindowOpened: false,
      authorsWindowOpened: false,
      newShelfName: "",
      filterFav: 0,
      filterRead: 0,
      sort: "name",
      funcs: {
        turnAllBooks: _this.turnAllBooks,
        turnAllShelfs: _this.turnAllShelfs,
        turnShelf: _this.turnShelf,
        openShelfsWindow: _this.openShelfsWindow,
        changeOne: _this.changeOne,
        checkBook: _this.checkBook,
        selectChangeMethod: _this.selectChangeMethod,
        massChange: _this.massChange,
        isBookOnShelf: _this.isBookOnShelf,
        selectAllBooks: _this.selectAllBooks,
        clearSelectedBooks: _this.clearSelectedBooks,
        clearSelectedAuthors: _this.clearSelectedAuthors,
        clearSelectedSeries: _this.clearSelectedSeries,
        clearSelectedTags: _this.clearSelectedTags,
        closeAllWindows: _this.closeAllWindows,
        delFromCurrent: _this.delFromCurrent,
        selectTags: _this.selectTags,
        changeTag: _this.changeTag,
        addNewShelf: _this.addNewShelf,
        inputNewShelfName: _this.inputNewShelfName,
        deleteShelf: _this.deleteShelf,
        selectSeries: _this.selectSeries,
        changeSeries: _this.changeSeries,
        selectAuthor: _this.selectAuthor,
        changeAuthor: _this.changeAuthor,
        sortByName: _this.sortByName,
        sortByAuthor: _this.sortByAuthor,
        sortBySeriesNum: _this.sortBySeriesNum,
        bookFilterShelfs: _this.bookFilterShelfs,
        bookFilterTags: _this.bookFilterTags,
        bookFilterSeries: _this.bookFilterSeries,
        bookFilterAuthor: _this.bookFilterAuthor,
        toggleCompleted: _this.toggleCompleted,
        toggleFavorite: _this.toggleFavorite,
        toggleFilterFav: _this.toggleFilterFav,
        toggleFilterRead: _this.toggleFilterRead,
        bookFilterRead: _this.bookFilterRead,
        bookFilterFav: _this.bookFilterFav,
        changeSettingsAll: _this.changeSettingsAll,
        loc: _this.loc,
        selectLocale: _this.selectLocale
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