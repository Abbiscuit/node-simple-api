const express = require("express");
// port
const PORT = process.env.PORT || 3000;
const Joi = require("@hapi/joi");

const app = express();
app.use(express.json());

// Placeholders
const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
});

app.post("/api/courses", (req, res) => {
  // Validation with Joi
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  // update course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
  };

  return Joi.validate(course, schema);
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// app.post()
// app.put()
// app.delete()
