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
    console.log("atacando");
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
      daño: 50,
    },
    {
      nombre: "Cuchillo",
      daño: 30,
    },
    {
      nombre: "Mesa",
      daño: 10,
    }
  ];
  atacarConArmas() {
    let max = this.armas.length - 1;
    let min = 0;
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(this.armas[numeroAleatorio].daño);
  }
}

class Arquero extends Personaje {
  flechas = [
    {
      nombre: "Fuego",
      daño: 40,
    },
    {
      nombre: "Veneno",
      daño: 50,
    },
    {
      nombre: "Electricidad",
      daño: 30,
    },
    {
      nombre: "Normal",
      daño: 20,
    }
  ];
  atacarConFlechas() {
    let max = this.flechas.length - 1;
    let min = 0;
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(this.flechas[numeroAleatorio].daño);
  }
}

class Lancero extends Personaje {
  armas = [
    {
      nombre: "Lanza",
      daño: 40,
    },
    {
      nombre: "Hacha",
      daño: 50,
    },
    {
      nombre: "Daga",
      daño: 30,
    },
    {
      nombre: "Martillo",
      daño: 20,
    }
  ];
  atacarConLanza() {
    let max = this.armas.length - 1;
    let min = 0;
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(this.armas[numeroAleatorio].daño);
  }
}

let guerrero1 = new Guerrero("Link", 200, 15, 10);
let guerrero2 = new Guerrero("Zelda", 100, 10, 5);
let arquero = new Arquero("Robin Hood", 150, 10, 10);
let lancero1 = new Lancero("José Inocencio Chincá", 150, 10, 10);
let lancero2 = new Lancero("Ronaldo de Toledo", 150, 10, 10);

let jugadoresTotal = [guerrero1, guerrero2, arquero, lancero1, lancero2];
let velocidadTotal = [guerrero1.velocidad, guerrero2.velocidad, arquero.velocidad, lancero1.velocidad, lancero2.velocidad];
let max = 0;
let ordenRonda = [];
let posicion = 0;

while (jugadoresTotal.length > 1) {
  let max = Math.max(...velocidadTotal);
  let posicion = velocidadTotal.indexOf(max);
  ordenRonda.push(jugadoresTotal[posicion]);
  jugadoresTotal.splice(posicion, 1);
  velocidadTotal.splice(posicion, 1);
}

console.log(max);
console.log(ordenRonda);


