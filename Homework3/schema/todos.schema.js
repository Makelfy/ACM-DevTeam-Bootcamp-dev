import { EntitySchema } from "typeorm";

export const TodosSchema = new EntitySchema({
  name: "Todos",
  tableName: "todos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    userId: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "Users",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
      onDelete: "CASCADE",
    },
  },
});
