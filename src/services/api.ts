import { Task } from "../entities/Task";

const LOCAL_STORAGE_KEY = "tasks";

export const tasksService = {
  async fetchTasks(): Promise<Task[]> {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  },

  async createTask(attributes: Omit<Task, "id">): Promise<Task> {
    const tasks = await this.fetchTasks();
    const newTask: Task = { ...attributes, id: new Date().toISOString() };
    tasks.push(newTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    return newTask;
  },

  async updateTask(
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ): Promise<Task> {
    const tasks = await this.fetchTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error("Tarefa não encontrada");
    }

    const updatedTask = { ...tasks[taskIndex], ...attributes };
    tasks[taskIndex] = updatedTask;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    return updatedTask;
  },

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.fetchTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTasks));
  },
};
