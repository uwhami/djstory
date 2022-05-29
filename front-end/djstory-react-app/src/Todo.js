import React from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
    this.update = props.update;
  }

  checkboxEvent = () => {
    let thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem });
  };

  offReadOnly = () => {
    this.setState({ readOnly: false }, () => {
      console.log("readOnly : " + this.state.readOnly);
    });
  };

  onChangeTodo = (e) => {
    let thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  };

  enterKeyEvent = (e) => {
    if (e.key === "Enter") {    
      this.setState({ readOnly: true });
      this.update(this.state.item);
    }
  };

  deleteTodo = () => {
    this.delete(this.state.item);
  };

  render() {
    const item = this.state.item;

    return (
      //* disableRipple이 없으면 클릭할때 물결처럼 퍼짐 */
      //{/* aria-label은 alt 같은 거. 눈에는 안보이지만 브라우저에 전달되면 좋은 정보 */}

      <ListItem>
        <Checkbox
          checked={item.done}
          onClick={this.checkboxEvent}
          disableRipple
        />

        <ListItemText>
          <InputBase
            inputProps={{
              "aria-label": "naked",
              readOnly: this.state.readOnly,
            }}
            onClick={this.offReadOnly}
            onChange={this.onChangeTodo}
            onKeyDown={this.enterKeyEvent}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo" onClick={this.deleteTodo}>
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
