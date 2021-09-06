# props & state

- props : 부모 컴포넌트가 자식 컴포넌트에게 주는 값
  - 자식 컴포넌트에서는 props를 받아오기만 하고, 받아온 props를 직접 수정할 수 없다.
- state : 컴포넌트 내부에서 선언하며 내부에서 값을 변경할 수 있다.

---

- 컴포넌트 만들기

```js
 // MyName.js
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}
export default MyName;

 // App.js
import React, { Component } from 'react';
import MyName from './MyName';

class App extends Component {
  render() {
    return (
      <MyName name="리액트" />
    );
  }
}

export default App;
```

- 가끔 실수로 props를 빠트릴 수 있거나 특정 상황에서 props를 일부러 비워야 할 경우가 있다. 그 경우 defaultProps을 통해 디폴트값을 설정할 수 있다.

```js
class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}
MyName.defaultProps = {
  name: "기본이름",
};
export default MyName;
```

- 함수형 컴포넌트에서는 더 간편한 문법으로 작성할 수 있다.

```js
import React from "react";

const MyName = ({ name }) => {
  return <div>안녕하세요! 제 이름은 {name} 입니다.</div>;
};

export default MyName;
```

※ 함수형 컴포넌트와 클래스형 컴포넌트의 주요 차이점
==> state와 LifeCycle이 빠져있다. 그래서 컴포넌트 초기 마운트가 아주 미세하게 빠르고, 메모리 자원을 덜 사용한다.(무수히 많은 컴포넌트를 렌더링할 것이 아니라면 성능적으로 큰 차이는 없다.)

- state
  ==> 동적인 데이터를 다룰 때 사용한다.

  ```js
   import React, { Component } from 'react';

   class Counter extends Component{
       state = {
           number : 0
       }

       handleIncrease = () => {
           this.setState({
               number : this.state.number + 1
           });
       }

       handleDecrease = () => {
           this.setState({
               number : this.state.number -1
           });
       }

       render(){
           return (
               <div>
                   <h1>카운터</h1>
                   <div>값 : {this.state.number}</div>
                   <button onClick = {this.handleIncrease}>+</button>
                   <button onClick = {this.handleDecrease>}>-</button>
               </div>
           );
       }
   }

   export default Counter;
  ```

  - 컴포넌트의 state를 정의할 때는 class fields 문법을 사용해서 정의.

  * class fields를 사용하지 않으면 밑에 있는 코드와 같이 사용된다.

  ```js
      import React, { Component } from 'react';

      class Counter extends Component{
          constructor(props){
              super(props);
              this.state = {
                  number:0
              }
          }
          ...
      }
  ```

  - 위 코드의 construcotr에서 super(props)를 호출한 이유
    => 컴포넌트를 만들게 되면서 Component를 상속했으며, 이렇게 constructor를 작성하면 기존의 클래스 생성자를 덮어쓰게 된다. 그렇기 때문에 리액트 컴포넌트가 지니고있던 생성자를 super를 통해 미리 실행하고, 그 다음에 우리가 할 작업(state설정)을 하는 것이다.

  - 메소드 작성

  ```js
  //1) 애로우 함수 사용
    handleIncrease = () => {
       this.setState({
        number: this.state.number + 1
    });
   }

   handleDecrease = () => {
     this.setState({
      number: this.state.number - 1
      });
   }

   //2) 애로우함수 미사용
     handleIncrease() {
      this.setState({
          number: this.state.number + 1
       });
      }

      handleDecrease() {
         this.setState({
            number: this.state.number - 1
      });
  }

  ```

  ※ 2번과 같이 작성할 수 있지만 나중에 버튼에서 클릭이벤트가 발생 했을 때 this가 undefined로 나타나서 제대로 처리되지 않게 된다. (함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 this 와의 연결이 끊기기 때문)

  해결하기 위해서는 1번과 같이 작성하거나 다음과 같이 코드를 수정한다.

  ```js
    constructor(props){
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }
  ```

- setState

  - state에 있는 값을 바꾸기 위해서는 this.setState를 무조건 거쳐야한다.
  - setState는 객체로 전달되는 값만 업데이트 해준다.

  ```js
  state = {
    number: 0,
    foo: "bar",
  };
  // 여기서 this.setState({number : 1}); 을 하게 된다면 number의 값만 업데이트 된다.
  ```

  ```js
  state = {
    number: 0,
    foo: {
      bar: 0,
      foobar: 1,
    },
  };

  /*여기서 다음과 같이 한다고 해서 foobar 값이 업데이트 되지 않는다.
     -> 그냥 foo의 객체가 다음과같이 변경되어버린다. 
    this.setState({
       foo : {
           foobar : 2
       }
   }) 
   */

  /*해결방안
       this.setState({
           number : 0,
           foo : {
               ...this.state.foo,
               foobar : 2
           }
       });
  
       * ...은 자바스크립트의 전개연산자이다. 
          => 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미 
   */
  ```

  ◇ 전개구문(spread syntax) - 문법 이름 그대로 객체 혹은 배열들을 펼칠 수 있게한다.

  ```js
  // 펼칠 대상이 객체인 경우
  {...obj}

  const myObj1 = {
      laptop : 'MacBook Pro',
      tablet : 'iPad Pro 11'
  }
  const myObj2 = { ...myObj1};

  console.log(myObj1); // {laptop: "MacBook Pro", tablet: "iPad Pro 11"}
  console.log(myObj2); // {laptop: "MacBook Pro", tablet: "iPad Pro 11"}
  console.log(myObj1 === myObj2); // false , 똑같은 모양의 프로퍼티를 가지지만 서로 다른 주소값을 가진 독립적인 객체다.

  const myObj3 = {
      ...myObj1,
      phone : 'Galaxy Note 10'
  };
  console.log(myObj3) // {laptop: "MacBook Pro", tablet: "iPad Pro 11", phone: "Galaxy Note 10"}  , 다른 객체의 프로퍼티를 복사해오면서 추가로 프로퍼티를 작성할 수 있다.


  // 펼칠 대상이 배열인 경우
  [...arr]
  // or
  {...arr}

  const myArr1 = ['Canna', 'Cuzz', 'Faker', 'Teddy', 'Effort'];
  const myArr2 = [...myArr1];

  console.log(myArr1); // ["Canna", "Cuzz", "Faker", "Teddy", "Effort"]
  console.log(myArr2); // ["Canna", "Cuzz", "Faker", "Teddy", "Effort"]
  console.log(myArray1 === myArray2); // false

  const myArr = ['Canna', 'Cuzz', 'Faker', 'Teddy', 'Effort'];
  const myObj = {...myArr}; // 펼친 배열을 {}로 감싸서 객체로 만들면 각 요소는 프로퍼티 값이 되고 배열의 인덱스가 프로퍼티 네임이 된다.

  console.log(myArr);// ["Canna", "Cuzz", "Faker", "Teddy", "Effort"]
  console.log(myObj); // {0: "Canna", 1: "Cuzz", 2: "Faker", 3: "Teddy", 4: "Effort"}


  // 전개 구문은 함수의 나머지 매개변수로도 활용 가능
  //  매개변수에 전개 구문을 활용하면, 함수를 호출할 때 많은 인자들을 하나의 배열로 모아주는 매개변수로 활용할 수 있다.

  function myFunc(name, ...members){
      return {name : name, members : members}
  }

  const myTeam1 = myFunc('T1', 'Canna', 'Cuzz', 'Faker', 'Teddy', 'Effort');
  const myTeam2 = myFunc('Damwon', 'Nuguri', 'Canyon', 'ShowMaker', 'Ghost', 'BeryL');

  console.log(myTeam1); // {name: "T1", members: Array(5)}
  console.log(myTeam2); // {name: "Damwon", members: Array(5)}
  // 첫번째 인자 : name 파라미터 나머지 함수를 호출할때 전달한 인자들은 members라는 하나의 배열에 전달
  ```

  - setState에 객체 대신 함수를 전달

  ```js
  // 기존코드 , 굳이 this.state를 조회해야함
  this.setState({
    number: this.state.number + 1,
  });
  // 개선코드
  this.setState((state) => ({
    number: state.number,
  }));
  //setState 에 updater 함수를 만들어서 전달.
  this.setState(({ number }) => ({
    number: number + 1,
  })); // (state) 에서 ({number})가 된 것을 비구조화 할당이라고 부른다.

  const { number } = this.state;
  this.setState({
    number: number + 1,
  });
  ```

  [비구조화 할당](https://velog.io/@public_danuel/destructuring-assignment)

- 이벤트 설정
  - render()에서 이벤트 설정을 한 부분을 확인
  ```js
   render(){
       return(
           <div>
               <h1>카운터</h1>
               <div>값 : {this.state.number}</div>
               <button onClick = {this.handleIncrease}>+</button>
               <button onClick = {this.handleDecrease}>-</button>
           </div>
       )
   }
  ```
  ※ 리액트에서 이벤트 함수를 설정할때 html과 다음과 같은 사항이 다르다
  1.  이벤트이름을 설정할 때 camelCase로 설정.
  2.  이벤트에 전달해주는 값은 함수여야 한다.
      => 만약 onClick = {this.handleIncrease()} 와 같은 방법을 사용하면 렌더링을 할 때마다 해당 함수가 호출이 된다. (무한반복)
