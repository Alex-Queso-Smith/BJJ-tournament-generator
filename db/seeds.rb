userInstructor = FactoryBot.create(
  :user,
  instructor: true
)

academy = FactoryBot.create(
  :academy,
  user: userInstructor
)
