const Todo = require('../models/Todos')
const Firm = require('../models/Firm')

module.exports.searchOrCreateFirm = async(req,res) => {

    const candidate = await Firm.findOne({
        location: req.body.location,
        firm: req.body.firm
    })

    if(candidate){
        // Эта фирма уже есть в базе
        res.status(409).json({
            message: 'Эта фирма уже есть в базе'
        })
    }else{
        // Добавить в базу
        let firm = new Firm(req.body)
        
        await firm.save((err, firm) => {
            if(err) {
                res.send(err)
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.json({
                message: 'firm added !', firm
            })
            //res.json(todo)
        })
    }
}

// module.exports.searchOrCreateFirm1 = async(req,res) => {
//     const location = req.params.location
//     const firm = req.params.firm
//     await Firm.find({_id: id}, function(err, todo){
        
        
//         if(err) return console.log(err);
        
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//         res.json(todo)
//     });
// }


// module.exports.register = async function(req, res) {
//     // email password
//     const candidate = await User.findOne({email: req.body.email})
  
//     if (candidate) {
//       // Пользователь существует, нужно отправить ошибку
//       res.status(409).json({
//         message: 'Такой email уже занят. Попробуйте другой.'
//       })
//     } else {
//       // Нужно создать пользователя
//       const salt = bcrypt.genSaltSync(10)
//       const password = req.body.password
//       const user = new User({
//         email: req.body.email,
//         password: bcrypt.hashSync(password, salt)
//       })
  
//       try {
//         await user.save()
//         res.status(201).json(user)
//       } catch(e) {
//         errorHandler(res, e)
//       }
  
//     }
// }


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