import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
        <Checkbox checked={item.done} />
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
        <DeleteForeverIcon />
      </ListItem>
    );
  }
}

export default Todo;
