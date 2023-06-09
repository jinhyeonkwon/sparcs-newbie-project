# SPARCS 신입생 프로젝트 : 'Issue'

## 23.05.29. 심사용 자료
- 개선 사항 : <a href="https://jinhyeonkwon.notion.site/e9817e44613d4ad2938d4de8283fcca2">클릭</a>
- E-R diagram
<img src="./Newbie-Proj_ERD.png"/>

## 프로젝트 설명
- 교내 카페가 갑자기 문을 닫는 일이나, 오리연못에서 아기 거위가 걸어다닌다는 소소한 소식등을, 외출하고 나서 깨닫거나 기숙사에 돌아가고 나서 깨닫는 경우가 많습니다.
- 이에 학교 내 다양한 건물에서 발생하는 일을 학우들이 자유롭게 기록하고 볼 수 있도록 하는 사이트를 제작하였습니다.
- 구현한 기능
  1. 로그인 : 유저는 일반 유저 / 정지 유저 / 관리자로 나뉩니다.
  2. 회원가입 : UI 상으로는 일반 유저로 가입하는 것만 지원합니다.
  3. 이슈 추가, 수정, 삭제 : 일반 유저는 이슈 추가, 본인이 쓴 이슈에 대한 수정 및 삭제가 가능합니다. 정지 유저는 본인이 쓴 이슈에 대한 작업을 포함한 모든 활동이 정지됩니다. 관리자는 이슈 추가와 함께 모든 이슈를 수정, 삭제할 수 있습니다.
  4. 필터 : 특정 건물의 이슈 보기(기본), 종료 시각이 과거인 이슈 제외하기

---
## 실행 관련 정보
### 1. 공통
- node v18.12를 사용합니다.
- yarn v1을 사용합니다.
### 2. 서버
- 데이터베이스로는 postgreSQL을, ORM으로는 prisma를 사용합니다.
- root 폴더에서 `make run-dev` : 데이터베이스 서버 시작 (docker container)
- 개발용 환경 변수는 .env.development, 배포용 환경 변수는 .env.production에 작성합니다.
### 3. 클라이언트
- React.js를 사용합니다.
- 디자인을 위해 CSS 라이브러리 <a href="https://bulma.io/">bulma</a>를 사용했습니다.
### 4. 데이터베이스 설정
- /server에서 `npx prisma db push` : /server/prisma/schema.prisma에 정의된 schema대로 DB를 설정합니다.
- /server에서 `npx prisma db seed` : /server/prisma/seed.js에 들어 있는 기본값을 DB에 seed합니다.
### 5. 개발용 실행
- root 폴더에서 `yarn dev` : 개발용으로 클라이언트와 서버 모두 실행해볼 수 있습니다.
