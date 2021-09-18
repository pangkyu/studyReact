# 불변성을 지키는 이유와 업데이트 최적화

- 데이터를 업데이트하는 과정에서 불변성을 지켜야한다.

---

- 데이터 필터링 구현하기

```js
// file : src/App.js
import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Components {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: "김민준",
        phone: "010-0000-0000",
      },
      {
        id: 1,
        name: "홍길동",
        phone: "010-0000-0001",
      },
    ],
    keyword: "",
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) =>
        id === info.id ? { ...info, ...data } : info
      ),
    });
  };

  render() {
    const { information, keyword } = this.state;

    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색 할 이름ㅇ르 입력하세요 "
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```

- 현재 상태에서는 input에 입력을 했을때 업데이트가 필요한것은 input분이다.
  - 그러나 App 컴포넌트의 상태가 업데이트 되면, 컴포넌트의 리렌더링이 발생하고, 컴포넌트가 리렌더링이 되면 그 컴포넌트의 자식 컴포넌트도 리렌더링이 된다.

```js
// file: src/components/PhoneInfoList.js
...
 render() {
   console.log('render PhoneInfoList');
   const { data, onRemove, onUpdate } = this.props;
   const list = data.map(
     info => (
       <PhoneInfo
         key={info.id}
         info={info}
         onRemove={onRemove}
         onUpdate={onUpdate}
       />)
   );

   return (
     <div>
       {list}
     </div>
   );
 }
...
```

- 다음과 같이 코드를 입력하고 input창에서 입력을 할 때마다 renderPhoneInfoList가 콘솔에 출력된다.
- 리스트 내부의 아이템이 증가하면 가상 dom에 렌더링 하는 자원은 아낄 수 있으면 아끼는 것이 좋다.

  - 낭비되는 자원을 아끼기 위해서 shouldComponentUpdate LifeCycle API를 사용한다.

```js
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.data !== this.props.data;
    }

    render(){
        console.log('render PhoneInfoList');
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            info => (
                <PhoneInfo
                    key = {info.id}
                    info = {info}
                    onRemove = {onRemove}
                    onUpdate = {onUpdate}
                    />
            );

        return(
            <div>
                {list}
            </div>
        );
    }

    export default PhoneInfoList;
```

- 단순히 다음 받아올 data가 현재 data랑 다른 배열일 때 true로 설정하게 하면 된다.

- shouldComponentUpdate로 로직을 간단하게 작성할 수 있었던 이유 -> 불변성을 지켜줬기 때문.

---

- 불변성

  - 만약 배열을 직접 건드리면서 수정을 했다고 가정하면 !==하나로 비교를 끝낼 수가 없다.

  ```js
  const array = [1, 2, 3, 4];
  const sameArray = array;

  sameArray.push(5);
  console.log(array !== sameArray); /// false
  ```

  - 기존에 있던 배열이 복사되는 것이 아니라 똑같은 배열을 가르키고 있는 레퍼런스가 하나 만들어지는 것.

  - 그러나 불변성을 유지하면

  ```js
  const array = [1, 2, 3, 4];
  const differnetArray = [...array, 5];
  // 혹은 = array.concat(5)
  console.log(array !== diffenrentArray); // true
  ```

  - 바로바로 비교가 가능하다.

```js
// file: src/App.js
import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: "김민준",
        phone: "010-0000-0000",
      },
      {
        id: 1,
        name: "홍길동",
        phone: "010-0000-0001",
      },
    ],
    keyword: "",
  };
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        (info) =>
          id === info.id
            ? { ...info, ...data } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
            : info // 기존의 값을 그대로 렌더링
      ),
    });
  };
  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      (info) => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요.."
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```

- 지금 상황에서는 키워드 값에 따라 PhoneInfoList가 전달받는 data가 다르므로, 키워드 값이 바뀌면 shouldComponentUpdate도 true를 반환한다.
