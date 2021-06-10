const {findById} =require('./scheme-model')

const checkSchemeId = (req, res, next) => {
  findById(req.params.scheme_id)
  .then((data) =>{
    if(!data){
      res.status(404).json({message:`scheme with scheme_id ${req.params.scheme_id} not found`})
    }
    else{
      next()
    }
  })
  .catch(next)
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name||typeof req.body.scheme_name!== "string"){
    res.status(400).json({message:"invalid scheme_name"})
  }
  else{
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if(!req.body.instructions||req.body.instructions===""||typeof req.body.instructions !=="string"||!req.body.step_number||typeof req.body.step_number !=="number"||req.body.step_number<1){
    res.status(400).json({message:"invalid step"})
  }
  else{
  next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
