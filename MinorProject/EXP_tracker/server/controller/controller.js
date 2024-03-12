const model = require('../models/model');

// POST: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  try {
    const newCategory = new model.Categories({
      type: "Investment",
      color: '#FCBE44', // dark
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: `Error while creating categories ${error}` });
  }
}
// get: http://localhost:8080/api/categories
async function get_Categories(req,res){
  let data=await model.Categories.find({})
  let filter=await data.map(v=>Object.assign({},{type:v.type,color:v.color}));
  return res.json(filter);
}
// POST: http://localhost:8080/api/transaction
async function create_Transaction(req,res){
  if(!req.body)return res.status(400).json("Post HTTP data not provided")
let{name,type,amount}=req.body;

const create = await new model.Transaction({
  name,
  type,
  amount,
  date:new Date()
});
try {
  const savedTransaction = await create.save();
  res.json(savedTransaction);
} catch (error) {
  console.error(error);
  res.status(400).json({ message: `Error while creating transaction: ${error.message}` });
}
}
// get: http://localhost:8080/api/transaction
async function get_Transaction(req,res){
let data = await model.Transaction.find({});
return res.json(data);
}
// delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    const result = await model.Transaction.deleteOne(req.body);

    if (result.deletedCount > 0) {
      return res.json("Record deleted");
    } else {
      return res.status(404).json("No matching record found to delete");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error while deleting transaction" });
  }
}

// get: http://localhost:8080/api/labels
const get_Labels = (req, res) => {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: 'type',
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data=result.map(v=>Object.assign({},{_id:v._id, name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}));
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Lookup collection error");
    });
}


module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels
};
