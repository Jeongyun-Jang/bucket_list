//최종 코드
//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보 config
    apiKey: "AIzaSyA-0eb8IqTUfb1sDJ2kvZ-HZm41wKZPWwg",
    authDomain: "sparta-react-64389.firebaseapp.com",
    projectId: "sparta-react-64389",
    storageBucket: "sparta-react-64389.appspot.com",
    messagingSenderId: "435318566270",
    appId: "1:435318566270:web:84d0afa8ad0dae1ad3572f",
    measurementId: "G-GC1H0XWLQR"
  };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };