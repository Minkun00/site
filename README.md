## TO START
* `node version : 20.10.0`
1. `.env` 환경변수 파일 생성
값은 [firebase]('https://firebase.google.com/?hl=ko')에서 web으로 만들면 나오는 환경변수값 저장

2. node modules 설치 후 실행
```bash
npm i
npm run start
```


## 내용
- [x] contract사용한 login
- [x] firebase 연결
- [x] 텍스트 저장 및 불러오기
- [ ] 이미지 처리
- [ ] github page 배포

## 문제점
- 12/23 : `isCertified().call()` 계속 `false`나오는 상황. `certification(_address)`실행했는데도 동일한 문제 반복. remix에서 실행했을 때 정상적으로 됬는데;
