### <h1>Banking System</h1>  ###

<h3>Getting Started</h3>
<p>1. Start the Xampp services, Apache and Mysql</p>
<p>2. Create a database bank</p>
<p>3. run "npm i" in the root directory </p>
<p>4. run "npm i" in frontend directory</p>
<p>5. run "npm i" in backend directory</p>
<p>6. Once the installation is done run "npm run dev" in the root directory to run both the frontend and backend together</p>

<h3>Configs</h3>
<h5>Xampp Config</h5>
<p>ports</p>
<p>    Apache = 80, 443</p>
<p>    Mysql= 3306</p>

<h5>Backend</h5>
<p>PORT = 5000</p>
<p>JWT_SECRET = password</p>
<p>knex dev mode = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      database: 'bank',
      user: 'root',
      password: ''
    },
    migrations:{
      directory: __dirname + '/src/db/migrations'
    },
    seeds:{
      directory: __dirname + '/src/db/seeds'
    }
}</p>

<h5>Frontend</h5>
<p>Port=8080</p>
<p>proxied the requests to backend by adding proxy script in package.json</p>
