import axios from 'axios'
const baseUrl = '/api/login'
// const prodUrl = 'https://fullstack-bootcamp.herokuapp.com/api/notes'

const login = async (credentials) => {
	console.log(credentials)
	const { data } = await axios.post(baseUrl, credentials)
	return data
}


export { login }