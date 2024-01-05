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
- [ ] 수정 >> `Posting/PostForm.jsx`로 바로 넘어갈 수 있도록 처리. `content` 값 넘어가게 처리 -> 귀찮다... 유기함
- [ ] 최종 확인 >> 최종 오류 확인
- [ ] github page 배포

* `globalState`로 `window.klaytn.selectedAddress`를 관리함.

## User
|Key|Value|
|----|----|
|userAddress|`string - window.klaytn.selectedAddress`|
|writtenPosts|`Int`|
|timestamp|`Date()`|

## Post
|Key|Value|
|----|----|
|title|`string - markdown`|
|content|`string - markdown`|
|userAddress|`string - window.klaytn.selectedAddress`|
|timestamp|`Date()`|
|thumbnailUrl|`string - Url`|
|thumbnailFileName|`string - FileName`|
|contentNum|`Int`|
|contentImages|`list`|

* `Firestorage`는 Directory를 삭제하는 방법이 없는듯. 따로 content에 들어가는 이미지들을 list형식으로 path를 저장해 하나씩 삭제하는 것으로 관리함. 

### Image in posts
1. content image
```js
const storageRef = ref(storage, `${globalState}/${contentNum}/${file.name}`);
```

2. thumbnail image
```js
 const storageRef = ref(storage, `${globalState}/${_contentNum}/thumbnail/${file.name}`);
```