User.create(
  name: 'Star Market',
  address: '33 Kilmarnock St',
  city: 'Boston',
  state: 'MA',
  zip: '02215',
  phone: '6172674684',
  type: 'Store',
  email: 'starmarket@store.com',
  password: 'password'
)

User.create(
  name: 'Trader Joe\'s',
  address: '1317 Beacon St',
  city: 'Brookline',
  state: 'MA',
  zip: '02446',
  phone: '6172789997',
  type: 'Store',
  email: 'traderjoes@store.com',
  password: 'password'
)

User.create(
  name: 'Rosie\'s Place',
  address: '889 Harrison Ave',
  city: 'Boston',
  state: 'MA',
  zip: '02118',
  phone: '6174429322',
  type: 'Shelter',
  email: 'rosiesplace@shelter.com',
  password: 'password'
)

Inventory.create(
  quantity: 3.5,
  measurement: 'Trays',
  item: 'Chicken parmigian',
  available: true,
  active: true,
  user_id: 1
)

Inventory.create(
  quantity: 5,
  measurement: 'Gallons',
  item: 'Milk',
  available: true,
  active: false,
  user_id: 1
)

Inventory.create(
  quantity: 6,
  measurement: 'Bags',
  item: 'Pretzels',
  available: false,
  active: false,
  user_id: 1
)

Inventory.create(
  quantity: 5,
  measurement: 'dozen',
  item: 'Bagels',
  available: false,
  active: true,
  user_id: 1
)

Inventory.create(
  quantity: 10,
  measurement: 'pounds',
  item: 'Tomatoes',
  available: true,
  active: true,
  user_id: 2
)

Pickup.create(
  shelter_id: 3,
  store_id: 1,
  inventory_id: 3
)

Pickup.create(
  shelter_id: 3,
  store_id: 1,
  inventory_id: 2
)

Comment.create(
  body: 'Are the bagels stale?',
  user_id: 3,
  inventory_id: 2,
  user_name: 'Rosie\'s Place'
)

Comment.create(
  body: 'No, they probably have another day in them!',
  user_id: 1,
  inventory_id: 2,
  user_name: 'Star Market'
)
