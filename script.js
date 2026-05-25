import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;

  items.push({
    id: items.length + 1,
    title: item,
  });

  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = parseInt(req.body.updatedItemId);
  const newTitle = req.body.updatedItemTitle;

  const item = items.find((item) => item.id === id);

  if (item) {
    item.title = newTitle;
  }

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = parseInt(req.body.deleteItemId);

  items = items.filter((item) => item.id !== id);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});