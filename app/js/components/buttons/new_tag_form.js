var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    addNewTagToDB = _window$reqAppJs.addNewTagToDB,
    findLastTagId = _window$reqAppJs.findLastTagId;

var NewTagForm = function (_React$Component) {
  _inherits(NewTagForm, _React$Component);

  function NewTagForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NewTagForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewTagForm.__proto__ || Object.getPrototypeOf(NewTagForm)).call.apply(_ref, [this].concat(args))), _this), _this.addNewTag = function () {
      var state = _this.props.state;
      var funcs = state.funcs;
      var tags = [].concat(_toConsumableArray(state.tags));
      var tagNames = tags.map(function (a) {
        return a.tagName;
      });
      newTagName = state.newTagName;
      if (newTagName == "") {
        newTagName = funcs.loc().newTag;
      }
      if (tagNames.indexOf(newTagName) != -1) {
        var nameStart = newTagName;
        var num = 0;
        while (tagNames.indexOf(newTagName) != -1) {
          num++;
          newTagName = nameStart + " (" + num + ")";
        }
      }
      findLastTagId().then(function (lastId) {
        newTagId = lastId + 1;
        var newTag = { tagId: newTagId, tagName: newTagName };
        tags.push(newTag);
        funcs.setMainState({ tags: tags, newTagName: "" });
        addNewTagToDB(newTagName, newTagId);
      });
    }, _this.inputNewTagName = function (e) {
      _this.props.state.funcs.setMainState({ newTagName: e.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NewTagForm, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      return React.createElement(
        "div",
        { id: "newtagform", "class": this.props.class },
        React.createElement("input", { type: "text", onChange: this.inputNewTagName, value: state.newTagName, placeholder: funcs.loc().newTagName }),
        React.createElement(
          "button",
          { id: "addtag", onClick: this.addNewTag },
          funcs.loc().addTag
        )
      );
    }
  }]);

  return NewTagForm;
}(React.Component);

module.exports.NewTagForm = NewTagForm;