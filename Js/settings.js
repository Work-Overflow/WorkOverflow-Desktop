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