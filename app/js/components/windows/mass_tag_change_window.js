var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/buttons/new_tag_form.js"),
    NewTagForm = _window$reqAppJs.NewTagForm;

var MassTagChangeWindow = function (_React$Component) {
  _inherits(MassTagChangeWindow, _React$Component);

  function MassTagChangeWindow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MassTagChangeWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MassTagChangeWindow.__proto__ || Object.getPrototypeOf(MassTagChangeWindow)).call.apply(_ref, [this].concat(args))), _this), _this.massChange = function (e) {
      var state = _this.props.state;
      var funcs = state.funcs;
      var tagId = Number(e.target.id.substr(15));
      var tagsInBooks = [].concat(_toConsumableArray(state.tagsInBooks));
      var checkedBooks = state.checkedBooks;
      var changeMethod = state.changeMethod;
      var currentTag = state.currentTag;
      for (var i = 0; i < checkedBooks.length; i++) {
        tagsInBooks = funcs.changeTag(tagsInBooks, checkedBooks[i], tagId, changeMethod);
      }
      if (currentTag == "notag" && changeMethod == "addtag") {
        checkedBooks = [];
      }
      if (currentTag == tagId && changeMethod == "deltag") {
        checkedBooks = [];
      }
      funcs.setMainState({ tagsInBooks: tagsInBooks, checkedBooks: checkedBooks, changeMethod: undefined });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MassTagChangeWindow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var funcs = state.funcs;

      if (state.changeMethod != undefined && state.changeMethod != "add" && state.changeMethod != "del") {

        var header = function header() {
          if (state.changeMethod == "addtag") return funcs.loc().addTag;else return funcs.loc().delTag;
        };

        var tags = state.tags;
        //    tags = tags.filter(a => a.tagId != state.currentTag)

        return React.createElement(
          "div",
          { className: "window" },
          React.createElement(
            "h2",
            null,
            header()
          ),
          React.createElement(
            "div",
            { className: "scrolled" },
            tags.map(function (a) {
              return React.createElement(
                "div",
                { key: a.tagId, id: "mtc" + a.tagId, className: "tagchangerow" },
                React.createElement(
                  "button",
                  { id: "tagchangebutton" + a.tagId, className: "tagchangebutton", onClick: _this2.massChange },
                  a.tagName
                )
              );
            }),
            React.createElement(NewTagForm, { state: state, "class": "new-shelf-form-in-window" })
          ),
          React.createElement(
            "button",
            { onClick: funcs.closeAllWindows, className: "closebutton" },
            funcs.loc().close
          )
        );
      } else return null;
    }
  }]);

  return MassTagChangeWindow;
}(React.Component);

module.exports.MassTagChangeWindow = MassTagChangeWindow;