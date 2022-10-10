<template>
  <PersonalRouter class="invisible" :route="route" :buttonText="buttonText" />
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
                  Register to Task List App!
                </h3>
                <p class="appSubtitle text-center text-gray-500">
                  Start Organizing your tasks todays!
                </p>
                <p v-if="errorMsg" class="">
                  {{ errorMsg }}
                </p>
               
  <form @submit.prevent="signUp">
    <div class="mb-6">
      <label class="inputFieldLabel" for="">Email</label>
      <input
        class="inputField"
        type="email"
        placeholder="dave@wuTangfinancial.com"
        v-model="email"
        id="email"
      />
    </div>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
      <label class="inputFieldLabel" for="">Password</label>
      <input
        class="inputField"
        type="password"
        placeholder="************"
        v-model="password"
        id="password"
      />
    </div>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
      <label class="inputFieldLabel" for="">Confirm Password</label>
      <input
        class="inputField"
        type="password"
        placeholder="************"
        v-model="confirmPassword"
        id="confirmPassword"
      />
    </div>
    <button class="inline-block mt-3 py-3 px-40 text-sm leading-5 text-white bg-violet-400 focus:ring-violet-300 focus:ring-opacity-50 rounded-md" type="submit">Sign Up</button>
    <p class="text-center">
      <span class="font-meium font-bold">Have an account? </span>
      <router-link
                        to="/auth/login"
                        class="inline-block font-medium text-green-800 hover:text-green-900 hover:underline"
                        >Sign In</router-link
                      >
    </p>
  </form>
  </div>
  </div>
  </div>
  <img
            class="md:absolute md:top-0 md:right-0 mx-auto my-28 md:h-full md:w-2/5 lg:w-1/2 md:object-cover"
            src="../views/task-list-to-do-list-time-management-work-vector-37982599.jpeg"
            alt=""
          />
  </div>
  </div>
  </div>
</body>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
