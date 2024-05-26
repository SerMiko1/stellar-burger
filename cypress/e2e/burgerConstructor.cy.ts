import * as authTokens from '../fixtures/token.json';
import * as orderData from '../fixtures/order.json';

describe('Интеграционные тесты для страницы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  describe('Тестирование загрузки ингредиентов и добавления их в конструктор', () => {
    it('Добавление булок и ингредиентов в заказ', () => {
      cy.request('/api/ingredients');

      cy.get(`[data-cy=bun] > .common_button`).first().click();
      cy.get(`[data-cy=main] > .common_button`).first().click();
      cy.get(`[data-cy=sauce] > .common_button`).first().click();

      const burgerConstructor = {
        bunTop: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .first(),
        mainIngredient: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(1),
        sauceIngredient: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(2),
        bunBottom: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .last()
      };

      burgerConstructor.bunTop.contains('Краторная булка N-200i (верх)');
      burgerConstructor.mainIngredient.contains(
        'Биокотлета из марсианской Магнолии'
      );
      burgerConstructor.sauceIngredient.contains('Соус Spicy-X');
      burgerConstructor.bunBottom.contains('Краторная булка N-200i (низ)');
    });
  });

  describe('Тестирование работы модального окна для ингредиента', () => {
    it('Открытие модального окна', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child');
      const header = modal.get('div:first-child > h3');

      header.contains('Краторная булка N-200i');
    });

    it('Закрытие модального окна по крестику', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      const button = modal.get('div:first-child > button > svg').click();

      cy.get('modal').should('not.exist');
    });

    it('Закрытие модального окна по клику на оверлей', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      const overlay = modal.get('#modals > div:nth-child(2)');

      overlay.click({ force: true });

      cy.get('modal').should('not.exist');
    });
  });

  describe('Тестирование создания заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.setCookie('accessToken', authTokens.accessToken);
      localStorage.setItem('refreshToken', authTokens.refreshToken);
      cy.intercept('GET', 'api/auth/tokens', {
        fixture: 'token.json'
      });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    });

    it('Полный прогон создания заказа', () => {
      cy.get(`[data-cy=bun] > .common_button`).first().click();
      cy.get(`[data-cy=main] > .common_button`).first().click();
      cy.get(`[data-cy=sauce] > .common_button`).first().click();

      cy.get(
        '#root > div > main > div > section:nth-child(2) > div > button'
      ).click();

      const orderModal = cy.get('#modals > div:first-child');
      const orderNumber = orderModal.get('div:nth-child(2) > h2');

      orderNumber.contains(orderData.order.number);

      orderModal.get(
        'div:first-child > div:first-child > button > svg'
      ).click();;

      cy.get('modal').should('not.exist');

      const burgerCunstructor = {
        constructorBunTop: cy.get('div > section:nth-child(2) > div'),
        constructoMainIngredient: cy.get(
          'div > section:nth-child(2) > ul > div'
        ),
        constructorBunBottom: cy.get(
          'div > section:nth-child(2) > div:nth-child(3)'
        )
      };

      burgerCunstructor.constructorBunTop.contains('Выберите булки');
      burgerCunstructor.constructoMainIngredient.contains('Выберите начинку');
      burgerCunstructor.constructorBunBottom.contains('Выберите булки');
    });

    afterEach(() => {
      cy.clearAllCookies();
      localStorage.removeItem('refreshToken');
    });
  });
});
