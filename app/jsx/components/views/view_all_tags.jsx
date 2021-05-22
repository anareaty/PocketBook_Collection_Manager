const {TagList} = window.reqAppJs("components/lists/tag_list.js");
const {NewTagForm} = window.reqAppJs("components/buttons/new_tag_form.js");


class ViewAllTags extends React.Component {

  render() {
    let state = this.props.state;
    let funcs = state.funcs;

    return <div  className="view">
      <h1>{funcs.loc().allTags}</h1>
	    <div id="viewbuttons">
	      <button onClick={funcs.turnAllBooks}>{funcs.loc().allBooks}</button>
      <NewTagForm state={state}/>
      </div>
      <TagList state={state}/>
    </div>
  }
}


module.exports.ViewAllTags = ViewAllTags;
