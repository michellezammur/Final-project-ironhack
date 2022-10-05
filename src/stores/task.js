import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    // Funcion para borrar tareas de supabase
    // Nos conectamos a supabase mediante una llamada de espera con 'await' y apuntamos a 3 metodos nativos de supabase 'from, delete y match'

    async deleteTasks(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({id: id})
    },

    async updateTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title }, { description: description })
        .match({ id: id })
    },

    async completeTask(taskID) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: true })
        .eq("id", taskID);
    },
  },
});
