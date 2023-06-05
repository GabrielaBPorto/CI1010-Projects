const curriculumGrid = document.getElementById('curriculum-grid');
const popup = document.getElementById('popup');
const studentRAInput = document.getElementById('student-ra');

let curriculumData = [];
let studentData = [];

function fetchCurriculumData(year) {
}

function fetchStudentData() {
}

function renderCurriculumGrid() {
}

function handleCellLeftClick(event) {
}

function handleCellRightClick(event) {
}

function handleStudentRAInputChange(event) {
}


curriculumGrid.addEventListener('click', handleCellLeftClick);
curriculumGrid.addEventListener('contextmenu', handleCellRightClick);
studentRAInput.addEventListener('input', handleStudentRAInputChange);


function init() {
  // fetchCurriculumData(1998); // Change the
}

function convertXmlToJson() {
  const fileInput = document.getElementById('xmlFileInput');
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = function(event) {
    console.log(' do i enter here ?')
    const xmlString = event.target.result;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const rootElement = xmlDoc.documentElement;

    console.log('all', xmlDoc.all)

    const firstElement = rootElement.getElementsByName('ALUNOS_CURSO');
    console.log(firstElement.nodeName, firstElement);

    // const elements = schema[0].getElementsByTagName('*')
    // console.log('schema', schema)
    
    // for (const element of elements) {
    //   const name = element.nodeName;
    //   console.log('name?', name)
    //   console.log('element', element)
    //   const value = element.textContent.trim().replace(/\s+/g, ' ');
    //   console.log('value', value)
    //   if(value && value.length > 0){
    //     xmlObject[name] = value;
    //   }
    // }
  };

  reader.readAsText(file);
}

function xmlToJson(xml) {
  const data = {};

  const rootElement = xml.documentElement;
  console.log(rootElement.getElementsByTagName(rootElement.nodeName), 'hi')
  data[rootElement.nodeName] = {
    children: [
      ...xml.getElementsByTagName(rootElement.nodeName)
    ]
  };


  console.log('data', data[rootElement.nodeName], 'datasda', data[rootElement.nodeName].children.length)
  for(const child of data[rootElement.nodeName].children){
    console.log('my child is', child)
  }
  // const alunoCurso = rootElement.getElementsByTagName('ALUNO_CURSO');
  // console.log('aluno Curso', alunoCurso)

  // // Process each ALUNO element
  // const alunoElements = rootElement.getElementsByTagName('ALUNO');
  // console.log('alunoElements', alunoElements)
  // for (let i = 0; i < alunoElements.length; i++) {
  //   const alunoElement = alunoElements[i];
  //   const alunoData = {};

  //   // Process each child element of ALUNO
  //   const childElements = alunoElement.children;
  //   for (let j = 0; j < childElements.length; j++) {
  //     const childElement = childElements[j];
  //     alunoData[childElement.nodeName] = childElement.textContent;
  //   }

  //   // Add the alunoData to the data object
  //   data[rootElement.nodeName]['ALUNO'] = data[rootElement.nodeName]['ALUNO'] || [];
  //   data[rootElement.nodeName]['ALUNO'].push(alunoData);
  // }

  return data;
}
