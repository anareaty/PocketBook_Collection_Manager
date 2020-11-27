var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$reqAppJs = window.reqAppJs("components/lists/shelf_list.js"),
    ShelfList = _window$reqAppJs.ShelfList;

var _window$reqAppJs2 = window.reqAppJs("components/buttons/new_shelf_form.js"),
    NewShelfForm = _window$reqAppJs2.NewShelfForm;

var _window$reqAppJs3 = window.reqAppJs("async.js"),
    addNewShelfToDB = _window$reqAppJs3.addNewShelfToDB,
    findLastShelfId = _window$reqAppJs3.findLastShelfId;

var ViewAllShelfs = function (_React$Component) {
  _inherits(ViewAllShelfs, _React$Component);

  function ViewAllShelfs() {
    _classCallCheck(this, ViewAllShelfs);

    return _possibleConstructorReturn(this, (ViewAllShelfs.__proto__ || Object.getPrototypeOf(ViewAllShelfs)).apply(this, arguments));
  }

  _createClass(ViewAllShelfs, [{
    key: "render",


    /*
      addNewShelf = () => {
        let state = this.props.state
        let funcs = state.funcs
        let shelfs = [...state.shelfs]
        let shelfNames = shelfs.map(a => a.shelfName)
        newShelfName = state.newShelfName;
        if (newShelfName == "") {
          newShelfName = funcs.loc().newShelf
        }
        if (shelfNames.indexOf(newShelfName) != -1) {
          let nameStart = newShelfName;
          let num = 0;
          while (shelfNames.indexOf(newShelfName) != -1) {
            num++;
            newShelfName = nameStart + " (" + num + ")";
          }
        }
        findLastShelfId().then((lastId) => {
          newShelfId = lastId + 1;
          let newShelf = {shelfId: newShelfId, shelfName: newShelfName}
          shelfs.push(newShelf)
          funcs.setMainState({shelfs, newShelfName: ""})
          addNewShelfToDB(newShelfName, newShelfId)
        })
      }
    
      inputNewShelfName = (e) => {
        this.props.state.funcs.setMainState({newShelfName: e.target.value})
      }
      */

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
          React.createElement(NewShelfForm, { state: state })
        ),
        React.createElement(ShelfList, { state: state })
      );
    }
  }]);

  return ViewAllShelfs;
}(React.Component);

module.exports.ViewAllShelfs = ViewAllShelfs;