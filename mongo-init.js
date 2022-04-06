db.createUser(
    {
        user: "dev-user",
        pwd: "Pa55word!",
        roles: [
            {
                role: "readWrite",
                db: "alliansce"
            }
        ]
    }
);

db = db.getSiblingDB('alliansce');

db.createCollection('user');

