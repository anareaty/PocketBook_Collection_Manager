var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    addSettingsToDB = _window$reqAppJs.addSettingsToDB,
    updateSettingsInDB = _window$reqAppJs.updateSettingsInDB;

var ChangeButtons = function (_React$Component) {
  _inherits(ChangeButtons, _React$Component);

  function ChangeButtons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChangeButtons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChangeButtons.__proto__ || Object.getPrototypeOf(ChangeButtons)).call.apply(_ref, [this].concat(args))), _this), _this.changeSettingsAll = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var id = e.currentTarget.id;
      var checkedBooks = state.checkedBooks;
      var books = [].concat(_toConsumableArray(state.books));
      var booksSettings = [].concat(_toConsumableArray(state.booksSettings));
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
      funcs.setMainState({ books: books, booksSettings: booksSettings, filterRead: 0, filterFav: 0 });
      if (checkedBooks.length > 100) {
        funcs.setMainState({ renderBookChunks: 1 });
      }
    }, _this.selectChangeMethod = function (e) {
      var id = e.target.id;
      _this.props.state.funcs.setMainState({ changeMethod: id, currentBook: undefined });
    }, _this.delFromCurrent = function () {
      var state = _this.props.state;
      var funcs = state.funcs;
      var booksOnShelfs = [].concat(_toConsumableArray(state.booksOnShelfs));
      var shelfId = state.currentShelf;
      var checkedBooks = state.checkedBooks;
      for (var i = 0; i < checkedBooks.length; i++) {
        booksOnShelfs = funcs.changeBook(booksOnShelfs, checkedBooks[i], shelfId, "del");
      }
      funcs.setMainState({ booksOnShelfs: booksOnShelfs, checkedBooks: [], allBooksSelected: -1 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChangeButtons, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      if (state.checkedBooks.length != 0) {
        var delText = function delText() {
          if (state.currentShelf == undefined || state.currentShelf == "noshelf") return funcs.loc().delFromShelf;else return funcs.loc().delFromAnotherShelf;
        };

        var delCurrent = function delCurrent() {
          if (state.currentShelf != undefined && state.currentShelf != "noshelf") {
            return React.createElement(
              "button",
              { id: "delcurrent", onClick: _this2.delFromCurrent },
              funcs.loc().delFromThisShelf
            );
          }
        };

        return React.createElement(
          "div",
          { id: "changebuttons" },
          React.createElement(
            "button",
            { id: "add", onClick: this.selectChangeMethod },
            funcs.loc().addToShelf
          ),
          React.createElement(
            "button",
            { id: "del", onClick: this.selectChangeMethod },
            delText()
          ),
          delCurrent(),
          React.createElement(
            "button",
            { id: "addtag", onClick: this.selectChangeMethod },
            funcs.loc().addTag
          ),
          React.createElement(
            "button",
            { id: "deltag", onClick: this.selectChangeMethod },
            funcs.loc().deleteTag
          ),
          React.createElement(
            "button",
            { id: "fav-all", onClick: this.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart" })
          ),
          React.createElement(
            "button",
            { id: "unfav-all", onClick: this.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart-o" })
          ),
          React.createElement(
            "button",
            { id: "complete-all", onClick: this.changeSettingsAll },
            React.createElement("i", { className: "fa fa-check" })
          ),
          React.createElement(
            "button",
            { id: "uncomplete-all", onClick: this.changeSettingsAll },
            React.createElement("i", { className: "fa fa-times" })
          )
        );
      } else return null;
    }
  }]);

  return ChangeButtons;
}(React.Component);

module.exports.ChangeButtons = ChangeButtons;