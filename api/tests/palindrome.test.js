const {palindrome} = require('./test-functions/for_testing')

describe.skip('palindrome', () => {

	test('palindrome of midudev', () => {
		expect(palindrome('midudev')).toBe('vedudim')
	})
	
	test('palindrome of empty string', () => {
		expect(palindrome('')).toBe('')
	})
	
	test('palindrome of undefined', () => {
		expect(palindrome()).toBeUndefined()
	})
})
