const {average} = require('./test-functions/for_testing')

describe.skip('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(1)
	})

	test('of many is calculated correctly', () => {
		expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4)
	})

	test('of empty array is zero', () => {
		expect(average([])).toBe(0)
	})

	test('of undefined is zero', () => {
		expect(average()).toBe(0)
	})


})
