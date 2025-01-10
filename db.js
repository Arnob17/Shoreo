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
  // await knex.schema
  // .createTable('posts', table => {
  //   table.increments('id');
  //   table.string('document');
  //   table.string('authorid');
  //   table.string('user_name');
  //   table.string('_type');
  //   table.string('Gtag');
  //   table.string('title')
  // })
  // await knex.schema
  // .createTable('olympiad', (table) => {
  //   table.increments('id');
  //   table.string('title');
  //   table.string('question_by');
  //   table.string('purpose');
  // })
  // await knex.schema
  // .createTable('olympiad_questions', (table) => {
  //   table.increments('id');
  //   table.string('q_title');
  //   table.string('options');
  //   table.string('q_answer');
  // })
  // await knex.schema
  //   .createTable('c_point', (table) => {
  //     table.string('user_id');
  //     table.integer('point');
  //   })
  // await knex.schema.createTable('answered_question', (table) => {
  //   table.string('userid');
  //   table.integer('quid');
  // })
  await knex.schema.createTable('personal_posts', (table) => {
    table.increments('id');
    table.string('document');
    table.string('authorid');
    table.string('user_name');
    table.string('_type');
    table.string('Gtag');
  })
}