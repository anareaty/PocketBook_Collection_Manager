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
    deleteShelfFromDB = _window$reqAppJs.deleteShelfFromDB;

var _window$reqAppJs2 = window.reqAppJs("sort.js"),
    sort = _window$reqAppJs2.sort,
    sortByProp = _window$reqAppJs2.sortByProp,
    cyrillic = _window$reqAppJs2.cyrillic;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

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
        newShelfName = "Новая полка";
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
      _this.setState({ view: "books", currentBook: undefined, currentShelf: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined });
      _this.sortByName();
    };

    _this.turnAllShelfs = function () {
      _this.setState({ view: "shelfs", currentShelf: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, filterByTags: [], currentSeries: undefined, currentAuthor: undefined });
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

    _this.state = {
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
      filterByTags: [],
      currentSeries: undefined,
      currentAuthor: undefined,
      tagsWindowOpened: false,
      seriesWindowOpened: false,
      authorsWindowOpened: false,
      newShelfName: "",
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
        bookFilterAuthor: _this.bookFilterAuthor
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      clearDB().then(function () {
        getFromDB().then(function (_ref) {
          var books = _ref.books,
              shelfs = _ref.shelfs,
              booksOnShelfs = _ref.booksOnShelfs,
              tags = _ref.tags,
              tagsInBooks = _ref.tagsInBooks;

          _this2.setState({ books: books, shelfs: shelfs, booksOnShelfs: booksOnShelfs, tags: tags, tagsInBooks: tagsInBooks, dbLoaded: true });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.dbLoaded == true) {
        if (this.state.view == "books") {
          return React.createElement(ViewAllBooks, { state: this.state });
        } else if (this.state.view == "shelfs") {
          return React.createElement(ViewAllShelfs, { state: this.state });
        } else {
          return React.createElement(ViewBooksOnShelf, { state: this.state });
        }
      } else {
        return React.createElement(
          "h1",
          null,
          "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
        );
      }
    }
  }]);

  return App;
}(React.Component);

var ViewAllBooks = function (_React$Component2) {
  _inherits(ViewAllBooks, _React$Component2);

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
          "\u0412\u0441\u0435 \u043A\u043D\u0438\u0433\u0438"
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(ButtonAllShelfs, { state: this.props.state })
        ),
        React.createElement(BookList, { state: this.props.state })
      );
    }
  }]);

  return ViewAllBooks;
}(React.Component);

var ViewAllShelfs = function (_React$Component3) {
  _inherits(ViewAllShelfs, _React$Component3);

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
          "\u0412\u0441\u0435 \u043F\u043E\u043B\u043A\u0438"
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(ButtonAllBooks, { state: this.props.state }),
          React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", onChange: this.props.state.funcs.inputNewShelfName, value: this.props.state.newShelfName, placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0439 \u043F\u043E\u043B\u043A\u0438" }),
            React.createElement(
              "button",
              { id: "addshelf", onClick: this.props.state.funcs.addNewShelf },
              "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u043A\u0443"
            )
          )
        ),
        React.createElement(ShelfList, { state: this.props.state })
      );
    }
  }]);

  return ViewAllShelfs;
}(React.Component);

var ViewBooksOnShelf = function (_React$Component4) {
  _inherits(ViewBooksOnShelf, _React$Component4);

  function ViewBooksOnShelf() {
    _classCallCheck(this, ViewBooksOnShelf);

    return _possibleConstructorReturn(this, (ViewBooksOnShelf.__proto__ || Object.getPrototypeOf(ViewBooksOnShelf)).apply(this, arguments));
  }

  _createClass(ViewBooksOnShelf, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var shelfName = "Книги без полок";
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
          function () {
            if (state.currentShelf != "noshelf") {
              return React.createElement(
                "button",
                { id: "deleteshelf", onClick: state.funcs.deleteShelf },
                "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u043A\u0443"
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

var ButtonAllBooks = function (_React$Component5) {
  _inherits(ButtonAllBooks, _React$Component5);

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
        "\u0412\u0441\u0435 \u043A\u043D\u0438\u0433\u0438"
      );
    }
  }]);

  return ButtonAllBooks;
}(React.Component);

var ButtonAllShelfs = function (_React$Component6) {
  _inherits(ButtonAllShelfs, _React$Component6);

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
        "\u0412\u0441\u0435 \u043F\u043E\u043B\u043A\u0438"
      );
    }
  }]);

  return ButtonAllShelfs;
}(React.Component);

var ChangeButtons = function (_React$Component7) {
  _inherits(ChangeButtons, _React$Component7);

  function ChangeButtons() {
    _classCallCheck(this, ChangeButtons);

    return _possibleConstructorReturn(this, (ChangeButtons.__proto__ || Object.getPrototypeOf(ChangeButtons)).apply(this, arguments));
  }

  _createClass(ChangeButtons, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      if (this.props.state.checkedBooks.length != 0) {
        var delText = "Удалить с полки";
        var currentShelf = this.props.state.currentShelf;
        if (currentShelf != undefined) {
          delText = "Удалить с другой полки";
        }

        return React.createElement(
          "div",
          { id: "changebuttons" },
          React.createElement(
            "button",
            { id: "add", onClick: this.props.state.funcs.selectChangeMethod },
            "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u043E\u043B\u043A\u0443"
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
                { id: "delcurrent", onClick: _this9.props.state.funcs.delFromCurrent },
                "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441 \u044D\u0442\u043E\u0439 \u043F\u043E\u043B\u043A\u0438"
              );
            }
          }()
        );
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return ChangeButtons;
}(React.Component);

var BookList = function (_React$Component8) {
  _inherits(BookList, _React$Component8);

  function BookList() {
    _classCallCheck(this, BookList);

    return _possibleConstructorReturn(this, (BookList.__proto__ || Object.getPrototypeOf(BookList)).apply(this, arguments));
  }

  _createClass(BookList, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      var books = this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books))));

      var checkedVal = function checkedVal(a) {
        if (_this11.props.state.checkedBooks.indexOf(a.bookId) != -1) {
          return true;
        } else {
          return false;
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
            { onClick: this.props.state.funcs.selectAllBooks },
            "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435 \u043A\u043D\u0438\u0433\u0438"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedBooks },
            "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.selectTags },
            "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0442\u0435\u0433\u0430\u043C"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.selectSeries },
            "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0441\u0435\u0440\u0438\u044F\u043C"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.selectAuthor },
            "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0430\u0432\u0442\u043E\u0440\u0430\u043C"
          )
        ),
        React.createElement(
          "div",
          { id: "filterbuttons" },
          React.createElement(
            "span",
            null,
            "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430: "
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.sortByName },
            "\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.sortByAuthor },
            "\u041F\u043E \u0430\u0432\u0442\u043E\u0440\u0443"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.sortBySeriesNum },
            "\u041F\u043E \u043D\u043E\u043C\u0435\u0440\u0443 \u0432 \u0441\u0435\u0440\u0438\u0438"
          )
        ),
        React.createElement(
          "div",
          { id: "booktable" },
          books.map(function (a) {
            return React.createElement(
              "div",
              { key: a.bookId, id: "b" + a.bookId, className: "bookrow" },
              React.createElement("input", { type: "checkbox", className: "bookcheck", id: "bookcheck" + a.bookId, checked: checkedVal(a), onChange: _this11.props.state.funcs.checkBook }),
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
                { className: "bookbutton", id: "bookbutton" + a.bookId, onClick: _this11.props.state.funcs.openShelfsWindow },
                "\u041F\u043E\u043B\u043A\u0438"
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

var ShelfList = function (_React$Component9) {
  _inherits(ShelfList, _React$Component9);

  function ShelfList() {
    _classCallCheck(this, ShelfList);

    return _possibleConstructorReturn(this, (ShelfList.__proto__ || Object.getPrototypeOf(ShelfList)).apply(this, arguments));
  }

  _createClass(ShelfList, [{
    key: "render",
    value: function render() {
      var _this13 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { id: "noshelf", className: "shelfbutton", onClick: this.props.state.funcs.turnShelf },
          "\u041A\u043D\u0438\u0433\u0438 \u0431\u0435\u0437 \u043F\u043E\u043B\u043E\u043A"
        ),
        this.props.state.shelfs.map(function (a) {
          return React.createElement(
            "div",
            { key: a.shelfId, id: "s" + a.shelfId, className: "shelfrow" },
            React.createElement(
              "button",
              { id: "shelfbutton" + a.shelfId, className: "shelfbutton", onClick: _this13.props.state.funcs.turnShelf },
              a.shelfName
            )
          );
        })
      );
    }
  }]);

  return ShelfList;
}(React.Component);

var ShelfWindow = function (_React$Component10) {
  _inherits(ShelfWindow, _React$Component10);

  function ShelfWindow() {
    _classCallCheck(this, ShelfWindow);

    return _possibleConstructorReturn(this, (ShelfWindow.__proto__ || Object.getPrototypeOf(ShelfWindow)).apply(this, arguments));
  }

  _createClass(ShelfWindow, [{
    key: "render",
    value: function render() {
      var _this15 = this;

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
        var header = "Редактировать коллекции для книги " + bookName;

        var checkedVal = function checkedVal(a) {
          if (_this15.props.state.funcs.isBookOnShelf(_this15.props.state.currentBook, a.shelfId) == true) {
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
                React.createElement("input", { type: "checkbox", className: "shelfcheck", id: "shelfcheck" + a.shelfId, checked: checkedVal(a), onChange: _this15.props.state.funcs.changeOne }),
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
            "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
          )
        );
      }
    }
  }]);

  return ShelfWindow;
}(React.Component);

var MassShelfChangeWindow = function (_React$Component11) {
  _inherits(MassShelfChangeWindow, _React$Component11);

  function MassShelfChangeWindow() {
    _classCallCheck(this, MassShelfChangeWindow);

    return _possibleConstructorReturn(this, (MassShelfChangeWindow.__proto__ || Object.getPrototypeOf(MassShelfChangeWindow)).apply(this, arguments));
  }

  _createClass(MassShelfChangeWindow, [{
    key: "render",
    value: function render() {
      var _this17 = this;

      if (this.props.state.changeMethod != undefined & this.props.state.checkedBooks.length != 0) {

        var header = void 0;
        if (this.props.state.changeMethod == "add") {
          header = "Добавить на полку";
        } else {
          header = "Удалить с полки";
        }

        var shelfs = this.props.state.shelfs.filter(function (a) {
          return a.shelfId != _this17.props.state.currentShelf;
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
                  { id: "shelfchangebutton" + a.shelfId, className: "shelfchangebutton", onClick: _this17.props.state.funcs.massChange },
                  a.shelfName
                )
              );
            })
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.closeAllWindows, className: "closebutton" },
            "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
          )
        );
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return MassShelfChangeWindow;
}(React.Component);

var TagsWindow = function (_React$Component12) {
  _inherits(TagsWindow, _React$Component12);

  function TagsWindow() {
    _classCallCheck(this, TagsWindow);

    return _possibleConstructorReturn(this, (TagsWindow.__proto__ || Object.getPrototypeOf(TagsWindow)).apply(this, arguments));
  }

  _createClass(TagsWindow, [{
    key: "render",
    value: function render() {
      var _this19 = this;

      if (this.props.state.tagsWindowOpened == false) {
        return null;
      } else {
        var tags = this.props.state.tags;
        var booksIds = this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterShelfs(this.props.state.books))).map(function (a) {
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

        var header = "Выбрать теги";

        var checkedVal = function checkedVal(a) {
          if (_this19.props.state.filterByTags.indexOf(a.tagId) != -1) {
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
                React.createElement("input", { type: "checkbox", className: "tagcheck", id: "tagcheck" + a.tagId, checked: checkedVal(a), onChange: _this19.props.state.funcs.changeTag }),
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
            "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedTags, className: "clearbutton" },
            "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"
          )
        );
      }
    }
  }]);

  return TagsWindow;
}(React.Component);

var SeriesWindow = function (_React$Component13) {
  _inherits(SeriesWindow, _React$Component13);

  function SeriesWindow() {
    _classCallCheck(this, SeriesWindow);

    return _possibleConstructorReturn(this, (SeriesWindow.__proto__ || Object.getPrototypeOf(SeriesWindow)).apply(this, arguments));
  }

  _createClass(SeriesWindow, [{
    key: "render",
    value: function render() {
      var _this21 = this;

      if (this.props.state.seriesWindowOpened == false) {
        return null;
      } else {
        var books = this.props.state.funcs.bookFilterAuthor(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)));
        var series = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.series;
        })))).filter(function (a) {
          return a != "";
        });
        series = sort(series, cyrillic);
        var header = "Выбрать серию";

        var checkedVal = function checkedVal(a) {
          if (_this21.props.state.currentSeries == a) {
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
                React.createElement("input", { type: "checkbox", className: "seriescheck", id: "seriescheck-" + a, checked: checkedVal(a), onChange: _this21.props.state.funcs.changeSeries }),
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
            "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedSeries, className: "clearbutton" },
            "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"
          )
        );
      }
    }
  }]);

  return SeriesWindow;
}(React.Component);

var AuthorsWindow = function (_React$Component14) {
  _inherits(AuthorsWindow, _React$Component14);

  function AuthorsWindow() {
    _classCallCheck(this, AuthorsWindow);

    return _possibleConstructorReturn(this, (AuthorsWindow.__proto__ || Object.getPrototypeOf(AuthorsWindow)).apply(this, arguments));
  }

  _createClass(AuthorsWindow, [{
    key: "render",
    value: function render() {
      var _this23 = this;

      if (this.props.state.authorsWindowOpened == false) {
        return null;
      } else {
        var books = this.props.state.funcs.bookFilterSeries(this.props.state.funcs.bookFilterTags(this.props.state.funcs.bookFilterShelfs(this.props.state.books)));
        var authors = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.author;
        }))));
        authors = sort(authors, cyrillic);
        var header = "Выбрать автора";

        var checkedVal = function checkedVal(a) {
          if (_this23.props.state.currentAuthor == a) {
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
                React.createElement("input", { type: "checkbox", className: "authorcheck", id: "authorcheck-" + a, checked: checkedVal(a), onChange: _this23.props.state.funcs.changeAuthor }),
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
            "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
          ),
          React.createElement(
            "button",
            { onClick: this.props.state.funcs.clearSelectedAuthors, className: "clearbutton" },
            "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"
          )
        );
      }
    }
  }]);

  return AuthorsWindow;
}(React.Component);

module.exports.App = App;