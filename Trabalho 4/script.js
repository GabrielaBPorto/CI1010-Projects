const curriculumGrid = document.getElementById('curriculum-grid');
const popup = document.getElementById('popup');
const studentRAInput = document.getElementById('student-ra');

let curriculumData = [];
let studentData = [];

function fetchCurriculumData(year) {
  // Your code for fetching curriculum data
}

function fetchStudentData() {
  // Your code for fetching student data
}

function renderCurriculumGrid() {
  // Your code for rendering the curriculum grid
}

function handleCellLeftClick(event) {
  // Your code for handling left-click on cells
}

function handleCellRightClick(event) {
  // Your code for handling right-click on cells
}

function handleStudentRAInputChange(event) {
  // Your code for handling student RA input change
}

curriculumGrid.addEventListener('click', handleCellLeftClick);
curriculumGrid.addEventListener('contextmenu', handleCellRightClick);
studentRAInput.addEventListener('input', handleStudentRAInputChange);

function init() {
  // Your initialization code
}

function criarGradeCurricular() {
  const tabela = document.getElementById("curriculum-grid");

  // Clear existing table rows if any
  tabela.innerHTML = "";

  curriculumData.forEach((student, index) => {
    if (index === 0) {
      const headers = Object.keys(student);
      const headerRow = document.createElement("tr");
      for (let header of headers) {
        const headerCell = document.createElement("th");
        headerCell.setAttribute("class", "cell-row text-nowrap header-cell");
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
      }
      tabela.appendChild(headerRow);
    }

    const dataRow = document.createElement("tr");
    const headers = Object.keys(student);
    for (let header of headers) {
      const dataCell = document.createElement("td");
      dataCell.setAttribute("class", "cell-row text-nowrap data-cell");
      dataCell.textContent = student[header];
      dataRow.appendChild(dataCell);
    }
    tabela.appendChild(dataRow);
  });
}

async function convertXmlToJson() {
  const loadingContainer = document.querySelector('.loading-container');

  loadingContainer.style.display = 'flex';

  const inputFile = document.getElementById('input-file');
  const fileInput = document.getElementById('xmlFileInput');
  const file = fileInput.files[0];

  const reader = new FileReader();

  const xmlToJsonPromise = new Promise((resolve, reject) => {
    reader.onload = function (event) {
      const xmlString = event.target.result;
      const result = xmlToJSON(xmlString);
      resolve(result);
    };

    reader.onerror = function (event) {
      reject(event.target.error);
    };
  });

  reader.readAsText(file);

  try {
    const jsonResult = await xmlToJsonPromise;
    console.log('xmlToJSON finished:', jsonResult);
    if(curriculumData.length > 0){
      inputFile.style.display = 'none';
      loadingContainer.style.display = 'none';
    }
    criarGradeCurricular();
  } catch (error) {
    console.error('Error converting XML to JSON:', error);
  }
}

async function xmlToJSON(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  return await xmlToJson(xmlDoc);
}

async function xmlToJson(xml) {
  let student = {};
  let agroupment = [];

  if (xml.nodeType === 9) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes[i];
      const nodeName = item.nodeName;
      if (nodeName === 'ALUNOS_CURSO') {
        return await xmlToJson(item);
      }
    }
  }

  if (xml.nodeType === 1) {
    const cleanedChildNodes = Array.from(xml.childNodes).filter((node, index) => {
      if (node.nodeName === '#text' && /^\s*$/.test(node.nodeValue)) {
        return false;
      }
      return true;
    });

    for (let i = 0; i < cleanedChildNodes.length; i++) {
      const item = cleanedChildNodes[i];
      const nodeName = item.nodeName;

      if (nodeName === 'ALUNO') {
        agroupment.push(await xmlToJson(item));
        continue;
      }

      if (item.data) {
        return item.data;
      }
      if (typeof student[nodeName] === 'undefined') {
        student[nodeName] = await xmlToJson(item);
      }
    }
  }

  curriculumData = agroupment;
  return student;
}

function writeDataToLocalFile(data) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data.json', jsonData);
}

function readDataFromLocalFile() {
  const jsonData = localStorage.getItem('data.json');
  if (jsonData) {
    const data = JSON.parse(jsonData);
    return data;
  } else {
    return null;
  }
}

// Call your init function or any other necessary code here
init();
