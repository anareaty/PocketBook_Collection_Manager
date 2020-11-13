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
      books = sortByProp(books, "bookName", cyrillic);
      _this.setState({ books: books });
    };

    _this.sortByAuthor = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      books = sortByProp(books, "author", cyrillic);
      _this.setState({ books: books });
    };

    _this.sortBySeriesNum = function () {
      var books = [].concat(_toConsumableArray(_this.state.books));
      books = sortByProp(books, "numinseries", cyrillic);
      _this.setState({ books: books });
    };

    _this.isBookOnShelf = function (bookId, shelfId) {
      var booksOnShelfs = _this.state.booksOnShelfs;
      if (booksOnShelfs.find(function (a) {
        return a.bookId == bookId & a.shelfId == shelfId;
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

      if (e.target.checked == true & filterByTags.indexOf(tagId) == -1) {
        filterByTags.push(tagId);
      } else if (e.target.checked == false & filterByTags.indexOf(tagId) != -1) {
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
      } else if (e.target.checked == false & currentSeries == seriesId) {
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
      } else if (e.target.checked == false & currentAuthor == authorId) {
        currentAuthor = undefined;
      } else {
        return;
      }

      _this.setState({ currentAuthor: currentAuthor });
    };

    _this.selectAllBooks = function () {
      var shelfId = _this.state.currentShelf;
      var checkedBooks = void 0;
      if (shelfId == undefined) {
        checkedBooks = _this.state.books.map(function (a) {
          return a.bookId;
        });
      } else if (shelfId == "noshelf") {
        var booksWithShelfs = _this.state.booksOnShelfs.map(function (a) {
          return a.bookId;
        });
        checkedBooks = _this.state.books.filter(function (a) {
          return booksWithShelfs.indexOf(a.bookId) == -1;
        }).map(function (a) {
          return a.bookId;
        });
      } else {
        checkedBooks = _this.state.booksOnShelfs.filter(function (a) {
          return a.shelfId == shelfId;
        }).map(function (a) {
          return a.bookId;
        });
      }

      var filterByTags = _this.state.filterByTags;
      if (filterByTags.length != 0) {
        var tagsInBooks = _this.state.tagsInBooks;

        var _loop2 = function _loop2(i) {
          var tag = filterByTags[i];
          var booksInTag = tagsInBooks.filter(function (a) {
            return a.tagId == tag;
          }).map(function (a) {
            return a.bookId;
          });
          checkedBooks = checkedBooks.filter(function (a) {
            return booksInTag.indexOf(a) != -1;
          });
        };

        for (var i = 0; i < filterByTags.length; i++) {
          _loop2(i);
        }
      }

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
      if (e.target.checked == true & findChecked == undefined) {
        checkedBooks.push(id);
      } else if (e.target.checked == false & findChecked != undefined) {
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

      if (method == "add" & _this.isBookOnShelf(bookId, shelfId) == false) {
        var bookName = books.find(function (a) {
          return a.bookId == bookId;
        }).bookName;

        var shelfName = shelfs.find(function (a) {
          return a.shelfId == shelfId;
        }).shelfName;
        booksOnShelfs.push({ bookId: bookId, shelfId: shelfId });
        addBookToDB(bookId, shelfId);
      } else if (method == "del" & _this.isBookOnShelf(bookId, shelfId) == true) {
        booksOnShelfs = booksOnShelfs.filter(function (a) {
          return !(a.bookId == bookId & a.shelfId == shelfId);
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

      if (currentShelf == "noshelf" & changeMethod == "add") {
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
      if (this.state.dbLoaded == true) {
        if (this.state.view == "books") {
          return React.createElement(
            "div",
            null,
            React.createElement(LocaleSelect, { state: this.state }),
            React.createElement(ViewAllBooks, { state: this.state })
          );
        } else if (this.state.view == "shelfs") {
          return React.createElement(
            "div",
            null,
            React.createElement(LocaleSelect, { state: this.state }),
            React.createElement(ViewAllShelfs, { state: this.state })
          );
        } else {
          return React.createElement(
            "div",
            null,
            React.createElement(LocaleSelect, { state: this.state }),
            React.createElement(ViewBooksOnShelf, { state: this.state })
          );
        }
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

var LocaleSelect = function (_React$Component2) {
  _inherits(LocaleSelect, _React$Component2);

  function LocaleSelect() {
    _classCallCheck(this, LocaleSelect);

    return _possibleConstructorReturn(this, (LocaleSelect.__proto__ || Object.getPrototypeOf(LocaleSelect)).apply(this, arguments));
  }

  _createClass(LocaleSelect, [{
    key: "render",
    value: function render() {
      var locale = this.props.state.locale;
      return React.createElement(
        "select",
        { id: "locale-select", value: locale, onChange: this.props.state.funcs.selectLocale },
        React.createElement(
          "option",
          { value: "en" },
          "English"
        ),
        React.createElement(
          "option",
          { value: "ru" },
          "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
        )
      );
    }
  }]);

  return LocaleSelect;
}(React.Component);

var ViewAllBooks = function (_React$Component3) {
  _inherits(ViewAllBooks, _React$Component3);

  function ViewAllBooks() {
    _classCallCheck(this, ViewAllBooks);

    return _possibleConstructorReturn(this, (ViewAllBooks.__proto__ || Object.getPrototypeOf(ViewAllBooks)).apply(this, arguments));
  }

  _createClass(ViewAllBooks, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "view" },
        React.createElement(
          "h1",
          null,
          this.props.state.funcs.loc().allBooks
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(ButtonAllShelfs, { state: this.props.state }),
          React.createElement(FavAndReadFilters, { state: this.props.state })
        ),
        React.createElement(BookList, { state: this.props.state })
      );
    }
  }]);

  return ViewAllBooks;
}(React.Component);

var ViewAllShelfs = function (_React$Component4) {
  _inherits(ViewAllShelfs, _React$Component4);

  function ViewAllShelfs() {
    _classCallCheck(this, ViewAllShelfs);

    return _possibleConstructorReturn(this, (ViewAllShelfs.__proto__ || Object.getPrototypeOf(ViewAllShelfs)).apply(this, arguments));
  }

  _createClass(ViewAllShelfs, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "view" },
        React.createElement(
          "h1",
          null,
          this.props.state.funcs.loc().allShelfs
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(ButtonAllBooks, { state: this.props.state }),
          React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", onChange: this.props.state.funcs.inputNewShelfName, value: this.props.state.newShelfName, placeholder: this.props.state.funcs.loc().newShelfName }),
            React.createElement(
              "button",
              { id: "addshelf", onClick: this.props.state.funcs.addNewShelf },
              this.props.state.funcs.loc().addShelf
            )
          )
        ),
        React.createElement(ShelfList, { state: this.props.state })
      );
    }
  }]);

  return ViewAllShelfs;
}(React.Component);

var ViewBooksOnShelf = function (_React$Component5) {
  _inherits(ViewBooksOnShelf, _React$Component5);

  function ViewBooksOnShelf() {
    _classCallCheck(this, ViewBooksOnShelf);

    return _possibleConstructorReturn(this, (ViewBooksOnShelf.__proto__ || Object.getPrototypeOf(ViewBooksOnShelf)).apply(this, arguments));
  }

  _createClass(ViewBooksOnShelf, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var funcs = this.props.state.funcs;
      var state = this.props.state;
      var shelfName = funcs.loc().booksWithoutShelfs;
      if (state.currentShelf != "noshelf") {
        shelfName = state.shelfs.find(function (a) {
          return a.shelfId == state.currentShelf;
        }).shelfName;
      }
      return React.createElement(
        "div",
        { className: "view" },
        React.createElement(
          "h1",
          null,
          shelfName
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(ButtonAllBooks, { state: this.props.state }),
          React.createElement(ButtonAllShelfs, { state: this.props.state }),
          React.createElement(FavAndReadFilters, { state: this.props.state }),
          function () {
            if (state.currentShelf != "noshelf") {
              return React.createElement(
                "button",
                { id: "deleteshelf", onClick: state.funcs.deleteShelf },
                _this7.props.state.funcs.loc().deleteShelf
              );
            }
          }()
        ),
        React.createElement(BookList, { state: this.props.state })
      );
    }
  }]);

  return ViewBooksOnShelf;
}(React.Component);

var ButtonAllBooks = function (_React$Component6) {
  _inherits(ButtonAllBooks, _React$Component6);

  function ButtonAllBooks() {
    _classCallCheck(this, ButtonAllBooks);

    return _possibleConstructorReturn(this, (ButtonAllBooks.__proto__ || Object.getPrototypeOf(ButtonAllBooks)).apply(this, arguments));
  }

  _createClass(ButtonAllBooks, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { onClick: this.props.state.funcs.turnAllBooks },
        this.props.state.funcs.loc().allBooks
      );
    }
  }]);

  return ButtonAllBooks;
}(React.Component);

var ButtonAllShelfs = function (_React$Component7) {
  _inherits(ButtonAllShelfs, _React$Component7);

  function ButtonAllShelfs() {
    _classCallCheck(this, ButtonAllShelfs);

    return _possibleConstructorReturn(this, (ButtonAllShelfs.__proto__ || Object.getPrototypeOf(ButtonAllShelfs)).apply(this, arguments));
  }

  _createClass(ButtonAllShelfs, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { onClick: this.props.state.funcs.turnAllShelfs },
        this.props.state.funcs.loc().allShelfs
      );
    }
  }]);

  return ButtonAllShelfs;
}(React.Component);

var FavAndReadFilters = function (_React$Component8) {
  _inherits(FavAndReadFilters, _React$Component8);

  function FavAndReadFilters() {
    _classCallCheck(this, FavAndReadFilters);

    return _possibleConstructorReturn(this, (FavAndReadFilters.__proto__ || Object.getPrototypeOf(FavAndReadFilters)).apply(this, arguments));
  }

  _createClass(FavAndReadFilters, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      var styleFav = function styleFav() {
        if (_this11.props.state.filterFav == 1) {
          return { backgroundColor: "#bbbbbb" };
        } else return {};
      };

      var styleNonFav = function styleNonFav() {
        if (_this11.props.state.filterFav == -1) {
          return { backgroundColor: "#bbbbbb" };
        } else return {};
      };

      var styleRead = function styleRead() {
        if (_this11.props.state.filterRead == 1) {
          return { backgroundColor: "#bbbbbb" };
        } else return {};
      };

      var styleNonRead = function styleNonRead() {
        if (_this11.props.state.filterRead == -1) {
          return { backgroundColor: "#bbbbbb" };
        } else return {};
      };

      return React.createElement(
        "div",
        { id: "fav-and-read" },
        React.createElement(
          "button",
          { id: "favorite", style: styleFav(), onClick: this.props.state.funcs.toggleFilterFav },
          React.createElement("i", { className: "fa fa-heart" })
        ),
        React.createElement(
          "button",
          { id: "non-favorite", style: styleNonFav(), onClick: this.props.state.funcs.toggleFilterFav },
          React.createElement("i", { className: "fa fa-heart-o" })
        ),
        React.createElement(
          "button",
          { id: "completed", style: styleRead(), onClick: this.props.state.funcs.toggleFilterRead },
          React.createElement("i", { className: "fa fa-check" })
        ),
        React.createElement(
          "button",
          { id: "non-completed", style: styleNonRead(), onClick: this.props.state.funcs.toggleFilterRead },
          React.createElement("i", { className: "fa fa-times" })
        )
      );
    }
  }]);

  return FavAndReadFilters;
}(React.Component);

var ChangeButtons = function (_React$Component9) {
  _inherits(ChangeButtons, _React$Component9);

  function ChangeButtons() {
    _classCallCheck(this, ChangeButtons);

    return _possibleConstructorReturn(this, (ChangeButtons.__proto__ || Object.getPrototypeOf(ChangeButtons)).apply(this, arguments));
  }

  _createClass(ChangeButtons, [{
    key: "render",
    value: function render() {
      var _this13 = this;

      if (this.props.state.checkedBooks.length != 0) {
        var delText = this.props.state.funcs.loc().delFromShelf;
        var currentShelf = this.props.state.currentShelf;
        if (currentShelf != undefined) {
          delText = this.props.state.funcs.loc().delFromAnotherShelf;
        }

        return React.createElement(
          "div",
          { id: "changebuttons" },
          React.createElement(
            "button",
            { id: "add", onClick: this.props.state.funcs.selectChangeMethod },
            this.props.state.funcs.loc().addToShelf
          ),
          React.createElement(
            "button",
            { id: "del", onClick: this.props.state.funcs.selectChangeMethod },
            delText
          ),
          function () {
            if (currentShelf != undefined & currentShelf != "noshelf") {
              return React.createElement(
                "button",
                { id: "delcurrent", onClick: _this13.props.state.funcs.delFromCurrent },
                _this13.props.state.funcs.loc().delFromThisShelf
              );
            }
          }(),
          React.createElement(
            "button",
            { id: "fav-all", onClick: this.props.state.funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart" })
          ),
          React.createElement(
            "button",
            { id: "unfav-all", onClick: this.props.state.funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart-o" })
          ),
          React.createElement(
            "button",
            { id: "complete-all", onClick: this.props.state.funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-check" })
          ),
          React.createElement(
            "button",
            { id: "uncomplete-all", onClick: this.props.state.funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-times" })
          )
        );
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return ChangeButtons;
}(React.Component);

var BookList = function (_React$Component10) {
  _inherits(BookList, _React$Component10);

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
        if (state.checkedBooks.indexOf(a.bookId) != -1) {
          return true;
        } else {
          return false;
        }
      };

      var isFavorite = function isFavorite(a) {
        if (a.favorite == 1) {
          return "fa fa-heart";
        } else {
          return "fa fa-heart-o";
        }
      };

      var isCompleted = function isCompleted(a) {
        if (a.completed == 1) {
          return "fa fa-check";
        } else {
          return "fa fa-times";
        }
      };

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { id: "selectbuttons" },
          React.createElement(
            "button",
            { onClick: funcs.selectAllBooks },
            funcs.loc().selectAllBooks
          ),
          React.createElement(
            "button",
            { onClick: funcs.clearSelectedBooks },
            funcs.loc().clearSelected
          ),
          React.createElement(
            "button",
            { onClick: funcs.selectTags },
            funcs.loc().filterByTags
          ),
          React.createElement(
            "button",
            { onClick: funcs.selectSeries },
            funcs.loc().filterBySeries
          ),
          React.createElement(
            "button",
            { onClick: funcs.selectAuthor },
            funcs.loc().filterByAuthors
          )
        ),
        React.createElement(
          "div",
          { id: "filterbuttons" },
          React.createElement(
            "span",
            null,
            funcs.loc().sort
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortByName },
            funcs.loc().byName
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortByAuthor },
            funcs.loc().byAuthor
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortBySeriesNum },
            funcs.loc().byNumInSeries
          )
        ),
        React.createElement(
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
                null,
                React.createElement(
                  "div",
                  { className: "bookname", id: "bookname" + a.bookId },
                  a.bookName
                ),
                function () {
                  if (a.numinseries != 0) {
                    return React.createElement(
                      "div",
                      { className: "series", id: "series" + a.bookId },
                      "(" + a.series + " - " + a.numinseries + ")"
                    );
                  } else {
                    return null;
                  }
                }()
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
        ),
        React.createElement(ChangeButtons, { state: this.props.state }),
        React.createElement(ShelfWindow, { state: this.props.state }),
        React.createElement(MassShelfChangeWindow, { state: this.props.state }),
        React.createElement(TagsWindow, { state: this.props.state }),
        React.createElement(SeriesWindow, { state: this.props.state }),
        React.createElement(AuthorsWindow, { state: this.props.state })
      );
    }
  }]);

  return BookList;
}(React.Component);

var ShelfList = function (_React$Component11) {
  _inherits(ShelfList, _React$Component11);

  function ShelfList() {
    _classCallCheck(this, ShelfList);

    return _possibleConstructorReturn(this, (ShelfList.__proto__ || Object.getPrototypeOf(ShelfList)).apply(this, arguments));
  }

  _createClass(ShelfList, [{
    key: "render",
    value: function render() {
      var _this16 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { id: "noshelf", className: "shelfbutton", onClick: this.props.state.funcs.turnShelf },
          this.props.state.funcs.loc().booksWithoutShelfs
        ),
        this.props.state.shelfs.map(function (a) {
          return React.createElement(
            "div",
            { key: a.shelfId, id: "s" + a.shelfId, className: "shelfrow" },
            React.createElement(
              "button",
              { id: "shelfbutton" + a.shelfId, className: "shelfbutton", onClick: _this16.props.state.funcs.turnShelf },
              a.shelfName
            )
          );
        })
      );
    }
  }]);

  return ShelfList;
}(React.Component);

var ShelfWindow = function (_React$Component12) {
  _inherits(ShelfWindow, _React$Component12);

  function ShelfWindow() {
    _classCallCheck(this, ShelfWindow);

    return _possibleConstructorReturn(this, (ShelfWindow.__proto__ || Object.getPrototypeOf(ShelfWindow)).apply(this, arguments));
  }

  _createClass(ShelfWindow, [{
    key: "render",
    value: function render() {
      var _this18 = this;

      var bookId = this.props.state.currentBook;
      var shelfs = this.props.state.shelfs;
      var books = this.props.state.books;
      var booksOnShelfs = this.props.state.booksOnShelfs;

      if (bookId == undefined) {
        return React.createElement("div", null);
      } else {

        var bookName = books.find(function (a) {
          return a.bookId == bookId;
        }).bookName;
        var header = this.props.state.funcs.loc().changeShelfsForBook + bookName;

        var checkedVal = function checkedVal(a) {
          if (_this18.props.state.funcs.isBookOnShelf(_this18.props.state.currentBook, a.shelfId) == true) {
            return true;
          } else {
            return false;
          }
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
            shelfs.map(function (a) {
              return React.createElement(
                "div",
                { key: a.shelfId, id: "sb" + a.shelfId, className: "shelfinbookrow" },
                React.createElement("input", { type: "checkbox", className: "shelfcheck", id: "shelfcheck" + a.shelfId, checked: checkedVal(a), onChange: _this18.props.state.funcs.changeOne }),
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
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            this.props.state.funcs.loc().close
          )
        );
      }
    }
  }]);

  return ShelfWindow;
}(React.Component);

var MassShelfChangeWindow = function (_React$Component13) {
  _inherits(MassShelfChangeWindow, _React$Component13);

  function MassShelfChangeWindow() {
    _classCallCheck(this, MassShelfChangeWindow);

    return _possibleConstructorReturn(this, (MassShelfChangeWindow.__proto__ || Object.getPrototypeOf(MassShelfChangeWindow)).apply(this, arguments));
  }

  _createClass(MassShelfChangeWindow, [{
    key: "render",
    value: function render() {
      var _this20 = this;

      if (this.props.state.changeMethod != undefined & this.props.state.checkedBooks.length != 0) {

        var header = void 0;
        if (this.props.state.changeMethod == "add") {
          header = this.props.state.funcs.loc().addToShelf;
        } else {
          header = this.props.state.funcs.loc().delFromShelf;
        }

        var shelfs = this.props.state.shelfs.filter(function (a) {
          return a.shelfId != _this20.props.state.currentShelf;
        });

        return React.createElement(
          "div",
          { className: "window" },
          React.createElement(
            "h2",
            null,
            header
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
                  { id: "shelfchangebutton" + a.shelfId, className: "shelfchangebutton", onClick: _this20.props.state.funcs.massChange },
                  a.shelfName
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            this.props.state.funcs.loc().close
          )
        );
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return MassShelfChangeWindow;
}(React.Component);

var TagsWindow = function (_React$Component14) {
  _inherits(TagsWindow, _React$Component14);

  function TagsWindow() {
    _classCallCheck(this, TagsWindow);

    return _possibleConstructorReturn(this, (TagsWindow.__proto__ || Object.getPrototypeOf(TagsWindow)).apply(this, arguments));
  }

  _createClass(TagsWindow, [{
    key: "render",
    value: function render() {
      var _this22 = this;

      if (this.props.state.tagsWindowOpened == false) {
        return null;
      } else {
        var tags = this.props.state.tags;
        var booksIds = this.props.state.funcs.bookFilterFav(this.props.state.funcs.bookFilterRead(this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterShelfs(this.props.state.books))))).map(function (a) {
          return a.bookId;
        });
        var tagsIds = this.props.state.tagsInBooks.filter(function (a) {
          return booksIds.indexOf(a.bookId) != -1;
        }).map(function (a) {
          return a.tagId;
        });
        tags = tags.filter(function (a) {
          return tagsIds.indexOf(a.tagId) != -1;
        });

        var header = this.props.state.funcs.loc().selectTags;

        var checkedVal = function checkedVal(a) {
          if (_this22.props.state.filterByTags.indexOf(a.tagId) != -1) {
            return true;
          } else {
            return false;
          }
        };

        return React.createElement(
          "div",
          { className: "window", id: "tagswindow" },
          React.createElement(
            "h2",
            null,
            header
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            tags.map(function (a) {
              return React.createElement(
                "div",
                { key: a.tagId, id: "t" + a.tagId, className: "tagrow" },
                React.createElement("input", { type: "checkbox", className: "tagcheck", id: "tagcheck" + a.tagId, checked: checkedVal(a), onChange: _this22.props.state.funcs.changeTag }),
                React.createElement(
                  "span",
                  { className: "tagname", id: "tagname" + a.tagId },
                  a.tagName
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            this.props.state.funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedTags, className: "clearbutton" },
            this.props.state.funcs.loc().clear
          )
        );
      }
    }
  }]);

  return TagsWindow;
}(React.Component);

var SeriesWindow = function (_React$Component15) {
  _inherits(SeriesWindow, _React$Component15);

  function SeriesWindow() {
    _classCallCheck(this, SeriesWindow);

    return _possibleConstructorReturn(this, (SeriesWindow.__proto__ || Object.getPrototypeOf(SeriesWindow)).apply(this, arguments));
  }

  _createClass(SeriesWindow, [{
    key: "render",
    value: function render() {
      var _this24 = this;

      if (this.props.state.seriesWindowOpened == false) {
        return null;
      } else {
        var books = this.props.state.funcs.bookFilterFav(this.props.state.funcs.bookFilterRead(this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)))));
        var series = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.series;
        })))).filter(function (a) {
          return a != "";
        });
        series = sort(series, cyrillic);
        var header = this.props.state.funcs.loc().selectSeries;

        var checkedVal = function checkedVal(a) {
          if (_this24.props.state.currentSeries == a) {
            return true;
          } else {
            return false;
          }
        };

        return React.createElement(
          "div",
          { className: "window", id: "serieswindow" },
          React.createElement(
            "h2",
            null,
            header
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            series.map(function (a, i) {
              return React.createElement(
                "div",
                { key: i, id: "s-" + a, className: "seriesrow" },
                React.createElement("input", { type: "checkbox", className: "seriescheck", id: "seriescheck-" + a, checked: checkedVal(a), onChange: _this24.props.state.funcs.changeSeries }),
                React.createElement(
                  "span",
                  { className: "seriesname", id: "seriesname-" + a },
                  a
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            this.props.state.funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedSeries, className: "clearbutton" },
            this.props.state.funcs.loc().clear
          )
        );
      }
    }
  }]);

  return SeriesWindow;
}(React.Component);

var AuthorsWindow = function (_React$Component16) {
  _inherits(AuthorsWindow, _React$Component16);

  function AuthorsWindow() {
    _classCallCheck(this, AuthorsWindow);

    return _possibleConstructorReturn(this, (AuthorsWindow.__proto__ || Object.getPrototypeOf(AuthorsWindow)).apply(this, arguments));
  }

  _createClass(AuthorsWindow, [{
    key: "render",
    value: function render() {
      var _this26 = this;

      if (this.props.state.authorsWindowOpened == false) {
        return null;
      } else {
        var books = this.props.state.funcs.bookFilterFav(this.props.state.funcs.bookFilterRead(this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)))));
        var authors = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.author;
        }))));
        authors = sort(authors, cyrillic);
        var header = this.props.state.funcs.loc().selectAuthor;

        var checkedVal = function checkedVal(a) {
          if (_this26.props.state.currentAuthor == a) {
            return true;
          } else {
            return false;
          }
        };

        return React.createElement(
          "div",
          { className: "window", id: "authorswindow" },
          React.createElement(
            "h2",
            null,
            header
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            authors.map(function (a, i) {
              return React.createElement(
                "div",
                { key: i, id: "a-" + a, className: "authorrow" },
                React.createElement("input", { type: "checkbox", className: "authorcheck", id: "authorcheck-" + a, checked: checkedVal(a), onChange: _this26.props.state.funcs.changeAuthor }),
                React.createElement(
                  "span",
                  { className: "authorname", id: "authorname-" + a },
                  a
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            this.props.state.funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedAuthors, className: "clearbutton" },
            this.props.state.funcs.loc().clear
          )
        );
      }
    }
  }]);

  return AuthorsWindow;
}(React.Component);

module.exports.App = App;