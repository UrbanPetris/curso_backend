class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }

  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

const Pablo = new Usuario("Pablo", "Depetris Chauvin", ["Perro1", "Gato1"]);

console.log(Pablo.getFullName());
Pablo.addMascota("Perro2");
Pablo.addMascota("Gato1");
console.log(Pablo.mascotas);
console.log(Pablo.countMascotas());
Pablo.addBook("El Aleph", "Borges");
Pablo.addBook("Rayuela", "Cortázar");
console.log(Pablo.libros);
console.log(Pablo.getBookNames());
