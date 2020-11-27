var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("async.js"),
    addNewShelfToDB = _window$reqAppJs.addNewShelfToDB,
    findLastShelfId = _window$reqAppJs.findLastShelfId;

var NewShelfForm = function (_React$Component) {
  _inherits(NewShelfForm, _React$Component);

  function NewShelfForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NewShelfForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewShelfForm.__proto__ || Object.getPrototypeOf(NewShelfForm)).call.apply(_ref, [this].concat(args))), _this), _this.addNewShelf = function () {
      var state = _this.props.state;
      var funcs = state.funcs;
      var shelfs = [].concat(_toConsumableArray(state.shelfs));
      var shelfNames = shelfs.map(function (a) {
        return a.shelfName;
      });
      newShelfName = state.newShelfName;
      if (newShelfName == "") {
        newShelfName = funcs.loc().newShelf;
      }
      if (shelfNames.indexOf(newShelfName) != -1) {
        var nameStart = newShelfName;
        var num = 0;
        while (shelfNames.indexOf(newShelfName) != -1) {
          num++;
          newShelfName = nameStart + " (" + num + ")";
        }
      }
      findLastShelfId().then(function (lastId) {
        newShelfId = lastId + 1;
        var newShelf = { shelfId: newShelfId, shelfName: newShelfName };
        shelfs.push(newShelf);
        funcs.setMainState({ shelfs: shelfs, newShelfName: "" });
        addNewShelfToDB(newShelfName, newShelfId);
      });
    }, _this.inputNewShelfName = function (e) {
      _this.props.state.funcs.setMainState({ newShelfName: e.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NewShelfForm, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      return React.createElement(
        "div",
        { id: "newshelfform", "class": this.props.class },
        React.createElement("input", { type: "text", onChange: this.inputNewShelfName, value: state.newShelfName, placeholder: funcs.loc().newShelfName }),
        React.createElement(
          "button",
          { id: "addshelf", onClick: this.addNewShelf },
          funcs.loc().addShelf
        )
      );
    }
  }]);

  return NewShelfForm;
}(React.Component);

module.exports.NewShelfForm = NewShelfForm;