class LocaleSelect extends React.Component {
  render() {
    let locale = this.props.state.locale
    return <select id='locale-select' value={locale} onChange={this.props.state.funcs.selectLocale}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  }
}

module.exports.LocaleSelect = LocaleSelect;
