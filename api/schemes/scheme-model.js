const db = require('../../data/db-config')

function find() {
  const rows = db("schemes as sc")
    .leftJoin("steps as st", 'sc.scheme_id', "st.scheme_id")
    .select("sc.*").count("st.step_id", { as: "number_of_steps" })
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id", "asc")
  return rows
}

async function findById(scheme_id) {
  const rows = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .where("sc.scheme_id", scheme_id)
    .select("sc.scheme_name", "st.*")
    .orderBy("st.step_number", "ASC")

  const transform = await !rows?null: {
    "scheme_id": Number(scheme_id),
    "scheme_name": rows[0]===undefined?null:rows[0].scheme_name.toString(),
    "steps":  rows[0]===undefined?null:rows[0].step_id === null ? [] : rows,
  }

  return transform.scheme_name===null?null: transform
}

async function findSteps(scheme_id) {
  const rows = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .where("sc.scheme_id", scheme_id)
    .select("st.step_id", "st.step_number", "st.instructions", "sc.scheme_name")
    .orderBy("st.step_number", "ASC")
  return rows[0].step_id === null ? [] : rows
}

async function add(scheme) { // EXERCISE D
  const row = await db("schemes as sc")
    .insert(scheme)
  const returnNewScheme = await findById(...row)
  return returnNewScheme
}

async function addStep(scheme_id, step) {
  const stepInserted={...step,scheme_id:scheme_id}
  const rows = await db("steps as st")
 .insert(stepInserted).where("st.scheme_id", scheme_id)
  const findbystep=async function(){
    rows
   const data = await db("steps as st")
   .where("st.scheme_id", scheme_id)
   .orderBy("st.step_number","asc")
   return data
  }
  const returndata = await findbystep()
  const returnAllSteps = await [...returndata]
  return returnAllSteps
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
