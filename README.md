# Kahoo-liked app

### 介绍

​	这是基于[Kahoo](https://kahoot.com)网页进行模仿的实战项目——BigBrain。BigBrain是一款用于设置问题并提供用户进行实时回答的app，其演示图和Kahoo类似，如下图所示。在教学过程中，教师可以通过使用BigBrain来设置问题让学生们输入问题id参与回答，通过实时参与并展示正确率可以提高学生的对知识的认知程度。

​	本项目是基于`react` 和 `material-ui`进行实现的。

<img src="https://github.com/ScoTonyField/Kahoo-liked-app/raw/master/screenshots/image-20210518011225702.png" alt="image-20210518011225702" style="zoom:50%; border: 1px solid black" />

### 技术栈

React + material-ui + React router + ES6 + promise等

适配Chrome 88.xx以上版本

### 项目运行

```shell
# initiallization
$ git clone git@github.com:ScoTonyField/Kahoo-liked-app.git
or
$ git clone https://github.com/ScoTonyField/Kahoo-liked-app.git

# frontend
$ yarn install
$ yarn start

# backend
$ yarn install
$ yarn start
```

### 完成功能

Admin

- [x] 注册页面 -- Register
  - [x] 邮箱注册
  - [x] 切换登录按钮
- [x] 登录页面 -- Login
  - [x] 登录
  - [x] 切换注册按钮
- [x] 登出功能 -- Logout
- [x] 展板页面 -- Dashboard
  - [x] 展示管理员已创建的问题、缩略图、答题所需时间
  - [x] 跳转编辑问题页面按钮
- [x] 游戏编辑页面 -- GameEdit
  - [x] 删除或者创建新的问题
- [x] 问题编辑页面 -- QuestionEdit
  - [x] 问题类型 -- 多选、单选
  - [x] 时间限制
  - [x] 问题分数
  - [x] 图片或者视频链接
- [x] 游戏启动与暂停
  - [x] 获取游戏结果

User

- [x] 参与游戏界面 -- Join
  - [x] 游戏问题
  - [x] 倒计时
- [x] 回答结果与正确结果

### 项目结构

```
.
├── BONUS.md
├── README.md
├── TESTING.md
├── UIUX.md
├── backend
├── frontend
│   ├── 2.5.json
│   ├── README.md
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── Api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── IdGenerator.js									
│   │   ├── TimeManipulation.js							
│   │   ├── components
│   │   │   ├── AppHeader.js								
│   │   │   ├── Buttons											
│   │   │   │   ├── FileUploadBtn.js
│   │   │   │   └── ToggleGameBtn.js
│   │   │   ├── ChartTabBar.js							
│   │   │   ├── Charts											
│   │   │   │   ├── ChartsController.js			
│   │   │   │   ├── ResultBarChart.js				
│   │   │   │   ├── ResultBarChart.test.js	
│   │   │   │   ├── ResultLineChart.js
│   │   │   │   └── ResultPieChart.js
│   │   │   ├── GameCard.js
│   │   │   ├── JoinGameInput.js
│   │   │   ├── Modals
│   │   │   │   ├── CreateGameModal.js
│   │   │   │   ├── EnterNameModal.js
│   │   │   │   ├── GameHistoryModal.js
│   │   │   │   ├── ImportModal.js
│   │   │   │   ├── PlayerResultModal.js
│   │   │   │   ├── QuizNameModal.js
│   │   │   │   ├── VideoModal.js
│   │   │   │   └── VideoModal.test.js
│   │   │   ├── Row.js
│   │   │   ├── Row.test.js
│   │   │   ├── SelectionBox.js
│   │   │   ├── TableRows
│   │   │   │   ├── GameHistoryItem.js
│   │   │   │   ├── PlayerOverviewRow.js
│   │   │   │   └── PlayerResultRow.js
│   │   │   ├── Tables
│   │   │   │   ├── GameHistoryTable.js
│   │   │   │   ├── PlayerOverviewTable.js
│   │   │   │   └── PlayerResultTable.js
│   │   │   ├── TimerCount.js
│   │   │   ├── Titles
│   │   │   │   ├── Subtitle.js
│   │   │   │   └── Title.js
│   │   │   └── __snapshots__
│   │   │       └── Row.test.js.snap
│   │   ├── config.json
│   │   ├── index.css
│   │   ├── index.jsx
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── Dashboard.js
│   │   │   ├── GameAdminController.js
│   │   │   ├── GameAdminQuestion.js
│   │   │   ├── GameEdit.js
│   │   │   ├── GamePlayerController.js
│   │   │   ├── GamePlayerQuestion.js
│   │   │   ├── Home.js
│   │   │   ├── JoinSession.js
│   │   │   ├── LobbyAdmin.js
│   │   │   ├── LobbyPlayer.js
│   │   │   ├── Login.js
│   │   │   ├── NotFound.js
│   │   │   ├── PlayerResult.js
│   │   │   ├── QuestionEdit.js
│   │   │   ├── Register.js
│   │   │   ├── SessionResults.js
│   │   │   └── styles.css
│   │   └── setupTests.js
│   ├── yarn-error.log
│   └── yarn.lock
├── package-lock.json
├── package.json
├── screenshots
└── yarn.lock

16 directories, 89 files
```

