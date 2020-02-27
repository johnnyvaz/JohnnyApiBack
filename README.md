
# JohnnyAPIBackend 

BackEnd em Node.Js com login


#Criação de servidor de API
## Instalação

  npm i
  
  npm i knex -g
  
Configure o arquivo .env  

  npm run migrate
  
  npm start

# exemplo de cadastro de usuario

url: localhost:4000/signin
post: 
{
	"email": "johnnyvaz@johnnyvaz.com.br",
	"password": "123456"
}

retorno:
{
    "id": 1,
    "name": "Johnny",
    "email": "johnnyvaz@johnnyvaz.com.br",
    "admin": true,
    "iat": 1559239209,
    "exp": 1559498409,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55X3ZhekBhbmRlc2VycC5jb20uYnIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTU5MjM5MjA5LCJleHAiOjE1NTk0OTg0MDl9.YU6rygTn8zA-LHnRG46RuOdpFfHQbeEKYl50fAUdnVU"
}
