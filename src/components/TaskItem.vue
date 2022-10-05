<template>
  <div class="taskItem">
    <li>
      <b>{{ taskData.title }} </b>
      <br />
      <i> {{ taskData.description }}</i>
      <br />
      <button class="bg-red-400" @click="childDelete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
      <br />
      <button class="bg-blue-200" @click="toggleForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <br />
      <button class="bg-green-500" @click="childCheck">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      </button>

      <div class="container px-auto mx-auto" v-if="showForm">
        <div class="flex flex-col px-24">
          <input
            class="inline-block py-2 px-4 text-sm leading-6 focus:ring-opacity-50 rounded-md"
            v-model="taskTitle"
            type="text"
            id="newTaskTitle"
            placeholder="Add a Task Title"
          /><br /><br />

          <input
            class="inline-block py-2 px-4 text-sm leading-6 focus:ring-opacity-50 rounded-md"
            v-model="taskDesc"
            type="text"
            id="newTaskDesc"
            placeholder="Add a Task Description"
          /><br /><br />

          <button
            class="inline-block py-2 px-4 text-sm leading-5 text-white bg-violet-400 focus:ring-violet-300 focus:ring-opacity-50 rounded-md"
            @click.prevent="childUpdate"
          >
            Save
          </button>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup>
import { ref } from "vue";

let taskTitle = ref(props.taskData.title);
let taskDesc = ref(props.taskData.description);
let showForm = ref(false);

const emit = defineEmits(["childDelete", "childUpdate"]);

const props = defineProps(["taskData"]);

// Funcion para pasarle nuestro evento particular al padre para poder habilitar el delete de una tarea en particular. Esto se hace mediante un emit

function childDelete() {
  emit("childDelete", props.taskData);
}

function childUpdate() {
  emit("childUpdate", taskTitle.value, taskDesc.value, props.taskData.id);
}

// Funcion para aparecer y desaparecer el formulario

function toggleForm() {
  // Con else if:
  // if (showForm.value === true) showForm.value = false;
  // else showForm.value = true;
  // Ternarios:
  // showForm.value === true ? showForm.value = false : showForm.value = true;
  // Forma corta
  showForm.value = !showForm.value;
}

function completeTask() {
  emit("childCheck", props.taskData);
}
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
