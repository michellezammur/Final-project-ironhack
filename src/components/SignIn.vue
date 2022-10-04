<template>
  <div>Sign In</div>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <p>Time to build up the Final Project!</p>
  <p class="wu-text">Wu Tang Forever</p>
  <p v-if="errorMsg" class="">
    {{ errorMsg }}
  </p>
  <form @submit.prevent="signIn">
    <div class="">
      <label class="" for="">Email</label>
      <input
        class=""
        type="email"
        placeholder="dave@wuTangfinancial.com"
        v-model="email"
        id="email"
      />
    </div>
    <!-- <div class="mb-4">
      <label class="" for="">Password</label>

      <div class="">
        <input
          class=""
          :type="passwordFieldType"
          onpaste="return false"
          placeholder="************"
          v-model="password"
          id="password"
        />
        <span class="h-6 w-6">
          <EyeIcon
            :class="[passwordFieldIcon]"
            @click.prevent="hidePassword = !hidePassword"
          />
        </span>
      </div>
    </div> -->

    <div class="relative flex w-full flex-wrap items-stretch mb-3">
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
        <div></div>
      </span>
    </div>

    <button class="" type="submit">Sign In</button>
    <p class="">
      <span class="">Don’t have an account? </span>

      <PersonalRouter :route="route" :buttonText="buttonText" />
    </p>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";

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
