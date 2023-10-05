import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../fireBase";

class PollData {
  constructor() {
    this.data = new Map();
    this.db = getDatabase(app);
  }
  getPolls() {
    return [...this.data.values()];
  }
  addPoll(title, description) {
    console.log(title);
    console.log(description);
    if (this.data.has(title)) {
      throw "exists!!";
    }

    const pollRef = ref(this.db, "polls"); // Changed "PollRef" to "pollRef"
    const newPollRef = push(pollRef); // Changed "PollRef" to "pollRef"
    const newPollKey = newPollRef.key;
    const newPollData = {
      title,
      description,
    };
    set(newPollRef, newPollData);
    this.data.set(newPollKey, newPollData);

    // Now, you can store the new Poll in your local data as well
  }

  deletePoll(item) {
    const pollRef = ref(this.db, "polls"); // Changed "PollRef" to "pollRef"
    // You need to implement the logic to delete a poll item here
  }
}

export default new PollData();
