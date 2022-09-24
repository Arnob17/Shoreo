module.exports = async function (knex) {
  // await knex.schema
  // .createTable('users', table => {
  //   table.increments('id');
  //   table.string('user_name');
  //   table.string('role');
  //   table.string('password');
  //   table.string('img');
  //   table.string('is_verified');
  //   table.string('userid');
  // })
  // await knex.schema
  // .createTable('questions', table => {
  //   table.increments('id');
  //   table.string('title');
  //   table.string('type');
  //   table.string('authorid');
  //   table.string('upvote');
  //   table.string('downvote');
  //   table.string('answer');
  // })
  await knex.schema
  .createTable('answers', table => {
    table.increments('id');
    table.string('answer');
    table.string('upvote');
    table.string('question_id');
    table.string('authorid');
    table.string('downvote');
  })
}