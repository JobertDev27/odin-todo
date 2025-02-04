import {reloadStorage, storeStorage} from './storage.js';
import createDom from './dom.js';
import "./style.css";

// Handles the form hiding and showing
const formHandler = () => {
    console.log(localStorage.getItem("myItems"))

    const formContainer = document.getElementById("add-menu");
    const addTodo = document.getElementById("add-task-button");
    const clearBtn = document.getElementById("clear-task-button");
    const form = document.querySelector("form");
    
    let tasks = [];
    console.log(reloadStorage());

    //  INITIALIZED DOM ELEMENTS
    const initDom = () => {
        tasks.forEach(task => {
            createDom(task);
        });
    }

    // HIDE THE FORM BY CLICKING OUTSIDE
    formContainer.addEventListener("click", (e) => {
        if (e.target === formContainer){
            hideForm();
        }
    });

    // CLEAR LOCAL STORAGE
    clearBtn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    })

    // SHOWS FORM BY REMOVINNG HIDDEN CLASS
    addTodo.addEventListener("click", () => formContainer.classList.remove("hidden"));

    // HIDES THE FORM, SEPERATED IN A FUNCTION FOR REUSE
    function hideForm () {
        formContainer.classList.add("hidden");
    }

    // HANDLES FORM SUBMISSION
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskData = new FormData(form); 
        const data = Object.fromEntries(taskData);

        tasks.push(data);
        createDom(tasks.at(-1));
        storeStorage(tasks);
        
        hideForm();
        form.reset();
    })

    if (reloadStorage() !== null){
        tasks = reloadStorage();
        initDom();
    }
   
}

formHandler();