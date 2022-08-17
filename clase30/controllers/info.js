require("yargs/yargs");
const numCpus = require("os").cpus().length;

const info = {
  "Argumentos de entrada": process.argv.slice(2),
  "Nombre de la plataforma (sistema operativo)": process.platform,
  "Versión de node.js": process.version,
  "Memoria total reservada (rss)": process.memoryUsage().rss,
  "Path de ejecución": process.execPath,
  "Process id": process.pid,
  "Carpeta del proyecto": process.cwd(),
  "Número de procesadores": numCpus,
};

const getInfo = (req, res) => {
  res.status(200).json(info);
};

module.exports = { getInfo };
