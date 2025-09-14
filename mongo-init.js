db = db.getSiblingDB("ai-support");

db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    {
      role: "readWrite",
      db: "ai-support",
    },
  ],
});
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "name"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
        },
        password: {
          bsonType: "string",
          minLength: 6,
        },
        name: {
          bsonType: "string",
          minLength: 1,
        },
      },
    },
  },
});

db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "messages"],
      properties: {
        userId: {
          bsonType: "objectId",
        },
        title: {
          bsonType: "string",
        },
        messages: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["role", "content"],
            properties: {
              role: {
                enum: ["user", "assistant"],
              },
              content: {
                bsonType: "string",
              },
              timestamp: {
                bsonType: "date",
              },
            },
          },
        },
      },
    },
  },
});

db.users.createIndex({ email: 1 }, { unique: true });
db.chats.createIndex({ userId: 1, lastMessageAt: -1 });

print("Database initialized successfully!");
