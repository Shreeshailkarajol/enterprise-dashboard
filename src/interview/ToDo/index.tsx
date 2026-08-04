import { useState } from "react"


const ToDo = () => {
    interface Item {
        id: number;
        text: string;
    }

    const arr: Item[] = [
        { id: 1, text: "One" },
        { id: 2, text: "Two" },
        { id: 3, text: "Three" },
        { id: 4, text: "Four" },
    ];


    const[state, setState] = useState<Item[]>(arr)
    const[input, setInput] = useState<string>('')
    const[edit, setEdit] = useState<boolean>(false)
    const[editId, setEditId] = useState<number | null>(null)
    const[editText, setEditText] = useState<string>('')

    const handleAddNewItem = () => {
        setState((prev => {
            console.log('state prev', prev)
            const alredyExists = prev.some((item) => item.text.toLocaleLowerCase() === input.toLocaleLowerCase())
            if(alredyExists){
                alert('Item is present')
                return prev
            }{
                return [...prev,  { id: Date.now(), text: input} ]
            }


        }))
    }


    const removeItem = (id: number) => {
        const removedItems = state.filter(item => item.id !== id)
        setState(removedItems)
    }

    const editItem = (id: number) => {
        console.log(id);
        setEditId(id)
        setEdit(prev => !prev)
    }

    const update = (id) =>{
        setEdit(prev => !prev)
        setState(prev => {
            
        })
    }

    console.log('state', state);
    
    return(
        <div>
            <h1>ToDo App</h1>
            <div>{state.map((item: Item) =>(
                <div key={item.id}>
                    {item.text}
                    <button onClick={() => removeItem(item.id)}>Remove</button>
  
                    {
                        item.id === editId && edit ? 
                        (
                            <>
                                <input value={item.text} onChange={(e) => setEditText(e.target.value)}/>
                                <button onClick={() => update(item.id)}>update</button>
                            </> 
                        )

                            : 
                        (
                            <button onClick={() => editItem(item.id)}>Edit</button>
                        )
                    }

                </div>
            ))}</div>
            <input placeholder="Add New Item" value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={handleAddNewItem}>Add New Item</button>
        </div>
    )
}


export default ToDo