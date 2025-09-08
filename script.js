const selection = document.getElementById("selection");
const projectsList = document.getElementById("projects-list");
let projectsObj;

async function fetchSelection() {

    selection.innerHTML = ``;
    
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        projectsObj = data;

        Object.keys(data).forEach(element =>{
            selection.innerHTML += `<li id="${element.toLowerCase()}" onclick="loadProjects('${element}')">${element}</li>`;
        });

        selection.innerHTML += `<li id="all-projects" onclick="loadAllProjects()">All Projects</li>`;

        loadProjects("JavaScript");

    } catch (error) {
        selection.innerHTML = `<li>Error Parsing Projects</li>`;
    }

}

fetchSelection();

const loadProjects = (project) => {

    projectsList.innerHTML = "";

    Object.keys(projectsObj).forEach(element => {
        document.getElementById(`${element.toLowerCase()}`).setAttribute("class", "unselected")
    });

    if (Object.keys(projectsObj[project]).length<=0) {
            projectsList.innerHTML = 
            `<li class="nothing-li">
                <p class="nothing"></p>
            </li>
            <li class="nothing-li">
                <p class="nothing"></p>
            </li>
            <li class="nothing-li">
                <p class="nothing"> Nothing :(</p>
            </li>
            <li class="nothing-li">
                <p class="nothing"></p>
            </li>
            <li class="nothing-li">
                <p class="nothing"></p>
            </li>`;
    }

    Object.keys(projectsObj[project]).forEach(element => {
            projectsList.innerHTML += 
            `<li onclick="openProject('${element}', 'projects/${project.toLowerCase()}/${element.toLowerCase().replace(/ /g, "-")}/index.html', '${project.toLowerCase()}')">
                <img loading="lazy" src="images/projects/${project.toLowerCase()}/${projectsObj[project][element]["image"]}" alt="${projectsObj[project][element]["alt"]}" />
                <p class="project-title">${element}</p>
                <p class="project-desc">${projectsObj[project][element]["description"]}</p>
            </li>`;
    });

    document.getElementById(`${project.toLowerCase()}`).setAttribute("class", "selected");
    document.getElementById("all-projects").setAttribute("class", "unselected");
};

const loadAllProjects = () => {

    projectsList.innerHTML = "";

    Object.keys(projectsObj).forEach(element => {
        document.getElementById(`${element.toLowerCase()}`).setAttribute("class", "unselected");
        
        Object.keys(projectsObj[element]).forEach(project => {
            projectsList.innerHTML += 
            `<li onclick="openProject('${project}', 'projects/${element.toLowerCase()}/${project.toLowerCase().replace(/ /g, "-")}/index.html', '${element.toLowerCase()}')">
                <img loading="lazy" src="images/projects/${element.toLowerCase()}/${projectsObj[element][project]["image"]}" alt="${projectsObj[element][project]["alt"]}" />
                <p class="project-title" id="${project.toLowerCase().replace(/ /g, "-")}">${project}</p>
                <p class="project-desc">${projectsObj[element][project]["description"]}</p>
            </li>`;
        
        });
    });

    document.getElementById("all-projects").setAttribute("class", "selected");
};

//START OF MODAL CODES
const modal = document.getElementById("project-modal");
const closeBtn = document.getElementById("close-modal");
const frame = document.getElementById("project-frame");
const codeBlockHTML = document.getElementById("project-html");
const codeBlockCSS = document.getElementById("project-css");
const codeBlockJS = document.getElementById("project-js");
const title = document.getElementById("project-title");


const openProject = (projectName, projectUrl, projectType) => {
    modal.style.display = "block";
    title.textContent = projectName;
    frame.src = projectUrl;
    codeBlockHTML.style.display = "none"
    codeBlockCSS.style.display = "none"
    codeBlockJS.style.display = "none"

    async function loadFileContent(url, targetElementId) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                document.getElementById(targetElementId).textContent = "no code here";
                return;
            }

            const textContent = await response.text();

            if ((url.endsWith(".css") || url.endsWith(".js")) &&
                (textContent.startsWith("<!DOCTYPE html>") || textContent.startsWith("<html"))) {
                document.getElementById(targetElementId).textContent = "no code here";
                return;
            }

            document.getElementById(targetElementId).textContent = textContent;
            document.getElementById(targetElementId).style.display = "block";
        } catch (error) {
            document.getElementById(targetElementId).style.display = "none";
        }
    }

    loadFileContent(`projects/${projectType}/${projectName.toLowerCase().replace(/ /g, "-")}/index.html`, "project-html");
    loadFileContent(`projects/${projectType}/${projectName.toLowerCase().replace(/ /g, "-")}/styles.css`, "project-css");
    loadFileContent(`projects/${projectType}/${projectName.toLowerCase().replace(/ /g, "-")}/script.js`, "project-js");

}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }

document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const codeElement = document.getElementById(targetId);

    if (codeElement && codeElement.textContent.trim() !== "") {
      navigator.clipboard.writeText(codeElement.textContent)
        .then(() => {
          button.textContent = "Copied!";
          setTimeout(() => button.textContent = "Copy", 1500);
        })
        .catch(err => console.error("Copy failed", err));
    }
  });
});

//END OF MODAL CODES