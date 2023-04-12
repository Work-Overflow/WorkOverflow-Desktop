console.log("Welcome to WorkOverflow 2.3")

const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

document.querySelector("#good-notes").addEventListener("click", function () {
    document.querySelector(".notes-content").style.display = "block"
    document.querySelector(".task-content").style.display = "none"
});

document.querySelector("#good-task").addEventListener("click", function () {
    document.querySelector(".notes-content").style.display = "none"
    document.querySelector(".task-content").style.display = "block"
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

document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    ctrlShiftKey(e, '+') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};


