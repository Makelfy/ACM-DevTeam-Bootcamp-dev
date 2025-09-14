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
      unique: true,
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    todos: {
      type: "one-to-many",
      target: "Todos",
      inverseSide: "user",
      cascade: true,
    },
    opaqueTokens: {
      type: "one-to-many",
      target: "OpaqueToken",
      inverseSide: "user",
      cascade: true,
    },
  },
});
