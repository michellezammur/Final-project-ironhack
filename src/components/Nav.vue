<template>
  <nav
    class="flex justify-between bg-white border-gray-200 px-2 sm:px-8 py-4 rounded"
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
    <div class="md:hidden" @click="changeClickBurger">
      <button
        class="text-gray-500 w-10 h-10 relative focus:outline-none bg-white"
        
      >
        <div
          class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ 'rotate-45': clickBurger, ' -translate-y-1.5': !clickBurger }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ 'opacity-0': clickBurger }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ '-rotate-45': clickBurger, ' translate-y-1.5': !clickBurger }"
          ></span>
        </div>
      </button>
    </div>
  </nav>

  <!-- Menu Hamburguesa Contenido -->

  <nav 
  class="bg-blue-200"
  :class="
    clickBurger ? 'transition-all ease-out duration-500 h-16' : 'transition-all ease-in duration-500 h-0'
    ">
    <ul
    class="duration-300 ease-out"
    :class="clickBurger ? 'transition-all ease-out duration-500' : 'hidden' "
    >
      <li>Home</li>
      <li>Log Out</li>
    </ul>
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

const clickBurger = ref(false);

function changeClickBurger() {
  clickBurger.value = !clickBurger.value;
  console.log('hola');
}
</script>

<style scoped></style>
