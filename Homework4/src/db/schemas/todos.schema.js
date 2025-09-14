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
      type: "text",
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
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
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
