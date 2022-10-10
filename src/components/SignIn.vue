<template>
<SignUp />

  <body>
    <div id="app" data-v-app>
      <div class="min-h-min">
        <div class="relative pt-16 pb-0 md:py-32 bg-white md:min-h-screen">
          <div class="container px-4 mx-auto mb-16 md:mt-10">
            <div
              class="w-full md:w-3/5 lg:w-1/2 animate_animate animate_fadeIn"
            >
              <div class="max-w-sm mx-auto">
                <div class="mb-6 text-center">
                  <a
                    aria-current="page"
                    href="/auth#"
                    class="router-link-active router-link-exact-active inline-block mb-6"
                    ><img
                      class="h-16"
                      src="https://i.pinimg.com/originals/1b/37/a3/1b37a31607ae30bf0fd3cf73f6009447.png"
                      alt=""
                  /></a>
                </div>
                <h3 class="appTitle text-center font-bold">
                  Log In to Task List App!
                </h3>
                <p class="appSubtitle text-center text-gray-500">
                  Start Organizing your tasks todays!
                </p>
                <p v-if="errorMsg" class="">
                  {{ errorMsg }}
                </p>

                <PersonalRouter
                  class="invisible"
                  :route="route"
                  :buttonText="buttonText"
                />
                <form @submit.prevent="signIn">
                  <div class="mb-6">
                    <label class="inputFieldLabel" for="">Email</label>
                    <input
                      class="inputField"
                      type="email"
                      placeholder="example@gmail.com"
                      v-model="email"
                      id="email"
                    />
                  </div>

                  <div
                    class="relative flex w-full flex-wrap items-stretch mb-3"
                  >
                    <label class="inputFieldLabel" for="password"
                      >Password</label
                    >
                    <input
                      class="inputField"
                      :type="passwordFieldType"
                      onpaste="return false"
                      placeholder="************"
                      v-model="password"
                      id="password"
                    />
                    <span
                      class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    >
                      <EyeIcon
                        v-if="hidePassword"
                        @click.prevent="hidePassword = !hidePassword"
                      />
                      <EyeSlashIcon
                        v-if="!hidePassword"
                        @click.prevent="hidePassword = !hidePassword"
                      />
                    </span>
                  </div>
                  <div
                    class="flex flex-col text-center items-center container px-auto mx-auto"
                  >
                    <button
                      class="inline-block mt-3 py-3 px-40 text-sm leading-5 text-white bg-violet-400 focus:ring-violet-300 focus:ring-opacity-50 rounded-md"
                      type="submit"
                    >
                      Sign In
                    </button>

                    <br />
                    <p class="text-center">
                      <span class="font-meium font-bold"
                        >Don’t have an account?
                      </span>
                      <a
                        href="/auth/sign-up"
                        class="inline-block font-medium text-green-800 hover:text-green-900 hover:underline"
                        >Sign Up</a
                      >
                    </p>
                    <PersonalRouter
                      class="invisible"
                      :route="route"
                      :buttonText="buttonText"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img class="md:absolute md:top-0 md:right-0 mx-auto my-28 md:h-full md:w-2/5 lg:w-1/2 md:object-cover" src="../views/task-list-to-do-list-time-management-work-vector-37982599.jpeg" alt="" />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import SingUp from '../components/SignUp.vue'


// Route Variables
const route = "/auth/sign-up";
const buttonText = "Test the Sign Up Route";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.inputField {
  @apply px-3 py-3 relative appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50;
}
.inputFieldLabel {
  @apply block mb-2 text-gray-800 font-medium;
}
</style>
