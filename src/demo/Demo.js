import React from "react";
import { ControlledEditor } from "@monaco-editor/react";

class App extends React.Component {
  handleEditorChange = (ev, value) => {
    console.log(value)
  };

  render() {
    return (
      <ControlledEditor
        height="90vh"
        value={"// try to write e%v%a%l somewhere 😈 \n"}
        onChange={this.handleEditorChange}
        language="javascript"
      />
    );
  }
}

export default App;