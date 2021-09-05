# 리액트 기본

---

- 동적인 웹 페이지를 보여주도록 도와주는 라이브러리입니다.
- "컴포넌트"라는 개념에 집중이 되어있는 라이브러리.
- http 클라이언트, 라우터, 심화적 상태 관리등의 기능과 공식 라이브러리가 있지 않아서 개발자가 원하는 스택을 마음대로 고르거나 직접 생성하여 사용할 수 있습니다.
- 특정 이벤트가 발생했을 때, 어떤 DOM을 가져와서 어떤 방식으로 뷰를 업데이트 시킬 지 로직을 정해야한다.

  - DOM 기반으로 작동하는 페이지는 그때 그때 새로운 뷰를 만들라고하면 성능적으로 문제가 생길 것
    ==> 그래서 Virtual DOM을 사용. 변화가 일어나면 자바스크립트로 이뤄진 가상 DOM에 한번 렌더링을 한 뒤, 기존 DOM과 비교를 하여 변화가 필요한 곳에만 업데이트를 한다.

■ 준비사항

1.  Node.js : Webpack과 Babel 같은 도구들이 자바스크립트 런타임인 nodejs를 기반으로 만들어졌습니다.
2.  Yarn : 조금 개선된 버전의 npm이라고 생각하면 된다. npm은 node.js를 설치할 때 같이 딸려오는 패키지 매니저도구이다. 해당 라이브버리들의 버전 관리를 하게 될 떄 사용.

■ create-react-app 설치 및 사용

```js
   npm install -g create-react-app
   // create-react-app은 리액트 앱을 만들어주는 도구이다.

   yarn global add create-react-app
   // yarn으로 설치하고 싶으면 다음과 같이 설치.
```

사용

```js
   create-react-app hello-react

   cd hello-react
   yarn start
```

```js
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
```

- 첫번째 코드는 리액트와 그 내부의 컴포넌트를 불러온다. 파일에서 jsx를 사용하려면, 꼭 리액트를 import 해주어야 한다.
- 2,3번째 코드는 webpack을 사용하기에 가능한 작업.

※ 컴포넌트를 만드는 방법은 2가지가 있다. 하나는 클래스를 통해 만드는 것이고 두번째는 함수를 통해 컴포넌트를 만드는 것이 있다. 클래스형태로 만들어진 컴포넌트에는 꼭 render 함수가 있어야 한다. 그리고 그 내부에서는 jsx를 리턴해줘야한다.

```js
   render(){
       return(
           <div className = "App">
               <header className = "App-header">
                   <img src = {logo} className = "App-logo" alt = "logo" />
                   <h1 className = "App-title">Welcome to react</h1>
               </header>
               <p className = "App-intro">
                to get started, edit <code>src/App.js</code> and save to reload.
               </p>
           </div>
       );
   }

   // 위에 보이는 html 같은 코드가 바로 JSX였습니다.
   export default App;  // 우리가 작성한 컴포넌트를 다른 곳에서 불러와 사용할 수 있도록 내보내기를 한다.
```

- 브라우저 상에 우리의 리액트 컴포넌트를 보여주기 위해서는 ReactDOM.render 함수를 사용한다. 첫 파라미터는 렌더링을 할 결과물, 두번째 파라미터는 컴포넌트를 어떤 DOM에 그릴지 정해준다.

- id가 root인 DOM을 찾아서 그리도록 설정되어있다. 해당 DOM은 public/index.html 파일에서 찾을 수 있다.

```html
<div id="root"></div>
<!--해당 파일안에 있는 이곳을 찾아 렌더링한다. -->
```
