var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    saveLocale = _window$reqAppJs.saveLocale;

var LocaleSelect = function (_React$Component) {
  _inherits(LocaleSelect, _React$Component);

  function LocaleSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LocaleSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LocaleSelect.__proto__ || Object.getPrototypeOf(LocaleSelect)).call.apply(_ref, [this].concat(args))), _this), _this.selectLocale = function (e) {
      var index = e.target.selectedIndex;
      var locale = e.target.options[index].value;
      _this.props.state.funcs.setMainState({ locale: locale });
      saveLocale(locale);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LocaleSelect, [{
    key: "render",
    value: function render() {
      var locale = this.props.state.locale;
      return React.createElement(
        "select",
        { id: "locale-select", value: locale, onChange: this.selectLocale },
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

module.exports.LocaleSelect = LocaleSelect;