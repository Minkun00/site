## TO START
* `node version : 20.10.0`
1. `.env` 환경변수 파일 생성
값은 [firebase]('https://firebase.google.com/?hl=ko')에서 web으로 만들면 나오는 환경변수값 저장

2. node modules 설치 후 실행
```bash
npm i
npm run start
```

## 기능
- login, 글 작성 자격 제어(kaikas)
- markdown 문법으로 글 작성, 이미지 업로드 가능


## 내용
- [x] contract사용한 login
- [x] firebase 연결
- [x] 텍스트 저장 및 불러오기
- [x] 이미지 처리
- [ ] 삭제
- [ ] github page 배포

## 문제점
- 12/23 : `isCertified().call()` 계속 `false`나오는 상황. `certification(_address)`실행했는데도 동일한 문제 반복. remix에서 실행했을 때 정상적으로 됬는데;

![Eligae](https://firebasestorage.googleapis.com/v0/b/blog-28d17.appspot.com/o/images%2F3F3F_3F_3F3F.png?alt=media&token=eb8eb26c-7400-4092-bfc7-46a404776dac)