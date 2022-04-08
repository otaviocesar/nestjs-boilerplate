echo '################ MONGO ENTRYPOINT START ################';
 
mongo -- "$MONGO_INITDB_DATABASE" <<EOF


print(' Initializing development database....');

db = db.getSiblingDB('$MONGO_INITDB_DATABASE');
db.createUser(
  {
    user: '$MONGO_INITDB_ROOT_USERNAME',
    pwd: '$MONGO_INITDB_ROOT_PASSWORD',
    roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }],
  },
);
db.createCollection('users');

print('Development database created.');

EOF

echo '################ MONGO ENTRYPOINT END ################';