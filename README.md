# Git 指令

### github repo有人更新時跑 `git pull` 更新本地檔案

## 修改上傳
HI
`git add .`    
`git commit -m "<訊息>"`   
`git push`

# WEB 架構

## Backend 後端 Flask api

### Route

#### /user POST
新增使用者資料(註冊)
##### status code
- 201 created
- 409 conflict
##### request body
- username
- password
##### response body
- message (something like "successfully created user")
- username
- user_id

**maybe set cookie here**

---
#### /user GET
獲取使用者資料
##### status code
- 200 OK
- 403 Forbidden
- 404 Not Found
##### request body
- username or user_id
##### response body
- message (something like "success" or error message)
- username
- *user_data*
- user_id

**check cookie here**

---
#### /user PUT
修改使用者資料
##### status code
- 200 OK
- 403 Forbidden
- 404 Not Found
##### request body
- username or user_id
- *user_data*
##### response body
- message (something like "success" or error message)
- username
- *user_data*
- user_id

---
#### /user/:id/login POST
登入
##### status code
- 200 OK
- 403 Forbidden
- 404 Not Found
##### request body
- username or user_id
- password
##### response body
- message (something like "success" or error message)
- username
- user_id

**maybe set cookie here**
