## https://minkun00.github.io/site/

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
- [ ] 최종 확인 >> 최종 오류 확인 ... 하다가 귀찮아짐... 유기
- [x] github page 배포

* `globalState`로 `window.klaytn.selectedAddress`를 관리함.

## React 전역변수 사용
React에서 파일 하나의 큰 `function`안에서는 공유가 쉽지만, 여러 파일들 모두 사용해야 하는 공통적인 값을 관리하기 위해서 전역변수를 다룰 수 있게 만듬. [Context.jsx](https://github.com/Minkun00/site/blob/eject/src/components/context.jsx)
```js
// SiteProvider 내부의 것들은 모두 전역변수 사용 가능
<SiteProvider>
    <div>
        <NavigationBar/>
    </div>
        <div className='background-image'>
          <div className='default'>
            <Routes>
                <Route path="/posting" element={<PostForm/>}/> 
                <Route path="/site" element={<WrittenPosts/>}/>
                <Route path="/posts/:postId" element={<FullPost/>}/>
                <Route path="/owner" element={<Owner/>}/>
                <Route path='/' element={<WelcomePage/>} />
            </Routes>
        </div>
    </div>
</SiteProvider>
```

```js
// 저장하기(Login.jsx)
import { useSiteContext } from "../../context";
const { globalState, updateGlobalState } = useSiteContext();
updateGlobalState(value);

// 불러오기
import { useSiteContext } from '../context';
const { globalState } = useSiteContext(); 
```

## login
[Login.sol](https://github.com/Minkun00/site/blob/eject/src/contract/login.sol)로 로그인 처리. `Baobab-testnet`을 사용해서 [Kiakas](https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)를 다운받아야 사용 가능. 다른 로그인과 다르게 빠른 처리를 하고 싶어서 함. 생각해보면 막상 허락받지 못하면 못써서 어떻게 될지 모르겠네? 읽기는 문제 없는데 쓰기는 Login.sol에 따라 제한 걸어둠.
```js
import React from "react";
import { useSiteContext } from "../../context";
import './Login.css'

export default function Login() {
    const { globalState, updateGlobalState } = useSiteContext();

    async function requestAccount() {
        if (window.klaytn) {
            const accounts = await window.klaytn.enable();
            if (accounts.length > 0) {
                updateGlobalState(accounts[0]);
            } else {
                alert('Please connect to Kaikas!')
            }
        } else {
            alert('Kaikas not Detected!');
        }
    }

    function logOut() {
        updateGlobalState('initial value');
    }

    return (
        <div>
            {globalState === 'initial value'? (
                <button onClick={requestAccount}>LogIn</button>
            ) : (
                <button onClick={logOut}>LogOut</button>
            )}
        </div>
    );
}
```

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

* `Firestorage`는 Directory를 삭제하는 방법이 없는듯. 따로 content에 들어가는 이미지들을 list형식으로 path를 저장해 하나씩 삭제하는 것으로 관리함. [ContentEditor.jsx](https://github.com/Minkun00/site/blob/eject/src/components/Posting/ContentEditor.jsx)
```js
const handleImageUpload = async (e) => {
    const contentNum = await getUserDataByType(globalState, 'writtenPosts');
  
    const file = e.target.files[0];
    const updatedContentImageNum = `${globalState}/${contentNum}/${contentImageNum.length + 1}.${file.name.split('.').pop()}`;
    onContentImageNumChange((prevList) => [...prevList, updatedContentImageNum]);
  
    const storageRef = ref(storage, updatedContentImageNum);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
  
    const newContent = content + `![${contentImageNum.length + 1}](${imageUrl})`;
    setContent(newContent);
    onContentChange(newContent);
};
```
* image는 `Firestorage`, 나머지 문자로 처리가능한 정보들은 `Firebase`로 처리함.

* markdown에서 `\n`등 처리는 모두 `Firebase`에서 무시되기 때문에 `<br>`로 바꾸는 작업을 하여 처리함

```js
// content 작성 시
const convertNewLineToBr = () => {
    return content.replace(/\n/g, '<br>');
};

// cotent 복원 시
const convertBrToNewLine = (content) => {
    return content.replace(/<br>/g, '\n');
};
```

### Image in posts
1. content image
```js
const updatedContentImageNum = `${globalState}/${contentNum}/${contentImageNum.length + 1}.${file.name.split('.').pop()}`;
```

2. thumbnail image
```js
const storageRef = ref(storage, `${globalState}/${_contentNum}/thumbnail/${file.name}`);
```

![kaito](./image/kaito.png)