import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    // 수정 버튼을 눌렀을때 editing 값을 true로 설정해줄 것.
    // 이 값이 true일대에는 기존 텍스트 형태로 보여주던 값들을 input 형태로 보여주게된다.
    editing : false,
    // input의 값은 유동적. input값을 담기 위해서 각 필드를 위한 값도 설정한다. 
    name : '',
    phone : '',
  }

  handleRemove = () => {
    //삭제 버튼이 클릭되면 onRemove에 id를 넣어서 호출
    const { info , onRemove } = this.props;
    onRemove(info.id);
  }

  //editing 값을 반전시키는 함수. (true <-> false)
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }
  
  // input 에ㅓㅅ onChange 이벤트가 발생 될 때 호출되는 함수 .
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState){
    // editing 값이 바뀔 때 처리할 로직이 적혀있다. 
    // 수정이 눌렸을때 기존의 값이 input에 나타나고 
    // 수정을 적용할때 input의 값들을 부모한테 전달해준다. 

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing){
      //editing 값이 false -> true로 전환 될때 info의 값을 state에 넣어준다. 
      this.setState({
        name : info.name,
        phone : info.phone
      })
    }

    if(prevState.editing && !this.state.editing){
      // editing 값이 true -> false로 전환 될 때
      onUpdate(info.id, {
        name : this.state.name,
        phone : this.state.phone
      });
    }
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    if(editing){ 
      // 수정모드 
      return (
        <div style = {style}>
          <div>
            <input
              value = {this.state.name}
              name = "name"
              placeholder = "이름"
              onChange = {this.handleChange}/>
          </div>
          <div>
            <input
              value = {this.state.phone}
              name = "phone"
              placeholder = "전화번호"
              onChange = {this.handleChange} />
          </div>
          <button onClick = {this.handleToggleEdit}>적용</button>
          <button onClick = {this.handleRemove}>삭제</button>

        </div>
      );
    }

    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick = {this.handleToggleEdit}>수정</button>
        <button onClick = {this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;