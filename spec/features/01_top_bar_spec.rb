require 'rails_helper'

feature 'Top Bar Exists' do
  #As a visitor
  # I want to see a top bar on every page
  # So I can easily navigate the site

  scenario 'top bar has home navigation button' do
    visit new_user_session_path
    click_link 'WasteNot'
    expect(page).to have_current_path(root_path)
  end

  scenario 'top bar has search button' do
    visit root_path
    expect(page).to have_content('Search')
  end

  scenario 'top bar has sign up/log in' do
    visit root_path
    expect(page).to have_content 'Sign Up'
    expect(page).to have_content 'Log In'
  end
end

feature 'User Sign Up and Log In' do
  # As a user
  # I want to be able to sign in to the site
  # So I can utilize my account

  scenario 'user signs up successfully' do
    visit root_path
    click_link 'Sign Up'
    page.select 'Store', from: 'Type'
    fill_in 'Name', with: 'Star Market'
    fill_in 'Address', with: '123 Pleasant Street'
    fill_in 'City', with: 'Boston'
    page.select 'MA', from: 'State'
    fill_in 'Zip', with: '02216'
    fill_in 'Phone', with: '617-555-2947'
    fill_in 'Email', with: 'star@test.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up!'

    expect(page).to have_content 'You have signed up successfully!'
    expect(page).to have_current_path(root_path)
    expect(page).to have_content 'My Account'
    expect(page).to_not have_content 'Log In'
    expect(page).to_not have_content 'Sign In'
  end

  scenario 'user doesn\'t enter required information into signup form' do
    visit root_path
    click_link 'Sign Up'
    click_button 'Sign Up!'

    expect(page).to have_content 'Type cannot be blank'
    expect(page).to have_content 'Name cannot be blank'
    expect(page).to have_content 'Address cannot be blank'
    expect(page).to have_content 'City cannot be blank'
    expect(page).to have_content 'State cannot be blank'
    expect(page).to have_content 'Zip cannot be blank'
    expect(page).to have_content 'Email cannot be blank'
    expect(page).to have_content 'Password cannot be blank'
    expect(page).to have_current_path(new_user_registration_path)
    expect(page).to_not have_content 'My Account'
    expect(page).to have_content 'Log In'
    expect(page).to have_content 'Sign In'
  end

  scenario 'user enters incorrectly formatted information into signup form' do
    visit root_path
    click_link 'Sign Up'
    page.select 'Store', from: 'Type'
    fill_in 'Name', with: 'Star Market'
    fill_in 'Address', with: '123 Pleasant Street'
    fill_in 'City', with: 'Boston'
    page.select 'MA', from: 'State'
    fill_in 'Zip', with: '0221'
    fill_in 'Phone', with: '617-555-2947183'
    fill_in 'Email', with: 'star@test'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'differentpassword'
    click_button 'Sign Up!'

    expect(page).to have_content 'Zip must have a length of 5'
    expect(page).to have_content 'Phone must have be a minimum of 10 and maximum of 11'
    expect(page).to have_content 'Email is not a valid email address'
    expect(page).to have_content 'Password is too short (minimum is 6 characters)'
    expect(page).to have_content 'Password confirmation doesn\'t match Password'
    expect(page).to have_current_path(new_user_registration_path)
    expect(page).to_not have_content 'My Account'
    expect(page).to have_content 'Log In'
    expect(page).to have_content 'Sign In'
  end

  scenario 'user gives email address that already has an account' do
    user = FactoryGirl.create(:store)

    visit root_path
    click_link 'Sign Up'
    page.select 'Store', from: 'Type'
    fill_in 'Name', with: 'Star Market'
    fill_in 'Address', with: '123 Pleasant Street'
    fill_in 'City', with: 'Boston'
    page.select 'MA', from: 'State'
    fill_in 'Zip', with: '02216'
    fill_in 'Phone', with: '617-555-2947'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up!'

    expect(page).to have_content 'An account already exists for that email address!'
  end

  scenario 'user logs in successfully' do
    user = FactoryGirl.create(:store)
    visit root_path
    click_link 'Log In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'

    expect(page).to have_content 'You have logged in successfully!'
    expect(page).to have_current_path(root_path)
    expect(page).to have_content 'My Account'
    expect(page).to_not have_content 'Log In'
    expect(page).to_not have_content 'Sign In'
  end

  scenario 'user omits required information in login form' do
    visit root_path
    click_link 'Log In'
    click_button 'Log In'

    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content 'Email cannot be blank'
    expect(page).to_not have_content 'Password cannot be blank'
  end

  scenario 'user uses email address without an account' do
    visit new_user_session_path
    fill_in 'Email', with: 'nonexistant@email.com'
    fill_in 'Password', with: 'password'
    click_button 'Log In'

    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content 'We could not find your email!'
    expect(page).to have_content "Please reenter or create an account."
  end

  scenario 'user enters incorrect password' do
    user = FactoryGirl.create(:store)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'incorrectpassword'
    click_button 'Log In'

    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content 'Sorry! Wrong password. Please try again!'
  end
end

feature 'User Sign Out' do
  # As an authorized user
  # I want to see a menu of account actions
  # So that I can update my account or sign out

  scenario 'Store user signs in and sees account dropdown menu' do
    user = FactoryGirl.create(:store)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'

    expect(page).to have_content 'My Account'
    # Hover over 'My Account'
    find('My Account').hover

    expect(page).to have_content 'Update Profile'
    expect(page).to have_content 'Current Inventory'
    expect(page).to have_content 'Sign Out'
  end

  scenario 'Shelter user signs in and sees account dropdown menu' do
    user = FactoryGirl.create(:shelter)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'

    expect(page).to have_content 'My Account'
    # Hover over 'My Account'
    find('My Account').hover

    expect(page).to have_content 'Update Profile'
    expect(page).to have_content 'View Pickups'
    expect(page).to have_content 'Sign Out'
  end

  scenario 'User signs out successfully' do
    user = FactoryGirl.create(:store)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log In'

    # Hover over 'My Account'
    find('My Account').hover
    click_link 'Sign Out'

    expect(page).to have_content 'You have signed out successfully'
    expect(page).to have_content 'Log In'
  end
end
