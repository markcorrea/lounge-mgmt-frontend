const products = [
  {
    _id: 0,
    name: 'Skol 600',
    barcode: '005646516987984',
    quantity: 20,
    price: 2.5,
    terminal: 1,
  },
  {
    _id: 1,
    name: 'Brahma 600',
    barcode: '445489754654',
    quantity: 15,
    price: 2.8,
    terminal: 1,
  },
  {
    _id: 2,
    name: 'Antarctica 600',
    barcode: '55486546565165',
    quantity: 25,
    price: 2.0,
    terminal: 1,
  },
  {
    _id: 3,
    name: 'Doritos',
    barcode: '68984968496841',
    quantity: 60,
    price: 1.8,
    terminal: 1,
  },
]

const cashiers = [
  {
    _id: 0,
    name: 'Amanda',
    dateOpen: '07:00',
    dateClose: '12:00'
  },
  {
    _id: 1,
    name: 'Carlos',
    dateOpen: '12:00',
    dateClose: '18:00'
  },
  {
    _id: 2,
    name: 'Sérgio',
    dateOpen: '18:00',
    dateClose: '21:00'
  },
  {
    _id: 3,
    name: 'Carla',
    dateOpen: '21:00',
    dateClose: '23:00'
  },
]

export { products, cashiers }
