import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
//import { useState } from "react";

function validation(title, description, date) {
  return (title.trim() === "" || description.trim() === "" || date.trim() === "");
}

export default function NewProject({ onCancel, onAddProject }) {
  // const [dataForm,setDataForm] = useState({
  //     title: '',
  //     description: '',
  //     date: ''
  // });

  // function manageDataForm(e) {
  //     const { target } = e;
  //     const {name,value} = target;
  //         setDataForm( prevData => {
  //             return {
  //                 ...prevData,
  //                 [name]: value
  //             }
  //         })
  //     }

  const modalRef = useRef()
  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSaveProject() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    //validation...
    if(validation(enteredTitle,enteredDescription,enteredDate)) {
        modalRef.current.open();
        return;
    }

    const newProject = {
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    };

    onAddProject(newProject);
  }

  return (
    <>
        <Modal ref={modalRef} buttonCapation="Okay">
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
            <p className="text-stone-600 mb-4">Oopss...looks like you forgot to enter a value</p>
            <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
        </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSaveProject}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          {/* <Input name="title" value={dataForm.title} onChange={manageDataForm} label="title" textarea={false} />
                <Input name="description" value={dataForm.description} onChange={manageDataForm} label="description" textarea={true} />
                <Input name="date" value={dataForm.date} onChange={manageDataForm} label="Due date" textarea={false} /> */}
          <Input ref={title} label="title" type="text" />
          <Input ref={description} label="description" textarea={true} />
          <Input ref={date} label="Due date" type="date" />
        </div>
      </div>
    </>
  );
}
