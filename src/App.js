// import "./App.css";

// function App() {
//   return <div className="App">hello react dd</div>;
// }

// export default App;

import React, { Component } from "react";
import "./App.css";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
// class Subject extends Component {
//   render() {
//     return (
//       <header>
//         <h1>{this.props.title}</h1>
//         {this.props.sub}
//       </header>
//     );
//   }
// }

class App extends Component {
  //먼저 초기화 시켜주고싶은 함수
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "web", sub: "world" },
      welcome: { title: "welcome", desc: "hello react" },
      contents: [
        { id: 1, title: "HTML", desc: "html sdfdd" },
        { id: 2, title: "CSS", desc: "css sdfdd" },
        { id: 3, title: "JAVA", desc: "java sdfdd" },
      ],
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;

            //concat은 원본데이터를 쓰지않고 바꿀 수 있다.
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
            });
            console.log(_title, _desc);
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;

            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
            });
            console.log(_title, _desc);
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    console.log("app render");

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            //Number()숫자로 지정~~
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm()) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < this.state.contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
