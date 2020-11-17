var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangeButtons = function (_React$Component) {
  _inherits(ChangeButtons, _React$Component);

  function ChangeButtons() {
    _classCallCheck(this, ChangeButtons);

    return _possibleConstructorReturn(this, (ChangeButtons.__proto__ || Object.getPrototypeOf(ChangeButtons)).apply(this, arguments));
  }

  _createClass(ChangeButtons, [{
    key: "render",
    value: function render() {
      var state = this.props.state;
      var funcs = state.funcs;

      if (state.checkedBooks.length != 0) {
        var delText = function delText() {
          if (state.currentShelf == undefined || state.currentShelf == "noshelf") return funcs.loc().delFromShelf;else return funcs.loc().delFromAnotherShelf;
        };

        var delCurrent = function delCurrent() {
          if (state.currentShelf != undefined && state.currentShelf != "noshelf") {
            return React.createElement(
              "button",
              { id: "delcurrent", onClick: funcs.delFromCurrent },
              funcs.loc().delFromThisShelf
            );
          }
        };

        return React.createElement(
          "div",
          { id: "changebuttons" },
          React.createElement(
            "button",
            { id: "add", onClick: funcs.selectChangeMethod },
            funcs.loc().addToShelf
          ),
          React.createElement(
            "button",
            { id: "del", onClick: funcs.selectChangeMethod },
            delText()
          ),
          delCurrent(),
          React.createElement(
            "button",
            { id: "fav-all", onClick: funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart" })
          ),
          React.createElement(
            "button",
            { id: "unfav-all", onClick: funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-heart-o" })
          ),
          React.createElement(
            "button",
            { id: "complete-all", onClick: funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-check" })
          ),
          React.createElement(
            "button",
            { id: "uncomplete-all", onClick: funcs.changeSettingsAll },
            React.createElement("i", { className: "fa fa-times" })
          )
        );
      } else return null;
    }
  }]);

  return ChangeButtons;
}(React.Component);

module.exports.ChangeButtons = ChangeButtons;