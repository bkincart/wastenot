require 'rails_helper'

RSpec.describe Inventory, type: :model do
  it { should have_valid(:quantity).when(5, 6.5) }
  it { should_not have_valid(:quantity).when(-2, 0, '', nil) }

  it { should have_valid(:item).when('french fries', 'lasagna') }
  it { should_not have_valid(:item).when('', nil) }

  it { should have_valid(:available).when(true, false) }
  it { should_not have_valid(:available).when('', nil) }
end
