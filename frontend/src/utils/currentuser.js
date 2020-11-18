import jwt_decode from 'jwt-decode'

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
var user
if(token){
   user = jwt_decode(token)
}

export default user