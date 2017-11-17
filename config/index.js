module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PUBLIC_PATH: process.env.NODE_ENV === 'development' ? '/' : './',
	SERVICE_URL: 'http://dev.example.com'
}