<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-4 rounded dark:bg-gray-800"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <!-- logo -->
      <a
        href="/"
        class="router-link-active router-link-exact-active flex items-center"
      >
        <img :src="logo" class="mr-3 h-6 sm:h-9" alt="" />
      </a>

      <div class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li class="flex items-center justify-center">
            <p
              href="#"
              class="text-center block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:p-0 dark:text-white"
            >
              Welcome Back &#128521;
              <span class="font-bold">{{ userNameClean }}</span>
            </p>
          </li>
          <li class="flex justify-center pt-4 md:pt-0">
            <button
              class="ml-8 inline-block py-2 px-4 text-sm leading-5 text-white bg-violet-400 focus:ring-violet-300 focus:ring-opacity-50 rounded-md"
              @click="signOut()"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Menu Hamburguesa  -->
  <!-- <nav
    role="navigation"
    class="w-nav-menu-mobile animate__animated animate__fadeInDown"
  >
    <a href="#" class="myStuff">Home</a>
    <a href="#" class="myStuff">My Tasks</a>
  </nav>

  <a href="#" class="button primary-button w-button">Contact Us</a>

  <div class="hamburger">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div> -->
</template>

<script setup>
import { ref, computed } from "vue";
// constant that calls user email from the useUSerStore
import { useUserStore } from "../stores/user.js";
//constant to save a variable that will hold the use router method
import { useRouter } from "vue-router";
// user de la tienda
let userName = useUserStore().user.email;
let userNameClean = userName.split("@")[0];

const redirect = useRouter();

// constant that saves the user email and cleans out the @client from the user
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = async () => {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
};

// logo de la pagina
const logo =
  "https://i.pinimg.com/originals/1b/37/a3/1b37a31607ae30bf0fd3cf73f6009447.png";


// Menu Hamburguesa

// const hamburger = document.querySelector('.hamburger');
// const menu = document.querySelector(".w-nav-menu-mobile");
// const navLink = document.querySelectorAll(".myStuff");



// hamburger.addEventListener("click", () => { 
//     hamburger.classList.toggle("active");
//     menu.classList.toggle("active");
//     navLink.classList.toggle("active");
   
// })
</script>

<style scoped></style>
