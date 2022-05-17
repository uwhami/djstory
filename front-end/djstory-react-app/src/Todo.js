import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { id: 0, title: "Hello World 1", done: true } };
  }
  render() {
    return (
      <div className="Todo">
        <input
          type="checkbox"
          id={this.state.item.id}
          name={this.state.item.id}
          value={this.state.item.done}
        />
        <label id={this.state.item.id}>{this.state.item.title}</label>
      </div>
    );
  }
}

export default Todo;
