import React from "react";
import "./App.css";
import Todo from "./Todo";
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./AddTodo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: "0", title: "Hello World 1", done: true },
        { id: "1", title: "Hello World 2", done: false },
      ],
    };
  }

  add = (item) => {
    const thisItem = this.state.items;
    item.id = String(thisItem.length + 1);
    item.done = false;
    thisItem.push(item);
    this.setState({ item: thisItem });
  };

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} />
          ))}
        </List>
      </Paper>
    );

    // var todoItems = this.state.items.map((item, idx) => (
    //   <Todo item={item} key={item.id} />
    // ));

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          {todoItems}
        </Container>
      </div>
    );
  }
}

export default App;
