console.log("Welcome to WorkOverflow 2.3")

const { ipcRenderer, app, dialog } = require('electron')
const fs = require('fs');
const path = require("path");
const ipc = ipcRenderer

document.querySelector("#good-notes").addEventListener("click", function () {
    document.querySelector(".notes-content").style.display = "block"
    document.querySelector(".task-content").style.display = "none"
    document.querySelector(".about-content").style.display = "none"
});

document.querySelector("#good-task").addEventListener("click", function () {
    document.querySelector(".task-content").style.display = "block"
    document.querySelector(".notes-content").style.display = "none"
    document.querySelector(".about-content").style.display = "none"
});
document.querySelector("#workoverflow-icon").addEventListener("click", function () {
    document.querySelector(".settings-content").style.display = "flex"
});

document.getElementById('minimize-button').addEventListener('click', () => {
    ipc.send("min")
})

document.getElementById('min-max-button').addEventListener('click', () => {
    ipc.send("restore-max")
})

document.getElementById('close-button').addEventListener('click', () => {
    ipc.send("close")
    console.log("GG");
})