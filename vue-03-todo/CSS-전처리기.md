# CSS 전처리기

전처리 - CSS - 후처리 순으로 진행

## 전처리 (Preprocessor)

### 특징

- CSS가 가지지 않는 연산, 네스팅, 상태(Statement) 지원
- SASS LOADER 설치하기
  - npm i -D sass-loader@^7
    - carrot(^) 기호를 통해서 7버전 중 가장 최신버전을 설치할 것임
      - 1.2.3 중 1은 major, 2는 minor, 3은 patch(유의적) 버전이라고 통칭함
    - npm i -D node-sass
      - sass컴파일에 필요한 모듈

### 예

- LESS
- SASS(SCSS)
- Stylus

## 후처리(PostCSS)

- Autoprefixer
  - 공급 업체(브라우저) 접두사
    - -webkit-,- ms-, -moz-, -o-
