const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //si no encuentra el puerto pone 3000

app.use(express.static('assets')); //middleware carpeta publica

const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', "Ignacia", "Javier", "Brian"]; //arreglo

app.get('/', (req, res) => {
    res.send('🔥¡Bienvenido a la página de inicio!🔥'); //ruta raiz
  });

app.get('/abracadabra/usuarios', (req, res) => { //ruta devuelve json
    res.json(usuarios)
});

app.get('/abracadabra/conejo/:n', (req, res) => { //ruta dinamica
    const n = req.params.n //aqui capturamos el numero de la ruta dinamica
    const numero = Math.floor(Math.random() * (5 - 1)) + 1; //numero aleatorio
    if (n == numero) {
        res.sendFile(__dirname + '/assets/img/conejito.jpg'); // Devolver imagen del Conejo si coincide
    } else {
      res.sendFile(__dirname + '/assets/img/voldemort.jpg'); // Devolver imagen de Voldemort si no coincide
    }
  });
  app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario_ruta = req.params.usuario //aqui capturamos el usuario de la ruta dinamica
    const isUser = usuarios.map((u) => u.toLowerCase()).includes(usuario_ruta.toLowerCase()); //aqui verificamos si el nombre de la ruta esta en el array
  
    isUser ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");     //captura imagen incognita      
    }); 

  app.get('/abracadabra/juego/:usuario', (req, res) => { //ruta devuelve imagen incognita
    res.sendFile(__dirname + '/index.html')
});    

app.get('*', (req, res) => { //ruta generica
    res.send("<center><h1>Sorry, aquí no hay nada 🤣🤣 </h1></center>")
}) //windows + . = inserta iconos

app.listen(port, () => {
    console.log(`🔥Servidor corriendo en el puerto🔥http://localhost:${port}`); //levantarmiento servidor
  });