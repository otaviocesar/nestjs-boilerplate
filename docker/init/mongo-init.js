print(' Initializing development database... ');
db = db.getSiblingDB('aliansce');
db.createUser(
  {
    user: 'aliansce_dev',
    pwd: 'abc93qbsAc6U2YRh!',
    roles: [{ role: 'readWrite', db: 'aliansce' }],
  },
);
db.createCollection('users');

print('Development database created.');