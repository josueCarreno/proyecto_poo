class Personaje {
  constructor(
    nombre = "Desconocido",
    vida = 100,
    ataque = 10,
    defensa = 10
  ) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = 0;
  }
  atacar() {
    return definirNumeroAleatorio(this.ataque);
  }
  defender() {
    return definirNumeroAleatorio(this.defensa);
  }
  saludar() {
    console.log(`Hola, mi nombre es ${this.nombre}, y soy un ${this.constructor.name}`);
  }
}

class Guerrero extends Personaje {
  constructor(
    nombre,
    vida,
    ataque,
    defensa
  ) { 
    super(nombre,vida,ataque,defensa);
  }
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
      nombre: "Normal",
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

let guerrero1 = new Guerrero("Link", 200, 15, 10);
let guerrero2 = new Guerrero("Zelda", 100, 10, 5);
let arquero = new Arquero("Robin Hood", 150, 10, 10);
let lancero1 = new Lancero("José Inocencio Chincá", 150, 10, 10);
let lancero2 = new Lancero("Ronaldo de Toledo", 150, 10, 10);

function definirOrdenRonda(jugadoresTotal = [guerrero1, guerrero2, arquero, lancero1, lancero2]){
  
  let velocidadTotal = [];
  
  for (let i = 0; i < jugadoresTotal.length; i++) {
    jugadoresTotal[i].velocidad = definirNumeroAleatorio(10);
    velocidadTotal.push(jugadoresTotal[i].velocidad);
  }
  
  
  let ordenRonda = [];

  while (jugadoresTotal.length > 0) {
    let max = Math.max(...velocidadTotal);
    let posicion = velocidadTotal.indexOf(max);
    ordenRonda.push(jugadoresTotal[posicion]);
    jugadoresTotal.splice(posicion, 1);
    velocidadTotal.splice(posicion, 1);
  }
  return ordenRonda;
}

function definirNumeroAleatorio(max, min = 0){
  let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
  return numeroAleatorio;
}

function obtenerBooleanoAleatoriamente() {
  return Math.random() >= 0.5;
}

function definirAtaque (jugadorAtacante, jugadorAtacado, ataque, defensa, arma = "sus manos") {
  
  let jugadorOfensivo = rondaOrdenada[jugadorAtacante].nombre;
  let jugadorDefensivo = rondaOrdenada[jugadorAtacado].nombre;
  
  if (definirNumeroAleatorio(10) != 3) {

    if ((ataque - defensa) < 0) {
      danio = 0;
    }
    else {
      danio = ataque - defensa;
    }

    rondaOrdenada[jugadorAtacado].vida = rondaOrdenada[jugadorAtacado].vida - danio;

    if (rondaOrdenada[jugadorAtacado].vida < 0) {
      rondaOrdenada[jugadorAtacado].vida = 0;
    }

    let jugadorDefensivoVida = rondaOrdenada[jugadorAtacado].vida;

    console.log(`${jugadorOfensivo} atacó usando ${arma} a ${jugadorDefensivo}. ${jugadorDefensivo} sufrió un daño de: ${danio}. Puntos de vida restantes: ${jugadorDefensivoVida}`);
    if (rondaOrdenada[jugadorAtacado].vida <= 0) {
        console.log(`¡${jugadorDefensivo} ha muerto!`);
        rondaOrdenada.splice(jugadorAtacado, 1);
    }
  }
  else {
    console.log(`${jugadorOfensivo} atacó usando ${arma} a ${jugadorDefensivo}. ${jugadorDefensivo} esquivó el ataque.`);
  }
}

let rondaOrdenada = definirOrdenRonda();

for (let i = 0; i < rondaOrdenada.length; i++) {
  rondaOrdenada[i].saludar();
}

let contador = 1;

while (rondaOrdenada.length != 1) {

  console.log(`\nRonda ${contador}`);

  for (let i = 0; i < rondaOrdenada.length; i++) {
    let jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1);

    while (rondaOrdenada[i] === jugadorAtacado) {
      jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1);
    }

    if (obtenerBooleanoAleatoriamente()) {
      let ataque = rondaOrdenada[i].atacar();
      let defensa = rondaOrdenada[jugadorAtacado].defender();
      definirAtaque(i, jugadorAtacado, ataque, defensa);
    }
    else {
      let armas;

      if (rondaOrdenada[i].nombre ===  arquero.nombre) {
        armas = rondaOrdenada[i].atacarConFlechas();
      }
      else {
        armas = rondaOrdenada[i].atacarConArmas();
      }
      let arma = armas.nombre;
      let ataque = armas.danio
      let defensa = rondaOrdenada[jugadorAtacado].defender();
      definirAtaque(i, jugadorAtacado, ataque, defensa, arma);
    }  
  }
  contador++;
  rondaOrdenada = definirOrdenRonda(rondaOrdenada);
}

console.log(`\n ¡El ganador es ${rondaOrdenada[0].nombre}!`);













