require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:name).when('Star Market', 'Trader Joe\'s') }
  it { should_not have_valid(:name).when('', nil) }

  it { should have_valid(:address).when('123 Pleasant Street', '52 Maxwell St.') }
  it { should_not have_valid(:address).when('', nil) }

  it { should have_valid(:city).when('Boston', 'New York') }
  it { should_not have_valid(:city).when('', nil) }

  it { should have_valid(:state).when('MA', 'NY') }
  it { should_not have_valid(:state).when('', nil, 'string not in state array') }

  it { should have_valid(:zip).when('01456', '02216') }
  it { should_not have_valid(:zip).when('', nil, 'not numbers', '0421') }

  it { should have_valid(:phone).when('8375557582', '932-555-1856', '1(285)555-1826', '28595551842') }
  it { should_not have_valid(:phone).when('', nil, '6283655551927', '29182715', '295-555-184') }

  it { should have_valid(:email).when('Bob@gmail.com', 'Brianna@test.com') }
  it { should_not have_valid(:email).when('', nil, 'bob', 'bob@gmail', 'bob.com') }

  it { should have_valid(:type).when('store', 'shelter') }
  it { should_not have_valid(:type).when('', nil, 'not a valid type') }

  it 'has a unique email for each account' do
    user = User.new
    user.email = 'test@test.com'
    user2 = User.new
    user2.email = 'test@test.com'

    expect(user2).to_not be_valid
    expect(user2.errors[:email]).to_not be_blank
  end

  it 'has a matching password confirmation for the password' do
    user = User.new
    user.password = 'password'
    user.password_confirmation = 'anotherpassword'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end

  it "is a store if the role is store" do
    user = FactoryGirl.create(:store)
    expect(user.store?).to eq(true)
  end

  it "is not a store if the role is not store" do
    user = FactoryGirl.create(:shelter)
    expect(user.store?).to eq(false)
  end

  it "is a shelter if the role is shelter" do
    user = FactoryGirl.create(:shelter)
    expect(user.shelter?).to eq(true)
  end

  it "is not a shelter if the role is not shelter" do
    user = FactoryGirl.create(:store)
    expect(user.shelter?).to eq(false)
  end
end
