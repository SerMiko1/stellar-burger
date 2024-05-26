import { v4 as uuidv4 } from 'uuid';

import { notBuns, buns } from '../../../testData';
import burgerConstructorReducer, {
  addIngredient,
  clearBurgerConstructor,
  downIngredient,
  removeIngredient,
  upIngredient
} from './slice';

jest.mock('uuid');

describe('Тесты синхронных экшенов', () => {
  const clearInitialState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    error: null
  };
  const filledInitialState = {
    burgerConstructor: {
      bun: {
        ...buns[0],
        id: '0'
      },
      ingredients: [
        {
          ...notBuns[0],
          id: '1'
        },
        {
          ...notBuns[0],
          id: '2'
        }
      ]
    },
    error: null
  };

  (uuidv4 as jest.Mock).mockImplementation(() => 1);
  test('Проверяем добавление булки в пустой конструктор', () => {
    const bun = buns[0];
    const newState = burgerConstructorReducer(
      clearInitialState,
      addIngredient(bun)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun?.id).toEqual(1);
  });

  test('Проверяем изменение булки', () => {
    const bun = buns[1];
    const newState = burgerConstructorReducer(
      filledInitialState,
      addIngredient(bun)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun?._id).not.toEqual(buns[0]._id);
  });
  test('Проверяем добавление ингредиента в пустой конструктор', () => {
    const ingredient = notBuns[0];
    const newState = burgerConstructorReducer(
      clearInitialState,
      addIngredient(ingredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(1);
    expect(burgerConstructor.ingredients[0].id).toBe(1);
  });
  test('Проверяем добавление ингредиента в непустой конструктор', () => {
    const ingredient = notBuns[0];
    const newState = burgerConstructorReducer(
      filledInitialState,
      addIngredient(ingredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(3);
    expect(burgerConstructor.ingredients[2].id).toBe(1);
  });
  test('Проверяем перемещение ингредиента вверх', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      upIngredient(1)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients[0]._id).toBe(
      filledInitialState.burgerConstructor.ingredients[1]._id
    );
  });
  test('Проверяем перемещение ингредиента вниз', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      downIngredient(0)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients[1]._id).toBe(
      filledInitialState.burgerConstructor.ingredients[0]._id
    );
  });
  test('Проверяем удаление ингредиента', () => {
    const removedIngredient =
      filledInitialState.burgerConstructor.ingredients[0];
    const newState = burgerConstructorReducer(
      filledInitialState,
      removeIngredient(removedIngredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(1);
    expect(burgerConstructor.ingredients).not.toContainEqual(removedIngredient);
  });
  test('Проверяем очистку конструктора', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      clearBurgerConstructor()
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun).toBeNull();
    expect(burgerConstructor.ingredients.length).toBe(0);
  });
});
