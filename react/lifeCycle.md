# LifeCycle API

- 라이프사이클 API는 컴포넌트가 브러우저에 나타날 때, 사라질 때, 그리고 업데이트 될 때, 호출되는 API다.

- 컴포넌트안에서 메소드의 실행순서

  - 컴포넌트 생성시 : constructor -> componentWillMount -> render -> componentDidMount 순서로 진행

  - 컴포넌트 제거시 : componentWillUnmount 메소드만 실행

  - 컴포넌트의 props 변경시 : componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate 순서로 진행

  - 컴포넌트의 state 변경시 : shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate 순서로 진행

---

- 생성자

  ```js
      constructor(props){
          super(props);
      }
  ```

  - 컴포넌트 생성자 함수. 컴포넌트가 새로 만들어질 때마다 이 함수가 호출된다.
  - 여기서 기본 state를 정할 수 있다. (state : 메소드 안에서만 유효한 값들을 의미)

- componentWillMount

  ```js
      componentWillMount(){
          console.log("componentWillMount");
      }
  ```

  - 컴포넌트가 DOM 위에 만들어지기 전에 실행된다.

- render

  ```js
      render(){
          ...
      }
  ```

  - 컴포넌트 렌더링을 담당한다.

- componentDidMount

  ```js
      componentDidMount(){
          //외부 라이브버리 연동: D3, masonry, ...
          // 컴포넌트에서 필요한 데이터 요청 : ajax, graplQL, ...
          // dom에 관련된 작업 : 스크롤 설정, 크기 읽어오기 등
      }
  ```

  - 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드이다.
  - 이 안에서 다른 자바스크립트 프레임워크를 연동하거나, setTimeout, setInterval 및 Ajax 처리 등을 넣는다.

- componentWillReceiveProps

  ```js
      componentWillReceiveProps(nextProps){
          console.log("componentWillReceiveProps : " + JSON.stringify(nextProps));
      }
  ```

  - 컴포넌트가 props를 새로 받았을 때 실행된다. props의 변경에 따라 state를 업데이트 할 때 사용하면 유용
  - 이 안에서 this.setState()를 하더라도 추가 렌더링은 하지 않는다.

- shouldComponentUpdate

  ```js
      shouldComponentUpdate(nextProps, nextState){
          console.log("shouldComponentUpdate : " + JSON.stringify(nextProps))  +
          return nextProps.id !== this.props.id;
      }
  ```

  - props 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드.
    ※ JSON.stringify()를 쓰면 여러 필드를 편하게 비교할 수 있다.
    ▶ 자바스크립트 값이나 객체를 JSON 문자열로 변환.

---

- 컴포넌트 제거
  ```js
      //컴포넌트가 더 이상 필요하지 않게 되면 단 하나의 API가 호출된다.
      componentWillUnmount(){
          // event, setTimeout, 외부 라이브러리 인스턴스 제거
      }
  ```
