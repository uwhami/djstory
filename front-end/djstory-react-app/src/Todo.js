import React from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
  }

  render() {
    const item = this.state.item;

    return (
      // <div className="Todo">
      //   <input
      //     type="checkbox"
      //     id={this.state.item.id}
      //     name={this.state.item.id}
      //     checked={this.state.item.done}
      //   />
      //   <label id={this.state.item.id}>{this.state.item.title}</label>
      // </div>

      <ListItem>
        <Checkbox checked={item.done} disableRipple />
        {/* disableRipple이 없으면 클릭할때 물결처럼 퍼짐 */}
        <ListItemText>
          <InputBase
            ㅎ={{ "aria-label": "naked" }}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          {/* aria-label은 alt 같은 거. 눈에는 안보이지만 브라우저에 전달되면 좋은 정보 */}
          <iconButton aria-label="Delete Todo">
            <DeleteForeverIcon />
          </iconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
