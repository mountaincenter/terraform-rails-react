6.times do |n|
  if n % 3 == 1
    Blog.create!(
      title: Faker::Book.title,
      contents: Faker::Lorem.paragraph,
      image:File.open("./image/default.jpeg")
    )
  elsif n % 3 == 2
    Blog.create!(
      title: Faker::Food.dish,
      contents: Faker::Food.description,
      image:File.open("./image/paella.jpeg")
    )
  else
    Blog.create!(
      title: Faker::JapaneseMedia::StudioGhibli.character,
      contents:Faker::Lorem.paragraph,
    )
  end
end