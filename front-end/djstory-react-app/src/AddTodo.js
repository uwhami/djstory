import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } };
    this.add = props.add;
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "" } });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.onButtonClick();
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        {/* grid는 일반적으로 column갯수가 12개이며 xs는 차지하는 컬럼 수를 말한다. 아래는 11:1의 비율로 그리드가 한줄 차지하는 상태이다.
        grid가 두줄 이상일 때 xs는 합은 한줄을 의미하고 한 줄안에서 컬럼은 md로 나눠진다
        https://mui.com/material-ui/react-grid/ */}
        
        <Grid container>
          <Grid xs={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo hear"
              fullWidth
              onChange={this.onInputChange}
              onKeyUp={this.enterKeyEventHandler}
              value={this.state.item.title}
            />
          </Grid>
          <Grid xs={1} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
