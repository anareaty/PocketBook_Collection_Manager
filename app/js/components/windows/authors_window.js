var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("sort.js"),
    sort = _window$reqAppJs.sort,
    cyrillic = _window$reqAppJs.cyrillic;

var _window$reqAppJs2 = window.reqAppJs("bookfilter.js"),
    bookFilter = _window$reqAppJs2.bookFilter;

var AuthorsWindow = function (_React$Component) {
  _inherits(AuthorsWindow, _React$Component);

  function AuthorsWindow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AuthorsWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AuthorsWindow.__proto__ || Object.getPrototypeOf(AuthorsWindow)).call.apply(_ref, [this].concat(args))), _this), _this.changeAuthor = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var authorId = e.target.id.substr(12);
      var currentAuthor = state.currentAuthor;
      if (e.target.checked == true) {
        currentAuthor = authorId;
      } else if (e.target.checked == false && currentAuthor == authorId) {
        currentAuthor = undefined;
      } else {
        return;
      }
      funcs.setMainState({ currentAuthor: currentAuthor, renderBookChunks: 1 });
    }, _this.clearSelectedAuthors = function () {
      _this.props.state.funcs.setMainState({ currentAuthor: undefined, renderBookChunks: 1 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AuthorsWindow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      if (state.authorsWindowOpened == false) return null;else {

        var books = bookFilter(state, "authors");

        var authors = [].concat(_toConsumableArray(new Set(books.map(function (a) {
          return a.author;
        }))));
        authors = sort(authors, cyrillic);

        var checkedVal = function checkedVal(a) {
          if (state.currentAuthor == a) return true;else return false;
        };

        return React.createElement(
          "div",
          { className: "window", id: "authorswindow" },
          React.createElement(
            "h2",
            null,
            funcs.loc().selectAuthor
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            authors.map(function (a, i) {
              return React.createElement(
                "div",
                { key: i, id: "a-" + a, className: "authorrow" },
                React.createElement("input", { type: "checkbox", className: "authorcheck", id: "authorcheck-" + a, checked: checkedVal(a), onChange: _this2.changeAuthor }),
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
            { onClick: funcs.closeAllWindows, className: "closebutton" },
            funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: this.clearSelectedAuthors, className: "clearbutton" },
            funcs.loc().clear
          )
        );
      }
    }
  }]);

  return AuthorsWindow;
}(React.Component);

module.exports.AuthorsWindow = AuthorsWindow;