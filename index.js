const {
    spawn
} = require('child_process');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {
    v4: uuid
} = require('uuid'); // for providing diff id's to diff data set

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

let todoinit = [{
    name: "Do Homework",
    id: uuid()
}];
let todoyet = [{
    name: "Meet Friends",
    id: uuid()
}];
let todostart = [{
    name: "Coding",
    id: uuid()
}];

let todocomp = [{
    name: "Play Guitar",
    id: uuid()
}];


app.listen(3000, () => {
    console.log('On port 3000');
})

app.get('/todo', (req, res) => {
    res.render('notes/index.ejs', {
        todoinit,
        todoyet,
        todostart,
        todocomp
    });
})


app.post('/todo/add', (req, res) => {
    const {
        newtodo
    } = req.body;
    todoinit.push({
        name: newtodo,
        id: uuid()
    })
    res.redirect('/todo');
})



app.delete('/todo/:whichtodo/delete/:id', (req, res) => {
    const {
        whichtodo,
        id
    } = req.params;
    if(whichtodo === "todoinit")
    {
    todoinit = todoinit.filter(todo => todo.id != id);
    res.redirect('/todo');
    }
    else if(whichtodo === "todoyet")
    {
    todoyet = todoyet.filter(todo => todo.id != id);
    res.redirect('/todo');
    }
    else if(whichtodo === "todostart")
    {
    todostart = todostart.filter(todo => todo.id != id);
    res.redirect('/todo');
    }
    else if(whichtodo === "todocomp")
    {
    todocomp = todocomp.filter(todo => todo.id != id);
    res.redirect('/todo');
    }
});


app.post('/todo/todoinit/:id', async (req, res) => {
    const {
        todo
    } = req.body;
    console.log(todo);
    if (todo == "complete") {
        const ctodo = todoinit.find(todo => todo.id == req.params.id);
        todocomp.push(ctodo);
        todoinit.splice(todoinit.indexOf(ctodo), 1);
        await res.redirect('/todo');
    } else if (todo == "yet") {
        const ctodo = todoinit.find(todo => todo.id == req.params.id);
        todoyet.push(ctodo);
        todoinit.splice(todoinit.indexOf(ctodo), 1);
        // console.log(todoyet);
        // console.log(todoinit);
        await res.redirect('/todo');
    } else if (todo == "partial") {
        const ctodo = todoinit.find(todo => todo.id == req.params.id);
        todostart.push(ctodo);
        todoinit.splice(todoinit.indexOf(ctodo), 1);
        // console.log(todostart);
        // console.log(todoinit);
        await res.redirect('/todo');
    }
});



app.post('/todo/todoyet/:id', async (req, res) => {
    const {
        todo
    } = req.body;
    console.log(todo);
    if (todo == "complete") {
        const ctodo = todoyet.find(todo => todo.id == req.params.id);
        todocomp.push(ctodo);
        todoyet.splice(todoyet.indexOf(ctodo), 1);
        await res.redirect('/todo');
    } else if (todo == "partial") {
        const ctodo = todoyet.find(todo => todo.id == req.params.id);
        todostart.push(ctodo);
        todoyet.splice(todoyet.indexOf(ctodo), 1);

        await res.redirect('/todo');
    } else if (todo == "yet") {
        await res.redirect('/todo');
    }
})

app.post('/todo/todostart/:id', async (req, res) => {
    const {
        todo
    } = req.body;
    console.log(todo);
    if (todo == "complete") {
        const ctodo = todostart.find(todo => todo.id == req.params.id);
        todocomp.push(ctodo);
        todostart.splice(todostart.indexOf(ctodo), 1);
        // console.log(todocomp);
        // console.log(todostart);
        await res.redirect('/todo');
    } else if (todo == "yet") {
        const ctodo = todostart.find(todo => todo.id == req.params.id);
        todoyet.push(ctodo);
        todostart.splice(todostart.indexOf(ctodo), 1);
        // console.log(todoyet);
        // console.log(todostart);
        await res.redirect('/todo');
    } else if (todo == "partial") {
        const ctodo = todostart.find(todo => todo.id == req.params.id);
        // console.log(todostart);
        // console.log(todostart);
        await res.redirect('/todo');
    }
});







app.post('/todo/todocomp/:id', async (req, res) => {
    const {
        todo
    } = req.body;
    console.log(todo);
    if (todo == "complete") {
        await res.redirect('/todo');
    }
    // else if(todo=="partial"){
    //     const ctodo = todocomp.find(todo => todo.id == req.params.id);
    //     todostart.push(ctodo);
    //     todocomp.splice(todocomp.indexOf(ctodo),1);
    //     // console.log(todocomp);
    //     // console.log(todocomp);
    //     await res.redirect('/todo');
    // }

    // else if(todo=="yet"){
    //     const ctodo = todoyet.find(todo => todo.id == req.params.id);
    //     todoyet.push(ctodo);
    //     todocomp.splice(todocomp.indexOf(ctodo),1);
    //     // console.log(todostart);
    //     // console.log(todoyet);
    //     await res.redirect('/todo');
    // }
})