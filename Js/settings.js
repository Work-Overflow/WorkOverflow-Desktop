setInterval(() => {
    var data = '';

    for (var key in window.localStorage) {

        if (window.localStorage.hasOwnProperty(key)) {
            data += window.localStorage[key];
            // console.log(key + " = " + ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) + ' KB');
        }

    }

    let KB = ((data.length * 16) / (8 * 1024)).toFixed(2) + ' KB';
    console.log(KB)
    document.getElementById("storage-capacity").textContent = KB;
    // console.log(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB');    
}, 2000);


let setting_close_button = document.getElementById("close-settings-imp");
setting_close_button.addEventListener("click", function () {
    document.querySelector(".settings-content").style.display = "none"
});


/*
 * DARK & LIGHT MODE THEMES 
*/

const root = document.querySelector(':root');
const $setROOT = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));

// DARK MODE FUNCTION IN JS FOR WORKOVERFLOW
function $DARK_MODE() {
    const DARK_COLOR_PALETTE = {
        '--background-1': 'rgb(18, 18, 18)',
        '--background-2': 'rgb(43, 43, 43)',
        '--background-3': '#000000',

        '--text-icons-1': '#e4e4e4',
        '--text-icons-2': '#ffd0d0',
        '--text-icons-ccc': '#484848',
        '--text-icons-special-case': '#f1f3fa',

        '--scroll-track': '#0e0e0e',
        '--scroll-thumb': '#e6e6e6',

        '--window-button': '#dddddd4b',
    };
    $setROOT(DARK_COLOR_PALETTE);
    localStorage.setItem("theme", "dark");
}


// LIGHT MODE FUNCTION IN JS FOR WORKOVERFLOW
function $LIGHT_MODE() {
    const WHITE_COLOR_PALETTE = {
        '--background-1': 'white',
        '--background-2': '#f5f5f5',
        '--background-3': '#11101d',

        '--text-icons-1': '#11101d',
        '--text-icons-2': '#575757',
        '--text-icons-ccc': '#ccc',
        '--text-icons-special-case': '#f1f3fa',

        '--scroll-track': '#f1f1f1',
        '--scroll-thumb': '#e6e6e6',


        '--window-button': 'transparent',
    };
    $setROOT(WHITE_COLOR_PALETTE);

    localStorage.setItem("theme", "light");
}


/*
 * COLOR THEMEING SECTION [FANCY FEATURE FOR KIDS] ~ xD
 */
function $GET_BLACK() {
    document.getElementById("font-title-bar").style.color = "var(--text-icons-1)";
}
function $GET_PEACH() {
    document.getElementById("font-title-bar").style.color = "#EB1D36";
}
function $GET_YELLOW() {
    document.getElementById("font-title-bar").style.color = "#FEDB39";
}
function $GET_BLUE() {
    document.getElementById("font-title-bar").style.color = "#47B5FF";
}



// CHECKUP OF THEMES
const THEME = localStorage.getItem("theme");
if (THEME == undefined || THEME == null) {
    $LIGHT_MODE();
}
if (THEME == "light") {
    $LIGHT_MODE();
}
if (THEME == "dark") {
    $DARK_MODE();
}

function TRANSPARENT() {
    const trans_mode = localStorage.getItem("transparent");
    if (trans_mode == "true") {
        localStorage.setItem("transparent", "false")
        document.getElementById("transparency-mount").innerHTML = `
        <i class="ri-toggle-line" id="transparency-switch"></i>`
        document.getElementsByClassName("body-section")[0].style.backgroundColor = "var(--background-2)"
    }
    else if (trans_mode == "false") {
        localStorage.setItem("transparent", "true")
        document.getElementById("transparency-mount").innerHTML = `
        <i class="ri-toggle-fill" id="transparency-switch"></i>`
        document.getElementsByClassName("body-section")[0].style.backgroundColor = "transparent"
    }
    else {
        localStorage.setItem("transparent", "true")
        document.getElementById("transparency-mount").innerHTML = `
        <i class="ri-toggle-fill" id="transparency-switch"></i>`
        document.getElementsByClassName("body-section")[0].style.backgroundColor = "transparent"
    }
}



function CLEAR_DATA() {
    const confirm_last_time_guys = confirm("DANGER !!\nAll your notes and task would be deleted finally\nIf you really want to clear, press 'OK' button")
    if (confirm_last_time_guys) {
        localStorage.removeItem("WorkOverflow_Task");
        localStorage.removeItem("WorkOverflow_Notes");
    }
}