var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("bookfilter.js"),
    bookFilter = _window$reqAppJs.bookFilter;

var TagsWindow = function (_React$Component) {
  _inherits(TagsWindow, _React$Component);

  function TagsWindow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TagsWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TagsWindow.__proto__ || Object.getPrototypeOf(TagsWindow)).call.apply(_ref, [this].concat(args))), _this), _this.changeTag = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var tagId = Number(e.target.id.substr(8));
      var includeTags = [].concat(_toConsumableArray(state.includeTags));
      var excludeTags = [].concat(_toConsumableArray(state.excludeTags));

      var indexIncluded = includeTags.indexOf(tagId);
      var indexExcluded = excludeTags.indexOf(tagId);

      if (indexIncluded != -1) {
        includeTags.splice(indexIncluded, 1);
        excludeTags.push(tagId);
      } else if (indexExcluded != -1) {
        excludeTags.splice(indexExcluded, 1);
      } else {
        includeTags.push(tagId);
      }

      funcs.setMainState({ includeTags: includeTags, excludeTags: excludeTags, renderBookChunks: 1 });
    }, _this.isTagSelected = function (a) {
      var state = _this.props.state;
      var includeTags = state.includeTags;
      var excludeTags = state.excludeTags;

      if (includeTags.indexOf(a.tagId) != -1) {
        return "tagcheck fa fa-check-square-o";
      } else if (excludeTags.indexOf(a.tagId) != -1) {
        return "tagcheck fa fa-minus-square-o";
      } else {
        return "tagcheck fa fa-square-o";
      }
    }, _this.clearSelectedTags = function () {
      _this.props.state.funcs.setMainState({ includeTags: [], excludeTags: [], renderBookChunks: 1 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TagsWindow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      if (state.tagsWindowOpened == false) return null;else {
        var booksIds = bookFilter(state, "tags").map(function (a) {
          return a.bookId;
        });
        var tagsIds = state.tagsInBooks.filter(function (a) {
          return booksIds.indexOf(a.bookId) != -1;
        }).map(function (a) {
          return a.tagId;
        });
        var tags = state.tags.filter(function (a) {
          return tagsIds.indexOf(a.tagId) != -1;
        });

        return React.createElement(
          "div",
          { className: "window", id: "tagswindow" },
          React.createElement(
            "h2",
            null,
            funcs.loc().selectTags
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            tags.map(function (a) {
              return React.createElement(
                "div",
                { key: a.tagId, id: "t" + a.tagId, className: "tagrow" },
                React.createElement("span", { id: "tagcheck" + a.tagId, className: _this2.isTagSelected(a), onClick: _this2.changeTag }),
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
            { onClick: funcs.closeAllWindows, className: "closebutton" },
            funcs.loc().close
          ),
          React.createElement(
            "button",
            { onClick: this.clearSelectedTags, className: "clearbutton" },
            funcs.loc().clear
          )
        );
      }
    }
  }]);

  return TagsWindow;
}(React.Component);

module.exports.TagsWindow = TagsWindow;