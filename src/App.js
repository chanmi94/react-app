// import "./App.css";

// function App() {
//   return <div className="App">hello react dd</div>;
// }

// export default App;

import React, { Component } from "react";
import "./App.css";

import TOC from "./components/TOC";

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class App extends Component {
  //먼저 초기화 시켜주고싶은 함수
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: "web", sub: "world" },
      contents: [
        { id: 1, title: "HTML", desc: "html sdfdd" },
        { id: 2, title: "CSS", desc: "css sdfdd" },
        { id: 3, title: "JAVA", desc: "java sdfdd" },
      ],
    };
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
        ></Subject>
        <Subject title="web" sub="react"></Subject>
        <TOC data={this.state.contents}></TOC>
      </div>
    );
  }
}

export default App;
