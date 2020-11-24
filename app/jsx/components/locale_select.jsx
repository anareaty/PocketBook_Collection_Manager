const { saveLocale } = window.reqAppJs("async.js");

class LocaleSelect extends React.Component {

  selectLocale = (e) => {
    let index = e.target.selectedIndex
    let locale = e.target.options[index].value
    this.props.state.funcs.setMainState({locale})
    saveLocale(locale)
  }

  render() {
    let locale = this.props.state.locale
    return <select id='locale-select' value={locale} onChange={this.selectLocale}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  }
}

module.exports.LocaleSelect = LocaleSelect;
