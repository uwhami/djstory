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

      //* disableRipple이 없으면 클릭할때 물결처럼 퍼짐 */
      //{/* aria-label은 alt 같은 거. 눈에는 안보이지만 브라우저에 전달되면 좋은 정보 */}

      <ListItem>
        <Checkbox checked={item.done} disableRipple />

        <ListItemText>
          <InputBase
            inputProps={{ "aria-label": "naked" }}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo">
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
