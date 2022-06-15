import React from "react";
import "./App.css";
import Todo from "./Todo";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";
import BasicTabs from "./BasicTabs";

function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  add = (item) => {
    // const thisItem = this.state.items;
    // item.id = String(thisItem.length + 1);
    // item.done = false;
    // thisItem.push(item);
    // this.setState({ item: thisItem });
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    // const thisItem = this.state.items;
    // const newItems = thisItem.filter((e) => e.id !== item.id);
    // this.setState({ items: newItems }, () => {
    //   console.log("Update items : " + this.state.items);
    // });
    call("/todo", "DELETE", item).then((window.location.href = "/"));
  };

  update = (item) => {
    call("/todo", "PUT", item).then((window.location.href = "/"));
  };

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({
        items: response.data,
        loading: false,
      })
    );
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    // var todoItems = this.state.items.map((item, idx) => (
    //   <Todo item={item} key={item.id} />
    // ));

    var loadingPage = <h2>로딩중...</h2>;

    var todoListPage = (
      <div>
        <NavigationBar />
        {/* <BasicTabs /> */}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="todoList">{todoItems}</div>
        </Container>
      </div>
    );

    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
