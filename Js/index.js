console.log("Welcome to WorkOverflow 2.3")

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


