var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    deleteShelfFromDB = _window$reqAppJs.deleteShelfFromDB,
    deleteTagFromDB = _window$reqAppJs.deleteTagFromDB;

var ViewButtons = function (_React$Component) {
  _inherits(ViewButtons, _React$Component);

  function ViewButtons() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ViewButtons);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewButtons.__proto__ || Object.getPrototypeOf(ViewButtons)).call.apply(_ref, [this].concat(args))), _this), _this.toggleFilterFav = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var id = e.currentTarget.id;
      var filterFav = state.filterFav;
      if (id == "favorite" && filterFav != 1) {
        filterFav = 1;
      } else if (id == "non-favorite" && filterFav != -1) {
        filterFav = -1;
      } else {
        filterFav = 0;
      }
      funcs.setMainState({ filterFav: filterFav, checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1 });
    }, _this.toggleFilterRead = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var id = e.currentTarget.id;
      var filterRead = state.filterRead;
      if (id == "completed" && filterRead != 1) {
        filterRead = 1;
      } else if (id == "non-completed" && filterRead != -1) {
        filterRead = -1;
      } else {
        filterRead = 0;
      }
      funcs.setMainState({ filterRead: filterRead, checkedBooks: [], allBooksSelected: -1, renderBookChunks: 1 });
    }, _this.deleteShelf = function () {
      var state = _this.props.state;
      var funcs = state.funcs;
      var shelfId = state.currentShelf;
      var shelfs = [].concat(_toConsumableArray(state.shelfs)).filter(function (a) {
        return a.shelfId != shelfId;
      });
      var booksOnShelfs = [].concat(_toConsumableArray(state.booksOnShelfs)).filter(function (a) {
        return a.shelfId != shelfId;
      });
      deleteShelfFromDB(shelfId);
      funcs.setMainState({ shelfs: shelfs, booksOnShelfs: booksOnShelfs, currentShelf: undefined, checkedBooks: [], allBooksSelected: -1, includeTags: [], excludeTags: [], view: "shelfs", currentSeries: undefined, currentAuthor: undefined });
    }, _this.deleteTag = function () {
      var state = _this.props.state;
      var funcs = state.funcs;
      var tagId = state.currentTag;
      var tags = [].concat(_toConsumableArray(state.tags)).filter(function (a) {
        return a.tagId != tagId;
      });
      var tagsInBooks = [].concat(_toConsumableArray(state.tagsInBooks)).filter(function (a) {
        return a.tagId != tagId;
      });
      deleteTagFromDB(tagId);
      funcs.setMainState({ tags: tags, tagsInBooks: tagsInBooks, currentTag: undefined, checkedBooks: [], allBooksSelected: -1, includeTags: [], excludeTags: [], view: "tags", currentSeries: undefined, currentAuthor: undefined });
    }, _this.turnAllShelfs = function () {
      _this.props.state.funcs.setMainState({ view: "shelfs", currentShelf: undefined, currentTag: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, includeTags: [], excludeTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0 });
      _this.props.state.funcs.sortByName();
    }, _this.turnAllTags = function () {
      _this.props.state.funcs.setMainState({ view: "tags", currentShelf: undefined, currentTag: undefined, currentBook: undefined, checkedBooks: [], changeMethod: undefined, includeTags: [], excludeTags: [], currentSeries: undefined, currentAuthor: undefined, filterRead: 0, filterFav: 0 });
      _this.props.state.funcs.sortByName();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ViewButtons, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      var deleteButton = function deleteButton() {
        if (state.view == "books on shelf" && state.currentShelf != "noshelf") {
          return React.createElement(
            "button",
            { id: "deleteshelf", onClick: _this2.deleteShelf },
            funcs.loc().deleteShelf
          );
        } else if (state.view == "books with tag" && state.currentTag != "notag") {
          return React.createElement(
            "button",
            { id: "deletetag", onClick: _this2.deleteTag },
            funcs.loc().deleteTag
          );
        } else return null;
      };

      var allBooksButton = function allBooksButton() {
        if (state.view == "books on shelf" || state.view == "books with tag") {
          return React.createElement(
            "button",
            { onClick: funcs.turnAllBooks },
            funcs.loc().allBooks
          );
        } else return null;
      };

      var styleButton = function styleButton(prop, value) {
        if (state[prop] == value) return { backgroundColor: "#ddd" };else return {};
      };

      return React.createElement(
        "div",
        { id: "viewbuttons" },
        allBooksButton(),
        React.createElement(
          "button",
          { onClick: this.turnAllShelfs },
          funcs.loc().allShelfs
        ),
        React.createElement(
          "button",
          { onClick: this.turnAllTags },
          funcs.loc().allTags
        ),
        React.createElement(
          "div",
          { id: "fav-and-read" },
          React.createElement(
            "button",
            { id: "favorite", style: styleButton("filterFav", 1), onClick: this.toggleFilterFav },
            React.createElement("i", { className: "fa fa-heart" })
          ),
          React.createElement(
            "button",
            { id: "non-favorite", style: styleButton("filterFav", -1), onClick: this.toggleFilterFav },
            React.createElement("i", { className: "fa fa-heart-o" })
          ),
          React.createElement(
            "button",
            { id: "completed", style: styleButton("filterRead", 1), onClick: this.toggleFilterRead },
            React.createElement("i", { className: "fa fa-check" })
          ),
          React.createElement(
            "button",
            { id: "non-completed", style: styleButton("filterRead", -1), onClick: this.toggleFilterRead },
            React.createElement("i", { className: "fa fa-times" })
          )
        ),
        deleteButton()
      );
    }
  }]);

  return ViewButtons;
}(React.Component);

module.exports.ViewButtons = ViewButtons;