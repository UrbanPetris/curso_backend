const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(objeto) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (contenido.length === 0) {
        objeto.id = 1;
        contenido = [];
        contenido.push(objeto);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(contenido, null, 2)
        );
        return objeto.id;
      } else {
        objeto.id = JSON.parse(contenido).length + 1;
        contenido = JSON.parse(contenido);
        contenido.push(objeto);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(contenido, null, 2)
        );
        return objeto.id;
      }
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  }

  async getById(id) {
    try {
      console.log("-----Devolviendo el producto con id específico-----");
      let contenido = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      const objetoEncontrado = contenido.find((prod) => prod.id === id);
      if (objetoEncontrado) return objetoEncontrado;
      else return null;
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  }

  async getAll() {
    try {
      console.log("-----Devolviendo todos los productos-----");
      return JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"));
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  }
  async deleteById(id) {
    try {
      let contenido = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      let nuevoContenido = contenido.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(nuevoContenido, null, 2)
      );
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  }
  async deleteAll() {
    await fs.promises.truncate(this.archivo, 0);
  }
}

const prueba = new Contenedor("Productos.txt");

producto1 = {
  title: "Pera",
  price: "200",
  thumbnail:
    "https://img.freepik.com/foto-gratis/fruta-pera-fresca-humeda_144627-17211.jpg?w=2000",
};

producto2 = {
  title: "Manzana",
  price: "300",
  thumbnail:
    "https://www.eluniversal.com.mx/sites/default/files/2016/09/07/manzana.jpg",
};

//Ejecución de prueba
(async () => {
  console.log(await prueba.save(producto1));
  console.log(await prueba.save(producto2));
  console.log(await prueba.getById(1));
  console.log(await prueba.getAll());
  await prueba.deleteById(1);
  await prueba.deleteAll();
})();
