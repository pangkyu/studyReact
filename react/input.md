# input 상태 관리하기

---

```js
// file: src/components/PhoneForm.js
import React, { Component } from "react";

class PhoneForm extends Component {
  state = {
    name: "",
    phone: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>
          {this.state.name} {this.state.phone}
        </div>
      </form>
    );
  }
}

export default PhoneForm;
```

- onChange 이벤트가 발생하면, e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어올 수 있다.
- onChange : input의 텍스트 값이 바뀔 때마다 발생하는 이벤트입니다.

◆ input이 여러개일 때, 처리하는 법

- input의 name 속성을 사용. (또 다른 이벤트 핸들러 함수를 만들어도 무방)
  - name을 부여함으로 각 input을 구분할 수 있다.
  - name의 값은 event.target.name 으로 조회할 수 있다.

---

- 부모 컴포넌트에게 정보전달하기
  - state 안에 있는 값들을 부모 컴포넌트에게 전달해줘야 한다.
    - 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용한다.

```js
// App.js
import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  };
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
      </div>
    );
  }
}

export default App;
```

```js
    // PhoneForm.js
    import React, { Component } from 'react';

    class PhoneForm extends Component {
        state = {
            name : '',
            phone : ''
        }
        handleChange = (e) => {
            this.setState({
                [e.target.name] : e.target.value
            })
        }
        handleSubmit = (e) => {
            e.preventDefault(); // 페이지 리로딩을 방지하는 코드
            this.props.onCreate(this.state); // 상태값을 onCreate를 통해 부모에게 전달
            this.setState({ // 상태초기화
                name : '',
                phone: ''
            })
        }
    }
    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
                <input
                    placeholder = "이름"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                    name = "name"
                />
                <input
                    placehodler = "전화번호"
                    value = {this.state.phone}
                    onChange = {this.handleChange}
                    name = "phone"
                />
                <button type = "submit">등록</button>
            </form>
        );
    }

    export default PhoneForm;
```

- form에서 submit이 발생하면 페이지를 다시 불러오게되는데 e.preventDefault()로 이를 막음
- props로 받은 onCreate함수를 호출, 상태값을 초기화해준다.
