# JSX

- 자바스크립트형식이다.
- 태그를 열었으면 꼭 닫아줘야한다.
- 2개 이상의 엘리먼트는 무조건 하나의 엘리먼트로 감싸져있어야 한다.

  - ex)

  ```js
  return(
      <div>
        hello
      </div>
      <div>
        bye
      </div>
  );  // 다음과 같이 코드를 짜면 에러가 발생한다.
  ```

  ```js
  //해결책 1) div로 해당 코드를 감싼다.
  return (
    <div>
      <div>hello</div>
      <div>bye</div>
    </div>
  );
  ///해결책 2) Fragment를 사용한다.
  return (
    <Fragment>
      <div>hello</div>
      <div>bye</div>
    </Fragment>
  );
  ```

- JSX 내부에서 자바스크립트 값을 사용할 때는 다음과 같이 사용.

```js
import React, { Component } from "react";

class App extends Component {
  render() {
    const name = "react";
    return <div>hello {name}! // 출력결과 : hello react!</div>;
  }
}
export default App;
```

- var / const / let

```js
//var는 scope가 함수단위이다
function foo() {
  var a = "hello";
  if (true) {
    var a = "bye";
    console.log(a); // bye
  }
  console.log(a); // bye
}
```

```js
// const와 let은 scope가 블록 단위이다.
function foo() {
  let a = "hello";
  if (true) {
    let a = "bye";
    console.log(a); // bye
  }
  console.log(a); // hello
}
```

- 조건부 렌더링
  - JSX 내부에서 조건부 렌더링을 할 때는 보통 삼항 연산자를 사용하거나, AND 연산자를 사용한다.
    반면, if문을 사용할 수는 없다.(사용하려면 IIFE(즉시실행 함수표현)을 사용해야한다)

```js
return <div>{1 + 1 === 2 ? <div>맞다!</div> : <div>틀리다!</div>}</div>;
```

```js
return <div>{1 + 1 === 2 && <div>맞다! </div>}</div>;
```

- 복잡한 조건들은 웬만하면 JSX 밖에서 로직을 작성하는 것이 좋다.

```js
    render(){
        const value = 1;
        return (
            <div>
            {
                (function(){
                    if (value === 1) return (<div>하나</div>);
                    if (value === 2) return (<div>둘</div>);
                    if (value === 3) return (<div>셋</div>);
                })()
            }
            </div>
        );
    }
    // if문 대신 스위치를 사용해도 상관없다.
    (() => {
        if (value === 1) return (<div>하나</div>);
        if (value === 2) return (<div>둘</div>);
        if (value === 3) return (<div>셋</div>);
    })()
```

- style 과 className

  - html에서 하는 것과 다르게 객체 형태로 작성해주어야한다.
  - ex)

    ```js
    import React, { Component } from "react";

    class App extends Component {
      render() {
        const style = {
          backgroundColor: "black",
          padding: "16px",
          color: "white",
          fontSize: "12px",
        };
        return <div style={style}>hi there</div>;
      }
    }
    ```

    ```js
        import React, { Component } from 'react';
        import './App.css'

        class App extends Component{
            render(){
                return (
                    <div className = "App">
                     리액트
                    </div>
                );
            }
        }

        //App.js 파일
        .App {
            background : black;
            color : aqua;
            font-size : 36px;
            padding : 1rem;
            font-weight : 600;
        }
    ```
