var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/lists/shelf_list.js"),
    ShelfList = _window$reqAppJs.ShelfList;

var _window$reqAppJs2 = window.reqAppJs("async.js"),
    addNewShelfToDB = _window$reqAppJs2.addNewShelfToDB,
    findLastShelfId = _window$reqAppJs2.findLastShelfId;

var ViewAllShelfs = function (_React$Component) {
  _inherits(ViewAllShelfs, _React$Component);

  function ViewAllShelfs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ViewAllShelfs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewAllShelfs.__proto__ || Object.getPrototypeOf(ViewAllShelfs)).call.apply(_ref, [this].concat(args))), _this), _this.addNewShelf = function () {
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

  _createClass(ViewAllShelfs, [{
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
          funcs.loc().allShelfs
        ),
        React.createElement(
          "div",
          { id: "viewbuttons" },
          React.createElement(
            "button",
            { onClick: funcs.turnAllBooks },
            funcs.loc().allBooks
          ),
          React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", onChange: this.inputNewShelfName, value: state.newShelfName, placeholder: funcs.loc().newShelfName }),
            React.createElement(
              "button",
              { id: "addshelf", onClick: this.addNewShelf },
              funcs.loc().addShelf
            )
          )
        ),
        React.createElement(ShelfList, { state: state })
      );
    }
  }]);

  return ViewAllShelfs;
}(React.Component);

module.exports.ViewAllShelfs = ViewAllShelfs;