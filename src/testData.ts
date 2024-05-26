import { TIngredient, TOrder } from './utils/types';

export const buns: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

export const notBuns: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

export const order: TOrder = {
  _id: 'testOrderIdNew',
  status: 'new',
  name: 'test order',
  createdAt: '2024-04-27T07:59:55.703Z',
  updatedAt: '2024-04-27T07:59:56.203Z',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ]
};

export const userOrders: TOrder[] = [
  {
    _id: 'testid1',
    status: 'done',
    name: 'test order 1',
    createdAt: '2024-04-27T07:39:15.703Z',
    updatedAt: '2024-04-27T07:39:16.203Z',
    number: 1,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: 'testid2',
    status: 'done',
    name: 'test order 2',
    createdAt: '2024-04-27T07:49:15.703Z',
    updatedAt: '2024-04-27T07:49:16.203Z',
    number: 2,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: 'testid3',
    status: 'done',
    name: 'test order 3',
    createdAt: '2024-04-27T07:59:15.703Z',
    updatedAt: '2024-04-27T07:59:16.203Z',
    number: 3,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
];

export const ingredients: TIngredient[] = [...buns, ...notBuns];
