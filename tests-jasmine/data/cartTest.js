import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    // Reset the cart before each test
    cart.length = 0;
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    spyOn(document, 'querySelector').and.callFake((selector) => {
      return {
        value: '2'  // Mocked value for the quantity selector
      };
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3);  // 1 (existing quantity) + 2 (new quantity)
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(document, 'querySelector').and.callFake((selector) => {
      return {
        value: '2'  // Mocked value for the quantity selector
      };
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);  // New quantity
  });
});

// import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

// describe('test suite: addToCart', () => {
//   it('adds an existing product to the cart', () => {
//     spyOn(localStorage, 'setItem');

//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 1,
//         deliveryOptionId: '1'
//       }]);
//     });
//     loadFromStorage();

//     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart[0].quantity).toEqual(quantity);
//   });

//   it('adds a new product to the cart', () => {
//     spyOn(localStorage, 'setItem');

//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([]);
//     });
//     loadFromStorage();

//     addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
//     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cart[0].quantity).toEqual(quantity);
//   });
// });