import { Model, DataTypes } from 'sequelize';

export default class Comando extends Model {
  static init(sequelize) {
    return super.init(
      {
        comandos: DataTypes.JSONB,
        logrado: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'Comando',
      }
    );
  }

  esTocayoDe(otroComando) {
    return otroComando.comandos === this.comandos;
  }
}
