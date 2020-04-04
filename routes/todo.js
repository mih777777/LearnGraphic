const express = require('express')
const controller = require('../controllers/todoController')
const router = express.Router()

router.get('/', controller.getAllTodos)
router.get('/:id', controller.getOneById)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.deleteTodo)
router.put('/update/:id', controller.updateTodo)
router.post('/search', controller.searchOrCreateFirm)


module.exports = router