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
- firebase, firestore


## 내용
- [x] contract사용한 login
- [x] firebase 연결
- [x] 텍스트 저장 및 불러오기
- [x] 이미지 처리
- [x] ThumbNail
- [x] 삭제 >> thumbnail 삭제 최종 확인 필요
- [ ] 수정 >> `Posting/PostForm.jsx`로 바로 넘어갈 수 있도록 처리. `content` 값 넘어가게 처리
- [ ] 최종 확인 >> 최종 오류 확인
- [ ] github page 배포