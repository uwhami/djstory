import React from "react";
import "./App.css";
import Todo from "./Todo";
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./AddTodo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  add = (item) => {
    const thisItem = this.state.items;
    item.id = String(thisItem.length + 1);
    item.done = false;
    thisItem.push(item);
    this.setState({ item: thisItem });
  };

  delete = (item) => {
    const thisItem = this.state.items;
    const newItems = thisItem.filter((e) => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      console.log("Update items : " + this.state.items);
    });
  };

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:8080/todo", requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({ items: response.data });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} />
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
          <div className="todoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
