const tables = require('./tables');

exports.handler = (event, context, callback) => {
  // Write
  tables.w00t.put({id: 1, someData: 8});
  // Read
  tables.w00t.get({id: 1});
  // Update
  tables.w00t.update({id: 1}, {someData: 9});
  // Delete
  tables.w00t.delete({id: 1});
  callback('🌈🌟');
}
