import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const toDoList = [];
const toDoWork = [];

app.post("/addtask", (req, res) => {
  if (req.body["list-item"] !== "") {
    toDoList.push(req.body["list-item"]);
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const cDay = dayNames[new Date().getDay()];
  const monthNames = [
    "January",
    "February",  
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const cMonth = monthNames[new Date().getMonth()];
  res.render("index.ejs", {
    today: cDay,
    month: cMonth,
    toDoList: toDoList,
  });
});

app.post("/addWork", (req, res) => {
  if (req.body["list-item-work"] !== "") {
    toDoWork.push(req.body["list-item-work"]);
  }
  res.redirect("/work");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {
    toDoWork: toDoWork,
  });
});
//listen the port
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
