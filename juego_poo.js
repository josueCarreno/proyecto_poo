class Personaje {
  constructor(nombre) {
    this.nombre = nombre;
    this.vida = 100;
    this.ataque = 10;
    this.defensa = 10;
    this.velocidad = Math.floor(Math.random() * 10);
  }
  atacar() {
    console.log("atacando");
  }
  saludar() {
    console.log("hola");
  }
}

class Guerrero extends Personaje {
  armas = [
    {
      nombre: "Espada",
      ataque: 30,
    },
    {
      nombre: "Hacha",
      ataque: 20,
    },
    {
      nombre: "Cuchillo",
      ataque: 15,
    },
  ];
  atacarConArmas() {
    Guerrero.armas.forEach((arma) => {
      console.log(arma);
    });
  }
}

class Arquero extends Personaje {
  flechas = [
    {
      nombre: "Fuego",
      ataque: 40,
    },
    {
      nombre: "Veneno",
      ataque: 30,
    },
  ]
}

class Mago extends Personaje {
  armas = [
    {
      nombre: "Fuego",
      ataque: 50,
    },
    {
      nombre: "Rayo",
      ataque: 30,
    },
  ];
}

let spartacus = new Guerrero("spartacus");
spartacus.atacar();
spartacus.atacarConArmas();
