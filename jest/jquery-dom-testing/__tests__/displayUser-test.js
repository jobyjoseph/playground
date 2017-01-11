'use strict';

jest.mock('../fetchCurrentUser');

it('displays a user after a click', () => {
  document.body.innerHTML =
  '<div>' +
  ' <span id="username" />' +
  ' <button id="button" />' +
  '</div>';

  require('../displayUser');

  const $ = require('jquery');
  const fetchCurrentUser = require('../fetchCurrentUser');

  fetchCurrentUser.mockImplementation(cb => {
    cb({
      loggedIn: true,
      fullName: 'Johnny Cash'
    });
  });

  $('#button').click();

  expect(fetchCurrentUser).toBeCalled();
  expect($('#username').text()).toEqual('Johnny Cash - Logged In');
});
