const {NewTagForm} = window.reqAppJs("components/buttons/new_tag_form.js");

class MassTagChangeWindow extends React.Component {

  massChange = (e) => {
    let state = this.props.state;
    let funcs = state.funcs;
    let tagId = Number(e.target.id.substr(15));
    let tagsInBooks = [...state.tagsInBooks];
	  let checkedBooks = state.checkedBooks;
	  let changeMethod = state.changeMethod;
    let currentTag = state.currentTag
	  for (let i=0; i<checkedBooks.length; i++) {
	    tagsInBooks = funcs.changeTag(tagsInBooks, checkedBooks[i], tagId, changeMethod)
	  }
    if (currentTag == "notag" && changeMethod == "addtag") {
      checkedBooks = [];
    }
    if (currentTag == tagId && changeMethod == "deltag") {
      checkedBooks = [];
    }
	  funcs.setMainState({tagsInBooks, checkedBooks, changeMethod: undefined});
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    if (state.changeMethod != undefined && state.changeMethod != "add" && state.changeMethod != "del") {

      const header = () => {
        if (state.changeMethod == "addtag") return funcs.loc().addTag
        else return funcs.loc().delTag
      }

	    let tags = state.tags
  //    tags = tags.filter(a => a.tagId != state.currentTag)

	    return <div className="window">
	      <h2>{header()}</h2>
        <div className="scrolled">
          {tags.map((a) => <div key={a.tagId} id={"mtc" + a.tagId} className="tagchangerow">
            <button id={"tagchangebutton" + a.tagId} className="tagchangebutton" onClick={this.massChange}>{a.tagName}</button>
          </div>)}
          <NewTagForm state={state} class="new-shelf-form-in-window"/>
        </div>
		    <button onClick={funcs.closeAllWindows} className="closebutton">{funcs.loc().close}</button>
      </div>
	  } else return null
  }
}

module.exports.MassTagChangeWindow = MassTagChangeWindow;
