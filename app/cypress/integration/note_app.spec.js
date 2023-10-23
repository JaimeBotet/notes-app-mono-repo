describe('Note App', () => {

	beforeEach( () => {
		cy.visit('http://localhost:3000');

		cy.request('POST', 'http://localhost:3001/api/testing/reset')

		const user = {
			name: 'Jaime',
			username: 'jbotet',
			password: '123test'
		}

		cy.request('POST', 'http://localhost:3001/api/users/', user)
	})

	it('frontpage can be opened', () => {
		cy.contains('Notes')
	})

	it('User can log in', () => {
		cy.contains('SHOW LOGIN').click()
		cy.get('[name="Username"]').type('jbotet')
		cy.get('[name="Password"]').type('123test')
		cy.get('[data-test-id="login-form"] button').click()
	})

	it('User can create note', () => {
		cy.contains('SHOW LOGIN').click()
		cy.get('[name="Username"]').type('jbotet')
		cy.get('[name="Password"]').type('123test')
		cy.get('[data-test-id="login-form"] button').click()
		cy.contains('New Note')
	})

	it('Login fails with wrong password', () => {
		cy.contains('SHOW LOGIN').click()
		cy.get('[name="Username"]').type('jbotet')
		cy.get('[name="Password"]').type('patatafrita')
		cy.get('[data-test-id="login-form"] button').click()

		cy.get('.error')
			.should('contain', 'Wrong Credentials')
	})

	describe('when logged in', () => {
		beforeEach( () => {
			cy.login( { username: 'jbotet', password: '123test'})
		})

		it('a new note can be created', () => {
			const noteContent = 'a note created by cypress'
			cy.contains('New Note').click()
			cy.get('input').type(noteContent)
			cy.contains('Save').click()
			cy.contains(noteContent)
		})

		describe('and a note exists', () => {
			beforeEach( () => {
				cy.createNote( { 
					content: 'note created from cypress', 
					important: false
				})
			})

			it('Created note is retrieved', () => {
				cy.contains('note created from cypress')
			})

		})
	})
})