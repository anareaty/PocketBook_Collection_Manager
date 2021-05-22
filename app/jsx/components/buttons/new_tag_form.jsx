const { addNewTagToDB, findLastTagId } = window.reqAppJs("async.js");

class NewTagForm extends React.Component {

  addNewTag = () => {
    let state = this.props.state
    let funcs = state.funcs
    let tags = [...state.tags]
    let tagNames = tags.map(a => a.tagName)
    newTagName = state.newTagName;
    if (newTagName == "") {
      newTagName = funcs.loc().newTag
    }
    if (tagNames.indexOf(newTagName) != -1) {
      let nameStart = newTagName;
      let num = 0;
      while (tagNames.indexOf(newTagName) != -1) {
        num++;
        newTagName = nameStart + " (" + num + ")";
      }
    }
    findLastTagId().then((lastId) => {
      newTagId = lastId + 1;
      let newTag = {tagId: newTagId, tagName: newTagName}
      tags.push(newTag)
      funcs.setMainState({tags, newTagName: ""})
      addNewTagToDB(newTagName, newTagId)
    })
  }

  inputNewTagName = (e) => {
    this.props.state.funcs.setMainState({newTagName: e.target.value})
  }

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    return <div id="newtagform" class={this.props.class}>
      <input type="text" onChange={this.inputNewTagName} value={state.newTagName} placeholder={funcs.loc().newTagName}/>
      <button id="addtag" onClick={this.addNewTag}>{funcs.loc().addTag}</button>
    </div>
  }
}

module.exports.NewTagForm = NewTagForm;
