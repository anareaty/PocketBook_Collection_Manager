var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/lists/tag_list.js"),
    TagList = _window$reqAppJs.TagList;

var _window$reqAppJs2 = window.reqAppJs("components/buttons/new_tag_form.js"),
    NewTagForm = _window$reqAppJs2.NewTagForm;

var ViewAllTags = function (_React$Component) {
  _inherits(ViewAllTags, _React$Component);

  function ViewAllTags() {
    _classCallCheck(this, ViewAllTags);

    return _possibleConstructorReturn(this, (ViewAllTags.__proto__ || Object.getPrototypeOf(ViewAllTags)).apply(this, arguments));
  }

  _createClass(ViewAllTags, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      return React.createElement(
        "div",
        { className: "view" },
        React.createElement(
          "h1",
          null,
          funcs.loc().allTags
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(
            "button",
            { onClick: funcs.turnAllBooks },
            funcs.loc().allBooks
          ),
          React.createElement(NewTagForm, { state: state })
        ),
        React.createElement(TagList, { state: state })
      );
    }
  }]);

  return ViewAllTags;
}(React.Component);

module.exports.ViewAllTags = ViewAllTags;