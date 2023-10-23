const palindrome = (string) => {
	if(typeof string === 'undefined') return 
	return string
		.split('')
		.reverse()
		.join('')
}

const average = array => {
	if (typeof array === 'undefined' || array.length === 0 ) return 0;
	let sum = 0;
	return array.reduce( (acc, cur) => acc + cur, sum) /array.length;
}

module.exports = {
	palindrome,
	average
}