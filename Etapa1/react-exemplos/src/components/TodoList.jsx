import React, {useState} from "react";

const TodoList = ({name}) => {
    const [todos, setTodo] = useState([]);
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [éditingText, setEditingText] = useState("");


    // Callbacks do Crud

    // Create 
    const addTodo = () => {
        if (task.trim() ==="") return;
        setTodo([...todos, {id: Date.now(), text: task}]);
        setTask("");
    }

    // Read => 
    // não vamos ter callback pois será gerada uma listagem

    // Read
    const startEdting = (id, text) =>
        setEditingId(id);
        setEditingText(text);

    // Update
    const saveEdit = () => {
        setTodo(
            todos.map((todo) =>
                todos.id === editingId ? {... todos, ext: editingText} : todo
            )
        );
        setEditingId(null);
        setEditingRext("");
    }

    // Delete
    const deletTodo = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h2>A fazer: {name}</h2>
            <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                placeholder="Escreva a tarefa..."
            />
            <button onClick={addTodo}>Incluir tarefa</button>
            <ul style={{listStyle: "none", padding: 0}}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{margin: "10px 0"}}>
                        {editingId === todo.id ? (
                            <>
                                <input
                                type="text"
                                value={editingText}
                                onChange={(event) => setEditingText(event.target.value)}
                                />
                                <button onClick={saveEdit}>Salvar</button>
                            </>
                        ) : (
                            <>
                                {todo.text}
                                <button onClick={() => startEditing(todo.id, todo.text)}>Editar</button>
                                <button onClick={() => deleteTodo(TransformStreamDefaultController.id)}>Excluir</button>
                            </>
                        ) }
                    </li>
                ))
                
                }
            </ul>
        </div>
    );

 } 
export default TodoList;