# Tech Blog (MVC)

## Description

For week 14 of the UW Coding Bootcamp my homework invited me to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers' posts as well. My application follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequilize as the ORM, and the express-session nmp package for authentication.

## Built With

(https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
(https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
(https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
(https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
(https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## Link to Site GitHub Repo

* [Deployed Site via Heroku](https://hw11-notetaker-uwbootcamp.herokuapp.com/notes)
* [Github Repo](https://github.com/spencee1315/hw_wk14)

* Demo of working app via [Screencastify](https://drive.google.com/file/d/16lcG863_pduJfFHh_dnkUF3iTYux-496/view)
<img src="public/assets/NoteTaker.png">

## Installation 

1. Clone or download repo via Github
2. Run npm install
3. Enter node server.js

## Usage 
### Screenshots

* Homepage - displays last workout

* Logging a new workout

* Weekly Summary

## Tests

Not applicable.

## Snippet
Route for finding all workouts

```
// GET - all workouts from db
// route /api/workouts
router.get("/api/workouts", (req, res) => {
   
    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.workoutTime;
            });
            workout.totalWorkoutTime = total;
        });

        res.json(dbWorkout);
    }) .catch(err => {
        console.error(err.message);
        res.status(500).send('Server Error');
    });
});
```

## License 
![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)

## Contributing 
Contributors should read the installation section. 

### Authors

* **Elliott Spencer**

### Contact Information

* [Link to Portfolio Site](https://spencee1315.github.io/hw_wk2/)

* [Link to Github](https://github.com/spencee1315)

* [Link to LinkedIn](https://www.linkedin.com/in/elliott-spencer-886a9818/)