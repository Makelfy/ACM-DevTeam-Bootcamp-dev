import { EntitySchema } from "typeorm";

export const UsersSchema = new EntitySchema({
  name: "Users",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    todos: {
      type: "one-to-many",
      target: "Todos",
      inverseSide: "user",
      cascade: true,
    },
  },
});
