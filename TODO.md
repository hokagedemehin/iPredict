# Todo Checklist to complete

- [x] Work on the button that will submit the predictions
- [x] work out how the input will be collected
- [x] work out how the predictions will be compared with the actual scores
- [x] work out how the data will be stored in the database
- [ ] trivia: 10 questions for 20 seconds and all must be correct
- [x] once the day is saturday and the first match starts, the prediction button becomes disabled
- [ ] once a user gets three out of four predictions, they get a point

## Trivia TODO

### questions

- [ ] Can a user repeat a question when he makes another attempt

#### checklists

- [x] Work on the trivia home page and create each Options
- [x] Check out viewonequestion component in admin on how to guard against direct url page visit  
- [x] Each question will have four options, name of radio group will ne the question ID, selected response is saved with the ID
- [x] user will select the number of questions they want to answer
- [x] the number of question pagonates the number of objects that is returned from firebase
- [x] find out how to return random documents from firestore
- [x] previous and next button will be displayed conditionally. if it is the first page only next button will show, if it is the last page only previous button will show
- [x] submit button will be down down the page
- [x] timer will be on the top right corner of the page and once it is complete, it sends the page to completed page, submit button is changed to disabled button
- [ ] if submit buuton is clicked, it routes to the complete page
- [ ] there will be a universal useState that will be changed by the coundown and submit button
- [ ] if complete useSTate is set to true by the submit button it should not be worked on by countdown timer
- [ ] create the four possible complete page that can be rendered based on how many questions are correct
- [ ] research how to count the no of documents that meets a certain criteria
- [ ] each question selected type will have a category name. Based on the category it is, will determine the kind of reward to be given to the user
- [ ] each parent collection of trivia attempts will have three fields. Noofquestions, correct-responses, wrong-responses
