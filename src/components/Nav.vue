<template>

  <nav
    class=" flex justify-between bg-white border-gray-200 px-2 sm:px-4 py-4 rounded dark:bg-gray-800"
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
    <!-- Menu hamburguesa -->
    <div>
    <button class="hamburger navbar-burger self-center lg:hidden">
      <svg width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect class="text-gray-50" width="32" height="32" rx="6" fill="currentColor"></rect>
      <path class="text-gray-500" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="currentColor">

    </path>
    </svg>
    </button>
  </div>
  </nav>
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

// hamburger.addEventListener("click", () => { 
//     hamburger.classList.toggle("active");
   
// })
</script>

<style scoped></style>
