

const  keyUri = {

    // BACKEND_URI:'https://my-app-5gv32.ondigitalocean.app/api'

    BACKEND_URI:'http://localhost:5000/api'
}

let token = localStorage.getItem('token')
const config = {
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    }
  };

export  {keyUri, config }