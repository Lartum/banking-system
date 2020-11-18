import jwt_decode from 'jwt-decode'

const user = localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null


export default user