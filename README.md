# rails_react_spa
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