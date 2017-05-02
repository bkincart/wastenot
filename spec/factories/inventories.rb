FactoryGirl.define do
  factory :inventory, class: Inventory do
    quantity 2
    measurement 'pounds'
    item 'chicken'
    available true
  end
end
