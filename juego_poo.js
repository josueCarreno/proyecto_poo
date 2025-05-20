// Clase Padre Personaje
class Personaje {
  constructor(
    nombre = "Desconocido",
    vida = 100,
    ataque = 10,
    defensa = 10,
    velocidad = 10
  ) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }
  items = [
    {
      nombre: "Pocion de vida",
      vida: 50,
      cantidad: definirNumeroAleatorio(3),
    },
    {
      nombre: "Pocion de ataque",
      ataque: 10,
      cantidad: definirNumeroAleatorio(3),
    },
    {
      nombre: "Pocion de defensa",
      defensa: 10,
      cantidad: definirNumeroAleatorio(3),
    }
  ];
  atacar() {
    return definirNumeroAleatorio(this.ataque);
  }
  defender() {
    return definirNumeroAleatorio(this.defensa);
  }
  saludar() {
    console.log(`Hola, mi nombre es ${this.nombre}, y soy un ${this.constructor.name}`);
  }
  velocidadRandom() {
    return definirNumeroAleatorio(this.velocidad);
  }
}

class Guerrero extends Personaje {
  armas = [
    {
      nombre: "Espada",
      danio: 50,
    },
    {
      nombre: "Cuchillo",
      danio: 30,
    },
    {
      nombre: "Mesa",
      danio: 10,
    }
  ];
  atacarConArmas() {
    let numeroAleatorio = definirNumeroAleatorio(this.armas.length - 1);
    return this.armas[numeroAleatorio];
  }
}

class Arquero extends Personaje {
  flechas = [
    {
      nombre: "Fuego",
      danio: 40,
    },
    {
      nombre: "Veneno",
      danio: 50,
    },
    {
      nombre: "Electricidad",
      danio: 30,
    },
    {
      nombre: "Madera",
      danio: 20,
    }
  ];
  atacarConFlechas() {
    let numeroAleatorio = definirNumeroAleatorio(this.flechas.length - 1);
    return this.flechas[numeroAleatorio];
  }
}

class Lancero extends Personaje {
  armas = [
    {
      nombre: "Lanza",
      danio: 40,
    },
    {
      nombre: "Hacha",
      danio: 50,
    },
    {
      nombre: "Daga",
      danio: 30,
    },
    {
      nombre: "Martillo",
      danio: 20,
    }
  ];
  atacarConArmas() {
    let numeroAleatorio = definirNumeroAleatorio(this.armas.length - 1);
    return this.armas[numeroAleatorio];
  }
}

// Declaracion de objetos, personajes
let guerrero1 = new Guerrero("Link", 200, 15, 10, 10);
let guerrero2 = new Guerrero("Zelda", 100, 10, 5, 5);
let arquero = new Arquero("Robin Hood", 150, 10, 10, 10);
let lancero1 = new Lancero("José Inocencio Chincá", 150, 10, 10, 20);
let lancero2 = new Lancero("Ronaldo de Toledo", 150, 10, 10, 30);

// Bienvenida
console.log("¡Bienvenido a la batalla de guerreros!\n");

// Declaracion de rondas
let rondaOrdenada = definirOrdenRonda();

// Saludo de cada uno de los jugadores
for (let i = 0; i < rondaOrdenada.length; i++) {
  rondaOrdenada[i].saludar();
}

// Contador del numero de rondas
let contador = 1;

// Ciclo de batalla. Mientras haya mas de un jugador hacer:
while (rondaOrdenada.length != 1) {

  // Imprimir numero de rondas
  console.log(`\nRonda ${contador}`);

  // Ciclo que recorre a todos los jugadores para atacar
  for (let jugadorAtacante = 0; jugadorAtacante < rondaOrdenada.length; jugadorAtacante++) {
    let jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1);

    // Evitar que un jugador se ataque a si mismo
    while (jugadorAtacante === jugadorAtacado) {
      jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1);
    }

    // Definir si el jugador ataca con armas o con sus manos
    if (obtenerBooleanoAleatoriamente()) {
      let ataque = rondaOrdenada[jugadorAtacante].atacar();
      let defensa = rondaOrdenada[jugadorAtacado].defender();
      definirAtaque(jugadorAtacante, jugadorAtacado, ataque, defensa);
    }
    else {
      let armas;

      // Evaluación del jugador atacante para saber si ataca con armas o con flechas
      if (rondaOrdenada[jugadorAtacante].nombre ===  arquero.nombre) {
        armas = rondaOrdenada[jugadorAtacante].atacarConFlechas();
      }
      else {
        armas = rondaOrdenada[jugadorAtacante].atacarConArmas();
      }
      let arma = armas.nombre;
      let ataque = armas.danio
      let defensa = rondaOrdenada[jugadorAtacado].defender();
      definirAtaque(jugadorAtacante, jugadorAtacado, ataque, defensa, arma);
    }  
  }
  contador++;

  // Definir el orden de la ronda segun la velocidad de manera aleatoria
  rondaOrdenada = definirOrdenRonda(rondaOrdenada);
}

console.log(`\n ¡El ganador es ${rondaOrdenada[0].nombre}!`);

/**
 * @function definirOrdenRonda
 * @description Función que recorre el arreglo de jugadores y los ordena segun la velocidad de mayor a menor
 * @returns {[]} Arreglo con el orden de la ronda
 * @params {number} Arreglo de jugadores vivos
 */
function definirOrdenRonda(jugadoresTotal = [guerrero1, guerrero2, arquero, lancero1, lancero2]){
  
  let velocidadTotal = [];
  
  // Definir la velocidad de cada jugador
  for (let i = 0; i < jugadoresTotal.length; i++) {
    jugadoresTotal[i].velocidad = jugadoresTotal[i].velocidadRandom();
    velocidadTotal.push(jugadoresTotal[i].velocidad);
  }
  
  let ordenRonda = [];

  // Definir el orden de la ronda
  while (jugadoresTotal.length > 0) {
    let max = Math.max(...velocidadTotal);
    let posicion = velocidadTotal.indexOf(max);
    ordenRonda.push(jugadoresTotal[posicion]);
    jugadoresTotal.splice(posicion, 1);
    velocidadTotal.splice(posicion, 1);
  }
  return ordenRonda;
}

/**
 * @function definirNumeroAleatorio
 * @description Función que genera un numero aleatorio
 * @returns {number} Número aleatorio
 * @params {number} numeroMaximo, {number} numeroMinimo
 */
function definirNumeroAleatorio(max, min = 0){
  let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
  return numeroAleatorio;
}

/**
 * @function obtenerBooleanoAleatoriamente
 * @description Función que genera dos posibles opciones true o false
 * @returns {boolean} 
 */
function obtenerBooleanoAleatoriamente() {
  return Math.random() >= 0.5;
}

/**
 * @function definirAtaque
 * @description Función que genera el ataque de cada jugador, junto los posibles items y esquives
 * @returns {void} 
 * @params {number, string o string} Posicion del atacante, del atacado, número de ataque y defensa. Y armas string u objeto
 */
function definirAtaque (jugadorAtacante, jugadorAtacado, ataque, defensa, arma = "sus manos") {
  
  // Nombres del jugador atacante y el defensivo para imprimir en la consola
  let jugadorOfensivoNombre = rondaOrdenada[jugadorAtacante].nombre;
  let jugadorDefensivoNombre = rondaOrdenada[jugadorAtacado].nombre;
  
  pocionVida(jugadorAtacante, jugadorOfensivoNombre);
  
  // Probabilidad de que el jugador defensivo esquive el ataque
  if (definirNumeroAleatorio(10) === 3) {
    // Imprimir en la consola el ataque esquivado
    console.log(`${jugadorOfensivoNombre} atacó usando ${arma} a ${jugadorDefensivoNombre}. ${jugadorDefensivoNombre} esquivó el ataque.`);
    return
  }

  pocionDefensa(jugadorAtacado, jugadorDefensivoNombre , ataque, defensa);
  

  // Condicional para evitar que el daño sea negativo
  if ((ataque - defensa) < 0) {
    danio = 0;
  }
  else {
    danio = ataque - defensa;
  }

  // Restar el daño al jugador atacado
  rondaOrdenada[jugadorAtacado].vida = rondaOrdenada[jugadorAtacado].vida - danio;

  // Condicional para evitar que la vida sea negativa
  if (rondaOrdenada[jugadorAtacado].vida < 0) {
    rondaOrdenada[jugadorAtacado].vida = 0;
  }

  // Vida del jugador atacado para imprimir en la consola
  let jugadorDefensivoVida = rondaOrdenada[jugadorAtacado].vida;

  // Imprimir en la consola el ataque
  if (rondaOrdenada[jugadorAtacante].constructor.name === "Arquero" && arma !== "sus manos") {
    console.log(`${jugadorOfensivoNombre} atacó usando Flechas de ${arma} a ${jugadorDefensivoNombre}. ${jugadorDefensivoNombre} sufrió un daño de: ${danio}. Puntos de vida restantes: ${jugadorDefensivoVida}`);
  }
  else {
    console.log(`${jugadorOfensivoNombre} atacó usando ${arma} a ${jugadorDefensivoNombre}. ${jugadorDefensivoNombre} sufrió un daño de: ${danio}. Puntos de vida restantes: ${jugadorDefensivoVida}`);
  }
  
  // Condicional para eliminar al jugador atacado si su vida llega a 0
  if (rondaOrdenada[jugadorAtacado].vida <= 0) {
    console.log(`¡${jugadorDefensivoNombre} ha muerto!`);
    rondaOrdenada.splice(jugadorAtacado, 1);
  }
}

function pocionVida(jugadorAtacante, jugadorOfensivoNombre) {
  if (rondaOrdenada[jugadorAtacante].vida <= 50) {
    for (posicion in rondaOrdenada[jugadorAtacante].items) {
      if (rondaOrdenada[jugadorAtacante].items[posicion].nombre == "Pocion de vida" && rondaOrdenada[jugadorAtacante].items[posicion].cantidad > 0) {
        rondaOrdenada[jugadorAtacante].vida = rondaOrdenada[jugadorAtacante].vida + rondaOrdenada[jugadorAtacante].items[posicion].vida;
        rondaOrdenada[jugadorAtacante].items[posicion].cantidad--;
        console.log("\n" + jugadorOfensivoNombre + " usa una poción de vida de " + rondaOrdenada[jugadorAtacante].items[posicion].vida + " puntos. Su vida ahora es de " + rondaOrdenada[jugadorAtacante].vida + " puntos.");
      }
    }
  }
}

function pocionDefensa(jugadorAtacado, jugadorDefensivoNombre, ataque, defensa) {
  if (rondaOrdenada[jugadorAtacado].vida <= 50 &&  ataque > defensa) {
    for (posicion in rondaOrdenada[jugadorAtacado].items) {
      if (rondaOrdenada[jugadorAtacado].items[posicion].nombre == "Pocion de defensa" && rondaOrdenada[jugadorAtacado].items[posicion].cantidad > 0) {
        defensa = defensa * 2;
        rondaOrdenada[jugadorAtacado].items[posicion].cantidad--;
        console.log("\n" + jugadorDefensivoNombre + " usa una poción de defensa de multiplicador por X2 de defensa. Su defensa ahora es de " + defensa + " puntos. ");
      }
    }
  }
}


