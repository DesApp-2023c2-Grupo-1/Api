import Comando from '../models/comandos';

export const getAll = async (req, res) => {
  const comando = await Comando.findAll({});
  res.json({ data: comando.map((comando) => comando.toJSON()) });
};

export const getId = async (req, res) => {
  const comando = await Comando.findByPk(req.params.id);
  if (comando) {
    res.json({ data: comando.toJSON() });
  } else {
    res
      .status(404)
      .json({ message: `No se encontró un comando con id ${req.params.id}` });
  }
};

export const push = async (req, res) => {
  try {
    const comando = await Comando.create({ comandos: req.body.comandos });
    const io = req.app.get('io');
    io.emit('comandos', { comando });
    res.status(201).send({ id: comando.id });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res
        .status(400)
        .send('Bad request: existe otro comando con el mismo valor');
    } else {
      console.log(`Error al intentar insertar en la base de datos: ${error}`);
      res.sendStatus(500);
    }
  }
};
