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

