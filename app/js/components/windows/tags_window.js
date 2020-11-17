var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagsWindow = function (_React$Component) {
  _inherits(TagsWindow, _React$Component);

  function TagsWindow() {
    _classCallCheck(this, TagsWindow);

    return _possibleConstructorReturn(this, (TagsWindow.__proto__ || Object.getPrototypeOf(TagsWindow)).apply(this, arguments));
  }

  _createClass(TagsWindow, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      if (state.tagsWindowOpened == false) return null;else {

        var booksIds = funcs.bookFilterFav(funcs.bookFilterRead(funcs.bookFilterAuthor(funcs.bookFilterSeries(funcs.bookFilterShelfs(state.books))))).map(function (a) {
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

        var checkedVal = function checkedVal(a) {
          return state.filterByTags.indexOf(a.tagId) != -1;
        };

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
                React.createElement("input", { type: "checkbox", className: "tagcheck", id: "tagcheck" + a.tagId, checked: checkedVal(a), onChange: funcs.changeTag }),
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
            { onClick: funcs.clearSelectedTags, className: "clearbutton" },
            funcs.loc().clear
          )
        );
      }
    }
  }]);

  return TagsWindow;
}(React.Component);

module.exports.TagsWindow = TagsWindow;