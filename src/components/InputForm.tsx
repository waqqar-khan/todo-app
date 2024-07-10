import { ChangeEvent, FormEvent, useState, useRef } from "react";

interface Task {
  id: string;
  text: string;
}

const InputForm = () => {
  const [input, setInput] = useState<string>("");
  const [task, setTask] = useState<Task[]>([]);
  const [edit, setEdit] = useState<boolean>(true);
  const [editId, setEditId] = useState<null | string>(null);
  const ref = useRef<HTMLInputElement>(null);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && !edit) {
      setTask(
        task.map((el) => {
          if (el.id === editId) {
            return { ...el, text: input };
          }
          return el;
        })
      );
      setEdit(true);
      setInput("");
      setEditId(null);
    } else if (input.length > 0) {
      setTask([
        ...task,
        { id: (Date.now() + Math.random()).toString(36), text: input },
      ]);
      setInput("");
    }
  };

  const editHandler = (id: string) => {
    const editItem = task.filter((el) => el.id === id);
    editItem.map((el) => setInput(el.text));
    ref.current && ref.current.focus();
    setEdit(false);
    setEditId(id);
  };

  const deleteHandler = (id: string) => {
    setTask(task.filter((el) => el.id !== id));
  };

  return (
    <div className='InputForm'>
      <form onSubmit={submitHandler}>
        <input
          onChange={inputHandler}
          value={input}
          type='text'
          className='inputbox'
          ref={ref}
          autoFocus
        />
        <button className='submit-btn'>{edit ? `ADD` : `UPDATE`}</button>
      </form>
      {task.map((el) => (
        <>
          <li key={el.id} className='list-items'>
            <div className='list-text'>
              <input type='checkbox' />
              <div>{el.text}</div>
            </div>

            <div className='list-btn'>
              <button name={el.id} onClick={() => editHandler(el.id)}>
                EDIT
              </button>
              <button name={el.id} onClick={() => deleteHandler(el.id)}>
                X
              </button>
            </div>
          </li>
          <hr />
        </>
      ))}
    </div>
  );
};

export default InputForm;