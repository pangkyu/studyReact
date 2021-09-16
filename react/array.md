# 배열 다루기

- 리액트에서는 state 내부의 값을 직접적으로 수정하면 절대로 안된다. (불변성 유지)
  ※ 1. 불변성을 유지하는 이유 - react, redux는 setState, dispatch가 되었을 때 재렌더링이 발생함 - 불필요한 재렌더링을 피하기 위해 shouldComponentUpdate, useCallback(react-hooks)를 쓴다.

  ※ 2. 불변성을 유지하는 방식 - spread 문법 - 해당 배열을 펴줘서 값들만 가져오는 방식

           ```js
               setState({
                 arr : [...arr]
               })
            ```

       - concat() 함수
         - arr.push()함수를 쓰면 상태에 접근해 바뀌어버려 불변성이 깨지므로 arr를 변경하지 않는 concat()를 쓴다.

           ```js
               setState({
                   arr : arr.concat(4)
               })
           ```

  ※ 3. 불변성의 단점 보완

  - 불변성을 계속 유지하려고 하면 쓸데없이 코드가 길어지고, 복잡한 구조의 상태는 접근조차 어려워짐.
    ==> 불변성을 유지하면서 코드를 단순하고 직관적으로 짤 수 있는 라이브러리(immutable, immer)를 사용

            ```js
             import produce from 'immer'; //로 임포트시키고 사용하면 된다.
            ```
             - produce함수를 사용할 때는 첫번째 파라미터에는 수정하고 싶은 상태, 두번째는 어떻게 업데이트하고 싶을지 정의하는 함수를 넣는다.

---

- 데이터 추가

```js
  {
    id : 0,
    name : '이름', s
    phone : '010-0000-0000'
  }
```

```js
import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";

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
  };
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;
```

- id 값의 경우, 컴포넌트의 일반 클래스 내부 변수로서 선언하였다.
- 컴포넌트 내부에서 필요한 값 중에서, 렌더링 되는 것과 상관 없는것들은 굳이 state에 넣을 필요가 없다.

---

- 데이터 렌더링

  ※ map 함수
  ex) 다음과 같은 배열이 존재

  ```js
  const a = [1, 2, 3, 4, 5];
  // 여기있는 원소들에 2씩 곱하고 싶을 때.

  //방법 1)
  const a = [1, 2, 3, 4, 5];
  const b = [];

  b.forEach((number) => b.push(number * 2));

  // 방법 2)
  const a = [1, 2, 3, 4, 5];
  const b = a.map((number) => number * 2);
  ```

  - map() 메서드는 배열 내의 모든 요소 각각에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

  ```js
    //구문
    arr.map(callback(currnetValue[, index[, array]])[, thisArg])
  ```

      callback : 새로운 배열 요소를 생성하는 함수.
        currentValue : 처리할 현재 요소
        index (Optional) : 처리할 현재 요소의 인덱스
        array (Optional) : map()을 호출한 배열
      thisArg (Optional) : callback을 실행할 떄 this로 사용되는 값

      반환값 : 배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열

---

- 컴포넌트 만들기

```js
  import React, { Component } from 'react';

  class PhoneInfo extends Component { // 각 전화번호 정보를 보여주는 컴포넌트
    static defaultProps = {
      info : {
        name : '이름',
        phone : '010-0000-0000',
        id : 0
      }
    }

    render(){
      const style = {
        border : '1px solid black',
        padding ; '8px',
        margin : '8px'
      };

      const {
        name, phone, id
      } = this.props.info;

      return (
        <div style = {style}>
          <div><b><{name}</b></div>
          <div>{phone}</div>
        </div>
      );
    }
  }

  export default PhoneInfo;
```

- info라는 객체를 props로 받아와서 렌더링을 한다.
- 이때, 실수로 info 값을 전달해주는것을 까먹게 된다면 컴포넌트가 크래쉬 된다. (info가 undefined 일때는 비구조화 할당을 통해 내부의 값을 받아올 수 없기 때문이다. )
  ==> defaultProps를 통해 info의 기본값을 설정

```js
import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
  };
  render() {
    const { data } = this.props;
    const list = data.map((info) => <PhoneInfo key={info.id} info={info} />);

    return <div>{list}</div>;
  }
}
export default PhoneInfoList;
```

    - data라는 배열을 가져와서 map을 통해 JSX로 변환을 한다. 이 과정에서, key라는 값도 설정이 됨. (key : 리액트에서 배열을 렌더링할때 꼭 필요한 값)

    ```js
      <div>A</div> // key = {0}
      <div>B</div> // key = {1}
      <div>C</div> // key = {2}
      <div>D</div> // key = {3}
    ```
    - 만약 key를 부여하지 않으면, 배열의 인덱스 값이 자동으로 key로 설정이 된다.

    - 이때, B와 C사이에 X를 집어넣으면 다음과 같이 인덱스가 변경이 된다.
    ```js
      <div key = {0}>A</div>
      <div key = {1}>B</div>
      <div key = {2}>X</div> // [C -> X]
      <div key = {3}>C</div> // [D -> C]
      <div key = {4}>D</div> // [새로 생성됨]
    ```
    - 중간에 들어간 값 뒤에 있는 인덱스들이 모두 변경됨(비효율적)
    - key를 배열의 인덱스 값으로 사용하는 것이 아니라, 데이터를 추가할 때마다 고정적인 고유 값을 부여한다면, 조금 더 효율적으로 처리할 수 있다.

    ```js
      <div key = {0}>A</div>
      <div key = {1}>B</div>
      <div key = {5}>X</div> // [새로생성됨]
      <div key = {2}>C</div> // [유지됨]
      <div key = {3}>D</div> // [유지됨]
    ```

==> key 값은 언제나 고유해야 한다.

※ 만약 키 값을 빼먹으면 렌더링이 되긴 하지만 개발자도구 콘솔에서 경고창이 발생한다.

---

- 데이터 제거

  - ex)

  ```js
  // 배열에서 3을 제거하는 방법
  const arr = [1, 2, 3, 4, 5];

  // 방법 1) slice과 concat을 활용
  array.slice(0, 2).concat(array.slice(3, 5)); // [1,2,4,5]
  // 방법 1-2) 배열 전개 연산자를 사용
  [...array.slice(0, 2), ...array.slice(3, 5)];
  // 방법 2) 필터링
  array.filter((num) => num !== 3); // [1,2,4,5]
  ```

  - 구현)

  ```js
    // file : src/App.js
    handleRemove = (id) =>{
      const { information } = this.state;
      this.setState({
        information : information.filter(info => info.id !== id)
      })
    }

    render(){
      const { information } = this.state;
      return (
        <div>
          <PhoneInfoList
            onRemove = {this.handleRemove}
          />
        </div>
      )
    }
  ```

  - id를 파라미터로 받아오는 handleRemove 함수를 만들고 PhoneInfoList로 전달.
  - filter()함수를 통해서 파라미터로 들어온 id를 제외하고 나머지 info값들을 출력

  ```js
    // file : src/components/PhoneInfoList.js
    class PhoneInfoList extends Component{
      static defaultProps = {
        list : [],
        onRemove : () => console.warn('onRemove not defined'),
      }
      render() {
        const { data , onRemove } = this.props;
        const list = data.map(
          info => (
            <PhoneInfo
              key = {info.id}
              info = {info}
              onRemove = {onRemove}
              />)
          );
          return (
            <div>
              {list}
            </div>
          );
        )
      }
    }
    export default PhoneInfoList;
  ```

  - PhoneInfoList 에서는 props로 전달받은 onRemove를 그대로 전달.
    - 이 함수가 전달되지 않았을 경우를 대비하여 해당 props를 위한 defaultProps도 설정.

  ```js
  // src/components/PhoneInfo.js

  import React, { Component } from "react";

  class PhoneInfo extends Component {
    static defaultProps = {
      info: {
        name: "이름",
        phone: "010-0000-0000",
        id: 0,
      },
    };

    handleRemove = () => {
      //삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
      const { info, onRemove } = this.props;
      onRemove(info.id);
    };

    render() {
      const style = {
        border: "1px solid black",
        padding: "8px",
        margin: "8px",
      };

      const { name, phone } = this.props.info;

      return (
        <div style={style}>
          <div>
            <b>{name}</b>
          </div>
          <div>{phone}</div>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }
  }

  export default PhoneInfo;
  ```

---

- 데이터 수정
  - 데이터 수정을 할때도 마찬가지로 불변성을 지켜줘야한다. 기존의 배열과, 그리고 그 내부에있는 객체를 절대로 직접적으로 수정하면 안된다.

ex)

```js
const array = [
  { id: 0, text: "hello", tag: "a" },
  { id: 1, text: "world", tag: "b" },
  { id: 2, text: "bye", tag: "c" },
];
```

    - 여기서 기존의 값을 건드리지 않고 id가 1인 객체의 text 값을 'Korea'라는 값으로 바꾼 새로운 배열을 만들어보기.

```js
  const modifiedArray = array.map(item => item.id === 1
    ? ({ ...item,. text : 'Korea' }))
    : item
  // id가 일치하면 새 객체를 만들고, 기존의 내용을 집어넣고 원하는 값 덮어쓰고
  // 바꿀 필요 없는것들은 그냥 기존값을 사용한다.
```

```js
//file : src/App.js
handleUpdate = (id, data) => {
  const { information } = this.state;
  this.setState({
    information: information.map((info) =>
      id === info.id ? { ...info, ...data } : info
    ),
  });
};
```

- id와 data 파라미터를 받아와서 필요한 정보를 업데이트 해주는 함수.

```js
  static defaultProps = {
    onUpdate : () => console.warn('onUpdate not defined'),
  }
  render(){
    const { onUpdate } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          key = {info.id}
          info = {info}
          onRemove = {onRemove}
          onUpdate = {onUpdate}/>
      )
    );
  }
```

- 데이터를 컴포넌트로 렌더링하는 과정에서 PhoneInfo에 Update를 그대로 전달한다.
