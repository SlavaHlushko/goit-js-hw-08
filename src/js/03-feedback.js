'use strict';
import throttle from "lodash.throttle"    

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';
import { save, load, remove } from "./storage";


initPage();
const onFormInput = event => {
     const { name, value } = event.target; 
     let saveData = load(LOCALE_STORAGE_KEY); 
     saveData = saveData ? saveData : {};

     saveData[name] = value;
     save(LOCALE_STORAGE_KEY, saveData);


   
}
const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);
function initPage() {
    const saveData = load(LOCALE_STORAGE_KEY);
    if (!saveData) {
        return
    }
    Object.entries(saveData).forEach(([name, value]) => {
                formRef.elements[name].value = value;
       
            });

            }
const handleSumit = event => {
    event.preventDefault()

    const { elements: { email, message } } = event.currentTarget;
    event.currentTarget.reset();
    remove(LOCALE_STORAGE_KEY);
    console.log({ email: email.value, message: message.value });
}
formRef.addEventListener('submit', handleSumit);