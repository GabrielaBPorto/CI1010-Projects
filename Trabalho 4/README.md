##To-Do List

### Setting Up
- [x] Create a new project folder.
- [x] Set up the basic file structure (index.html, script.js, style.css).
- [x] Create a folder named "input" inside the project folder.
- [x] Place the "alunos.xml.bz2" file inside the "input" folder.
- [x] Place the "alunos.xsd" file inside the "input" folder.
- [x] Verify that the basic setup is working by opening the index.html file in a web browser.

### Data Handling
- [x] Extract the "alunos.xml" file from the "alunos.xml.bz2" compressed file.
- [x] Move the extracted "alunos.xml" file to the "input" folder.
- [ ] Create a curriculum data file (curriculum1998.json or curriculum2011.json) with the necessary course information.
- [ ] Place the curriculum data file in the project folder.

### Fetching Data
- [ ] Implement the `fetchCurriculumData()` function to load curriculum data from the curriculum data file.
- [ ] Test the `fetchCurriculumData()` function to ensure it retrieves the data correctly.
- [ ] Implement the `fetchStudentData()` function to parse student data from the "alunos.xml" file.
- [ ] Test the `fetchStudentData()` function to ensure it retrieves and stores the data properly.

### Rendering Curriculum Grid
- [ ] Implement the `renderCurriculumGrid()` function to generate the grid layout dynamically.
- [ ] Style the grid cells based on the last enrollment status using appropriate CSS classes.
- [ ] Test the `renderCurriculumGrid()` function to ensure it displays the grid with the correct styling.

### Handling User Actions
- [ ] Implement the `handleCellLeftClick()` function to display a popup window with course details.
- [ ] Test the `handleCellLeftClick()` function to verify that the popup window shows the correct information.
- [ ] Implement the `handleCellRightClick()` function to show the complete history for a course.
- [ ] Test the `handleCellRightClick()` function to ensure it displays the complete history properly.

### Search Functionality
- [ ] Implement the `handleStudentRAInputChange()` function to filter and display student data based on RA.
- [ ] Test the `handleStudentRAInputChange()` function to verify that it filters the data correctly.
- [ ] Style the search container and input field as desired.

### Testing and Debugging
- [x] Create a bash script (test.sh) to aid in testing and debugging.
- [ ] Write test cases in the test.sh script to test various aspects of the application.
- [ ] Run the test.sh script to verify the functionality of different functions and components.
- [ ] Debug any issues that arise during testing.
- [ ] Verify that the application functions correctly and provides the expected behavior.

### Documentation and Finalization
- [x] Add comments to the code for better understanding.
- [x] Refactor and optimize the code if necessary.
- [ ] Update documentation or README file with project details, features, and usage instructions.
