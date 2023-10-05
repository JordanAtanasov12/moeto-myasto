import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../fireBase";

class ReportData {
  constructor() {
    this.data = new Map();
    this.db = getDatabase(app);
  }
  getReports() {
    return [...this.data.values()];
  }
  addReport(title, description, status, mediaUrl) {
    if (this.data.has(title)) {
      throw "exists!!";
    }

    const reportsRef = ref(this.db, "reports");
    const newReportRef = push(reportsRef); // Generate a new unique key
    const newReportKey = newReportRef.key;
    const newReportData = {
      title,
      description,
      status,
      mediaUrl
    };

    set(newReportRef, newReportData);

    // Now, you can store the new report in your local data as well
    this.data.set(newReportKey, newReportData);
  }

  deleteReport(item) {
    const reportsRef = ref(this.db, "reports");
    item = this.title;
    
  }
}

export default new ReportData();
