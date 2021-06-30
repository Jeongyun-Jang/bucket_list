//최종 코드
import React from "react";

import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import styled from "styled-components";
import Detail from "./Detail";
import NotFound from "./NotFound";

// 리덕스 스토어와 연결하기 위해 connect라는 친구를 호출할게요!
import { connect } from "react-redux";
// 리덕스 모듈에서 (bucket 모듈에서) 액션 생성 함수 두개를 가져올게요!
import {
  loadBucket,
  createBucket,
  loadBucketFB,
  addBucketFB,
} from "./redux/modules/bucket";
import Progress from "./Progress";

import Spinner from "./Spinner";
// firestore 가져오기
import { firestore } from "./firebase";

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
//mapStateToProps는 리덕스 스토어에 있는 상태를 props 형태로 앱이 넣어주는 역할const 
const mapStateTopProps = (state) => ({
  bucket_list: state.bucket.list,
  is_loaded: state.bucket.is_loaded,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
// mapDispatchToProps는 dispatch하는 함수 액션이 있는지 감시하고 액션을 반환하는 역할
// 잠깐!! addBucketFB를 import해오는 거 잊지말기!
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadBucketFB());
  },
  create: (new_item) => {
    console.log(new_item);
    dispatch(addBucketFB(new_item));
  },
});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {};
    // ref는 이렇게 선언합니다!
    this.text = React.createRef();
  }
 //bucket.js의 loadBucketFB 불러와 처음 페이지 실행되면 보여줌

  componentDidMount() {
    this.props.load();
    /*
    const bucket = firestore.collection("buckets");
// 하나만 확인하기
    bucket
      .doc("bucket_item")
      .get()
      .then((doc) => {
        // .exists를 써서 데이터가 있는 지 없는 지 확인!
        if(doc.exists){
          // 데이터를 콘솔에 찍어보자!
          console.log(doc.data());
        }
      });
//전체 확인하기
		bucket
      .get()
      .then((docs) => {
        let bucket_data = [];
        docs.forEach((doc) => {
          // 도큐먼트 객체를 확인해보자!
          console.log(doc);
          // 도큐먼트 데이터 가져오기
          console.log(doc.data());
          // 도큐먼트 id 가져오기
          console.log(doc.id);

          if (doc.exists) {
            bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
          }
        });

        console.log(bucket_data);
         */
  }

  addBucketList = () => {
    const new_item = this.text.current.value;
    this.props.create(new_item);
  };

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    // 콘솔로 확인해요!
    console.log(this.props.is_loaded);
    return (
      <div className="App">
        <Container>
          <Title>내 버킷리스트</Title>
          {/* firestore에서 데이터를 가져온 후에만 페이지를 보여줄거예요!  */}
          {!this.props.is_loaded ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Progress />
              <Line />
              <Switch>
                <Route path="/" exact component={BucketList} />
                <Route path="/detail/:index" component={Detail} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          )}
        </Container>
        <Input>
          <input type="text" ref={this.text} />
          <button onClick={this.addBucketList}>추가하기</button>
        </Input>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });    
        	  //window.scrollTo(0,0); 이렇게 주면 위로 잘 올라가지만 
          }}
        >
          위로가기
        </button>
      </div>
    );
  }
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    padding: 5px;
  }

  & input {
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #888;
    width: 70%;
    &:focus {
      border: 1px solid #a673ff;
    }
  }

  & button {
    width: 25%;
    color: #fff;
    border: 1px solid #a673ff;
    background-color: #a673ff;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: #673ab7;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;
// withRouter 적용
// connect로 묶어줬습니다!
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));


