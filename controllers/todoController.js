const Todo = require('../models/Todos')

module.exports.create = async(req,res) => {
    
    let todo = new Todo(req.body)
    
        await todo.save((err, todo) => {
            if(err) {
                res.send(err)
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.json({
                message: 'todo created !', todo
            })
            //res.json(todo)
        })
        
    }

module.exports.getAllTodos = async (req, res) => {


    await Todo.find({}, (err, todos) => {   
        if(err){
            res.send(err)
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(todos)

    }).sort({ _id: -1 })

}


module.exports.getOneById = async(req,res) => {
    const id = req.params.id
    await Todo.findOne({_id: id}, function(err, todo){
        
        
        if(err) return console.log(err);
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(todo)
    });
}
                       

module.exports.updateTodo = async(req, res) => {
    const updated = {
        count: req.body.count
    }

    try {
    const todo = await Todo.findOneAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
    )
        res.status(200).json(todo)
    } catch (e) {
        console.log(res, e)
    }
}


module.exports.deleteTodo = async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err, todo) => {
        if(err){
            res.send(err);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
        res.json({ message: 'Successfully deleted todo!'})
    })
}