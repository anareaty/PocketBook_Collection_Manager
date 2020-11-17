var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/windows/shelf_window.js"),
    ShelfWindow = _window$reqAppJs.ShelfWindow;

var _window$reqAppJs2 = window.reqAppJs("components/windows/mass_shelf_change_window.js"),
    MassShelfChangeWindow = _window$reqAppJs2.MassShelfChangeWindow;

var _window$reqAppJs3 = window.reqAppJs("components/windows/tags_window.js"),
    TagsWindow = _window$reqAppJs3.TagsWindow;

var _window$reqAppJs4 = window.reqAppJs("components/windows/series_window.js"),
    SeriesWindow = _window$reqAppJs4.SeriesWindow;

var _window$reqAppJs5 = window.reqAppJs("components/windows/authors_window.js"),
    AuthorsWindow = _window$reqAppJs5.AuthorsWindow;

var AllWindows = function (_React$Component) {
  _inherits(AllWindows, _React$Component);

  function AllWindows() {
    _classCallCheck(this, AllWindows);

    return _possibleConstructorReturn(this, (AllWindows.__proto__ || Object.getPrototypeOf(AllWindows)).apply(this, arguments));
  }

  _createClass(AllWindows, [{
    key: "render",
    value: function render() {
      var state = this.props.state;

      return React.createElement(
        "div",
        { id: "allwindows" },
        React.createElement(ShelfWindow, { state: state }),
        React.createElement(MassShelfChangeWindow, { state: state }),
        React.createElement(TagsWindow, { state: state }),
        React.createElement(SeriesWindow, { state: state }),
        React.createElement(AuthorsWindow, { state: state })
      );
    }
  }]);

  return AllWindows;
}(React.Component);

module.exports.AllWindows = AllWindows;