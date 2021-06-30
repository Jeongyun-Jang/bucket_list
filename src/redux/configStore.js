//최종 코드

import { createStore, combineReducers,applyMiddleware } from "redux";//store 만드는 방법 이미 리덕스에서 제공 so 리덕스 패키지 불러옴
// from react-redux -> from redux
import thunk from "redux-thunk";

import bucket from "./modules/bucket";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();


const middlewares = [thunk];
//store에 적용
const enhancer = applyMiddleware(...middlewares);

//Store는 단일이어야해서 여러개인경우 하나의 그룹으로 합쳐야한다.
//how? combineReducer 를 이용해서

//rootReducer에 리듀서를 하나로 뭉쳐준다. {}안에 여러 리듀서를 담으면 됨
const rootReducer = combineReducers({bucket});

//store생성해 여기에 리덕스 middleware인 redux-thunk 넣어준다.
//리덕스에서 비동기 처리하기위해 미들웨어 thunk 가져옴
const store = createStore(rootReducer, enhancer);

export default store;


