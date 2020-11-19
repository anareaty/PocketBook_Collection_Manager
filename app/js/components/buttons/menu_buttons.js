var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuButtons = function (_React$Component) {
  _inherits(MenuButtons, _React$Component);

  function MenuButtons() {
    _classCallCheck(this, MenuButtons);

    return _possibleConstructorReturn(this, (MenuButtons.__proto__ || Object.getPrototypeOf(MenuButtons)).apply(this, arguments));
  }

  _createClass(MenuButtons, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      var deleteButton = function deleteButton() {
        if (state.view == "books on shelf" && state.currentShelf != "noshelf") {
          return React.createElement(
            "button",
            { id: "deleteshelf", onClick: funcs.deleteShelf },
            funcs.loc().deleteShelf
          );
        } else return null;
      };

      var allBooksButton = function allBooksButton() {
        if (state.view == "books on shelf") {
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

      var styleFilter = function styleFilter(prop, value) {
        if (state[prop] != value) return { backgroundColor: "#ddd" };else return {};
      };

      var styleTagFilter = function styleTagFilter() {
        if (state.filterByTags.length != 0) return { backgroundColor: "#ddd" };else return {};
      };

      return React.createElement(
        "div",
        { id: "menubuttons" },
        React.createElement(
          "div",
          { id: "viewbuttons" },
          allBooksButton(),
          React.createElement(
            "button",
            { onClick: funcs.turnAllShelfs },
            funcs.loc().allShelfs
          ),
          React.createElement(
            "div",
            { id: "fav-and-read" },
            React.createElement(
              "button",
              { id: "favorite", style: styleButton("filterFav", 1), onClick: funcs.toggleFilterFav },
              React.createElement("i", { className: "fa fa-heart" })
            ),
            React.createElement(
              "button",
              { id: "non-favorite", style: styleButton("filterFav", -1), onClick: funcs.toggleFilterFav },
              React.createElement("i", { className: "fa fa-heart-o" })
            ),
            React.createElement(
              "button",
              { id: "completed", style: styleButton("filterRead", 1), onClick: funcs.toggleFilterRead },
              React.createElement("i", { className: "fa fa-check" })
            ),
            React.createElement(
              "button",
              { id: "non-completed", style: styleButton("filterRead", -1), onClick: funcs.toggleFilterRead },
              React.createElement("i", { className: "fa fa-times" })
            )
          ),
          deleteButton()
        ),
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
            { onClick: funcs.selectTags, style: styleTagFilter() },
            funcs.loc().filterByTags
          ),
          React.createElement(
            "button",
            { onClick: funcs.selectSeries, style: styleFilter("currentSeries", undefined) },
            funcs.loc().filterBySeries
          ),
          React.createElement(
            "button",
            { onClick: funcs.selectAuthor, style: styleFilter("currentAuthor", undefined) },
            funcs.loc().filterByAuthors
          )
        ),
        React.createElement(
          "div",
          { id: "sortbuttons" },
          React.createElement(
            "span",
            null,
            funcs.loc().sort
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortByName, style: styleButton("sort", "name") },
            funcs.loc().byName
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortByAuthor, style: styleButton("sort", "author") },
            funcs.loc().byAuthor
          ),
          React.createElement(
            "button",
            { onClick: funcs.sortBySeriesNum, style: styleButton("sort", "series number") },
            funcs.loc().byNumInSeries
          )
        )
      );
    }
  }]);

  return MenuButtons;
}(React.Component);

module.exports.MenuButtons = MenuButtons;