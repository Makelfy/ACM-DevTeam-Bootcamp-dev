import { EntitySchema } from "typeorm";

export const OpaqueTokenSchema = new EntitySchema({
  name: "OpaqueToken",
  tableName: "opaque_tokens",
  columns: {
    token: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "varchar",
      nullable: false,
    },
    action: {
      type: "text",
      nullable: false,
    },
    expiresAt: {
      type: "varchar",
      nullable: false,
    },
    used: {
      type: "boolean",
      default: false,
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
