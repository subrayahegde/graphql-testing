var  todos = require('./todos');

const resolvers = {
    Query: {
        todos(root, args, ctx, info) {
            return todos
        }
    },
    Mutation: {
        addTodo(root, args, ctx, info) {
            var pos = todos.length;
            if (args) {
                todos.push({
                    id: pos+1,
                    title: args.title,
                    body: args.body
                })
            } else {
                throw new Error()
            }
            return todos[todos.length - 1];
        },
        
        updateTodo(root, args, ctx, info) {
            const index = todos.findIndex(e => e.id === +args.id)
            let todo = todos[index];
            todo.title = args.title
            todo.body = args.body
            return todos[index]
        },
        
        deleteTodo(root, args, ctx, info) {
            const index = todos.findIndex(e => e.id === +args.id)
            let todo = todos[index];
            const filter = todos.filter(e => e.id !== +args.id)
            todos = filter
            return todo
        }
    }
 }

module.exports = { resolvers }
