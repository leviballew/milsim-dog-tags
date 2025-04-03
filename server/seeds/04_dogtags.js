/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('dogtags').del();
  await knex('dogtags').insert([
    {id: 1, collector_id: 1, event_id: 1, giver_id: 2},
    {id: 2, collector_id: 1, event_id: 1, giver_id: 3}
  ]);

await knex.raw(`SELECT setval('dogtags_id_seq', (SELECT MAX(id) FROM dogtags))`);
};