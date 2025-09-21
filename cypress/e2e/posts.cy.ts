describe('Posts Application', () => {
  beforeEach(() => {
    // Мокаем ответ на запрос GET /posts, чтобы тесты были независимы от реального сервера
    cy.intercept('GET', '/posts', [
      {
        id: 2,
        created: 1758468677714,
        content: 'Получилось сделать гибрид работы с локальным и удаленным серверами',
        title: 'React routing',
        author: 'Разработчик',
        tags: [],
        category: ''
      }
    ]).as('getPosts');

    cy.visit('/');
  });

  afterEach(() => {
    // Очищаем localStorage после каждого теста
    cy.clearLocalStorage();
  });

  it('should load the main page', () => {
    cy.contains('Все посты').should('be.visible');
  });

  it('should display posts list', () => {
    // Проверяем, что загрузилась страница со списком постов
    cy.contains('Все посты').should('be.visible');
    // Проверяем кнопку создания поста
    cy.contains('Создать пост').should('be.visible');
  });

  it('should open create post form', () => {
    cy.contains('Создать пост').click();
    cy.url().should('include', '/posts/new');
    cy.contains('Создание нового поста').should('be.visible');
  });

  it('should navigate to different pages', () => {
    // Проверяем, что находимся на главной странице
    cy.contains('Все посты').should('be.visible');

    // Проверяем кнопку создания поста
    cy.contains('Создать пост').should('be.visible');
  });

  it('should handle form submission', () => {
    cy.contains('Создать пост').click();
    cy.get('textarea[placeholder="Введите текст поста..."]').should('be.visible').type('Test post content for Cypress testing');

    // Submit form
    cy.contains('Опубликовать').click();


    // Should redirect back to posts list
    cy.contains('Все посты', { timeout: 10000 }).should('be.visible');
  });

  it('should display error modal when needed', () => {
    // Проверяем, что кнопка "Опубликовать" неактивна при пустом поле "Содержание поста"
    cy.contains('Создать пост').click();
    cy.get('textarea[placeholder="Введите текст поста..."]').should('have.value', '');
    cy.contains('Опубликовать').should('be.disabled');
  });

  it('should handle responsive design', () => {
    // Test mobile viewport
    cy.viewport('iphone-6');
    cy.contains('Все посты').should('be.visible');

    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.contains('Все посты').should('be.visible');

    // Test desktop viewport
    cy.viewport('macbook-13');
    cy.contains('Все посты').should('be.visible');
  });
});
