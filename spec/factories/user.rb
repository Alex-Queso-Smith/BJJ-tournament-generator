FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    first_name "Alex"
    last_name "Smith"
    belt "Blue"
  end

end
