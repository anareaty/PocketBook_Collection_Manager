var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/buttons/viewbuttons.js"),
    ViewButtons = _window$reqAppJs.ViewButtons;

var _window$reqAppJs2 = window.reqAppJs("components/buttons/selectbuttons.js"),
    SelectButtons = _window$reqAppJs2.SelectButtons;

var _window$reqAppJs3 = window.reqAppJs("components/buttons/sortbuttons.js"),
    SortButtons = _window$reqAppJs3.SortButtons;

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

      return React.createElement(
        "div",
        { id: "menubuttons" },
        React.createElement(ViewButtons, { state: state }),
        React.createElement(SelectButtons, { state: state }),
        React.createElement(SortButtons, { state: state })
      );
    }
  }]);

  return MenuButtons;
}(React.Component);

module.exports.MenuButtons = MenuButtons;