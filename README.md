# rails_react_spa

[rails,react]aioxs edit,update,destroy

[react]card grid,created_at,like,shere,menu

[rails] user_model (devise_auth_token)

[rails7 api]post model(title, photo, contexts)
## railsの手順
```bash
# current directryでの新規作成
# database:mysql apiモード
rails new . -f -d mysql --api
```
```diff
# config/database.ymlの変更
default: &default
  -- 中略 --
- host: localhost
+ host: db
```
```ruby
rails db:create
```
```bash
# サーバーの再起動
docker-compose up -d --build
```
## react(typescript)の手順
```bash
yarn create react-app . --template typescript
```
