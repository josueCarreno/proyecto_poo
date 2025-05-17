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
    this.velocidad = Math.floor(Math.random() * 10);
  }
  atacar() {
    return definirNumeroAleatorio(this.ataque);
  }
  defender() {
    return definirNumeroAleatorio(this.defensa);
  }
  saludar() {
    console.log(`Hola, soy ${this.nombre}, y mi velocidad es ${this.velocidad}`);
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

function definirOrdenRonda(){
  let jugadoresTotal = [guerrero1, guerrero2, arquero, lancero1, lancero2];
  let velocidadTotal = [guerrero1.velocidad, guerrero2.velocidad, arquero.velocidad, lancero1.velocidad, lancero2.velocidad];
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

let rondaOrdenada = definirOrdenRonda();
let jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1, 1);

function definirAtaque (ataque, defensa, arma = "sus manos") {
  if ((ataque - defensa) < 0) {
    danio = 0;
  }
  else {
    danio = ataque - defensa;
  }

  rondaOrdenada[jugadorAtacado].vida = rondaOrdenada[jugadorAtacado].vida - danio;
  console.log(rondaOrdenada[jugadorAtacado]);
  console.log(`${rondaOrdenada[0].nombre} atacó usando ${arma} a ${rondaOrdenada[jugadorAtacado].nombre}. El daño fue de ${danio}`);
}

if (obtenerBooleanoAleatoriamente()) {
  let ataque = rondaOrdenada[0].atacar();
  let defensa = rondaOrdenada[jugadorAtacado].defender();
  definirAtaque(ataque, defensa);
}
else {
  let rondaOrdenada = definirOrdenRonda();
  let jugadorAtacado = definirNumeroAleatorio(rondaOrdenada.length - 1, 1);
  let armas;

  if (rondaOrdenada[0].nombre ===  arquero.nombre) {
    armas = rondaOrdenada[0].atacarConFlechas();
  }
  else {
    armas = rondaOrdenada[0].atacarConArmas();
  }
  let arma = armas.nombre;
  let ataque = armas.danio
  let defensa = rondaOrdenada[jugadorAtacado].defender();
  definirAtaque(ataque, defensa, arma);
}









