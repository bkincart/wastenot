FactoryGirl.define do
  factory :store, class: User do
    name 'Star Market'
    address '5 Pleasant Lane'
    city 'Boston'
    state 'MA'
    zip '02216'
    phone '5185552968'
    sequence(:email) { |n| "store#{n}@test.com" }
    type 'store'
    password 'password'
    password_confirmation 'password'
  end

  factory :shelter, class: User do
    name 'Boston Shelter'
    address '253 Sunnyside Ave'
    city 'Boston'
    state 'MA'
    zip '02215'
    phone '8395551827'
    sequence(:email) { |n| "shelter#{n}@test.com" }
    type 'shelter'
    password 'password'
    password_confirmation 'password'
  end
end
