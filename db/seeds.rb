userInstructor = FactoryBot.create(
  :user,
  email: "quesoglass@gmail.com",
  first_name: "Alex",
  last_name: "Smith",
  belt: "Blue",
  instructor: true
)

userAdmin = FactoryBot.create(
  :user,
  email: "cheesebaron21@gmail.com",
  first_name: "Alex",
  last_name: "Smith",
  nickname: "Queso",
  belt: "Blue",
  admin: true
)

academy = FactoryBot.create(
  :academy,
  user: userInstructor,
  name: "Launch Academy",
  address: "77 Summer St.",
  city: "Boston",
  state: "MA",
  zipcode: "77777"
)

userInstructor.update(
  academy: academy
)

user1 = FactoryBot.create(
  :user,
  email: "Mathew@clarke.com",
  first_name: "Mathew",
  last_name: "Clarke",
  nickname: "Ponytail",
  academy: academy,
  belt: "White"
)

user2 = FactoryBot.create(
  :user,
  email: "Roxanne@Cojocariu.com",
  first_name: "Roxanne",
  last_name: "Cojocariu",
  nickname: "Bigmouth",
  academy: academy,
  belt: "White"
)

user3 = FactoryBot.create(
  :user,
  email: "Eunice@Choi.com",
  first_name: "Eunice",
  last_name: "Choi",
  nickname: "Miss Snacks",
  academy: academy,
  belt: "Blue"
)

user4 = FactoryBot.create(
  :user,
  email: "Andrew@McLellan.com",
  first_name: "Andrew",
  last_name: "McLellan",
  nickname: "Mr Boston",
  academy: academy,
  belt: "Blue"
)

user5 = FactoryBot.create(
  :user,
  email: "Cassandra@Newell.com",
  first_name: "Cassandra",
  last_name: "Newell",
  nickname: "Smarty Pants",
  academy: academy,
  belt: "Purple"
)

user6 = FactoryBot.create(
  :user,
  email: "David@Atwater",
  first_name: "David",
  last_name: "Atwater",
  nickname: "Puzzle Man",
  academy: academy,
  belt: "Purple"
)

user7 = FactoryBot.create(
  :user,
  email: "Andrey@Knyazev",
  first_name: "Andrey",
  last_name: "Knyazev",
  nickname: "AK-47",
  academy: academy,
  belt: "Brown"
)

user8 = FactoryBot.create(
  :user,
  email: "Greg@Pica.com",
  first_name: "Greg",
  last_name: "Pica",
  nickname: "It's Lit!",
  academy: academy,
  belt: "Brown"
)

user9 = FactoryBot.create(
  :user,
  email: "Nick@Alberts.com",
  first_name: "Nick",
  last_name: "Alberts",
  nickname: "Unicorn King",
  academy: academy,
  belt: "Black"
)

user10 = FactoryBot.create(
  :user,
  email: "Dan@Pickett.com",
  first_name: "Dan",
  last_name: "Pickett",
  nickname: "Big Dan",
  academy: academy,
  belt: "Black"
)
