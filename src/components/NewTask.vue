<template>

  <div class="pt-12 pb-24 bg-pink-50">
    <div class="flex flex-col items-center container px-auto mx-auto">
      <span
        class=" w-fit inline-block px-3 mb-4 text-xs leading-5 text-violet-500 bg-violet-100 font-medium rounded-full"
        >TASK</span
      >
      <h2
        class="text-center mb-4 text-4xl md:text-5xl leading-tight text-black font-bold tracking-tighter"
      >
        Add a new Task
      </h2>
      <p class="text-center text-lg md:text-xl text-gray-800 font-medium">
        Keep your life organized, prepare for a trip? Start here
      </p>
      <p class="text-center mb-10 text-lg text-gray-800 font-medium">
        {{date}}
      </p>
    </div>

    <div class="container px-auto mx-auto">
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
          @click.prevent="uploadTask"
        >
          Add
        </button>
      </div>
    </div>

    <div>
      <h3 v-if="errorBool">{{ emptyString }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task";
import TaskItem from "./TaskItem.vue";
import moment from "moment";
import 'moment/locale/es';



// constant to save a variable that define the custom event that will be emitted to the homeView

const emit = defineEmits(["childNewTask"]);

let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");

const date = moment().format('MMMM Do YYYY, h:mm:ss a'); 


function uploadTask() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required.";
    setTimeout(() => {
      errorBool.value = false;
    }, 1000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    
  }
}



// constant to save a variable that holds the value of the title input field of the new task


// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
