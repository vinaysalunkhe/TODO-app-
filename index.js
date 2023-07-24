const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/public/script.js");
});
app.get("/readTask", (req, res) => {
  fs.readFile("./tasks.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data == "") {
        res.send("noting to show");
      }
      try {
        data = JSON.parse(data);
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    }
  });
});
app.delete("/deleteTask", (req, res) => {
  task = req.body;
  fs.readFile("./tasks.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data == "") {
        res.send("noting to show");
      }
      try {
        data = JSON.parse(data);
        data = data.filter((task) => {
          return task.task != req.body.task;
        });
        fs.writeFile("./tasks.txt", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
  res.send("Task deleted successfully");
});

app.post("/writeTask", (req, res) => {
  task = req.body;
  fs.readFile("./tasks.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data == "") {
        data = "[]";
      }

      try {
        data = JSON.parse(data);
        data.push(task);
        fs.writeFile("./tasks.txt", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.send("Task added successfully");
  });
});

app.put("/updateTask", (req, res) => {
  task = req.body;
  fs.readFile("./tasks.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data == "") {
        res.send("noting to show");
      }
      try {
        data = JSON.parse(data);
        data.forEach((element) => {
          if (element.task == task.task) {
            element.isCompleted = task.isCompleted;
          }
        });
        fs.writeFile("./tasks.txt", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File written successfully\n");
          }
        });
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    }
  });
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
