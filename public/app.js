const create = document.getElementById("create");
const clear = document.getElementById("clear-all");
const list = document.getElementById("list");
// import User from 'mongoose';

function firstLoad() {
    fetch("/all")
        .then(res => {
            res.json().then((data) => {
                newPlanSnippet(data);
            });
        });
}

function newPlanSnippet(data) {
    for (var i = 0; i < data.length; i++) {
        let data_id = data[i]["_id"];
        let trail = data[i]["trail"];
        let note = data[i]["note"];

        snippet = `
            <div id="dataEntry">
            <p id="dataTrail" data-id=${data_id}>${trail}
            <span id="dataNote" data-id=${data_id} >${note}</span></p>          
            </div>`;

        let myPlan = document.getElementById("list");
        myPlan.insertAdjacentHTML('beforeend', snippet);
    }
}

firstLoad();

function resetTrailAndNote() {
    const note = document.getElementById("note");
    note.value = "";
    const trail = document.getElementById("trail");
    trail.value = "";
}

function updateTrailAndNote(data) {
    const note = document.getElementById("note");
    note.value = data.note;
    const trail = document.getElementById("trail");
    trail.value = data.trail;
}
create.addEventListener("click", function (e) {
    if (e.target.matches("#create")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/submit", {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trail: document.getElementById("trail").value,
                note: document.getElementById("note").value,
                created: Date.now()
            })
        }).then(res => res.json())
            .then(res => newPlanSnippet([res]));
        resetTrailAndNote();
    }
});

list.addEventListener("click", function (e) {
    if ((e.target.matches("#dataTrail")) || (e.target.matches("#dataNote"))) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/find/" + data_id, { method: "get" })
            .then(res => res.json())
            .then(function (data) {
                updateTrailAndNote(data);
                let updaterBtn = `<button class="btn-primary2" id='updater' data-id=${data_id}>Update</button>`;
                btnGroup.innerHTML = updaterBtn;
            })
    } postUpdate();
});

function postUpdate() {
    console.log("i am here");
    btnGroup.addEventListener("click", function (e) {
        if (e.target.matches("#updater")) {
            element = e.target;
            data_id = element.getAttribute("data-id");
            fetch("/update/" + data_id, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trail: document.getElementById("trail").value,
                    note: document.getElementById("note").value,
                    success: window.location.reload(true)
                })

            }).then((res) => {
                res.json();
                console.log("again");
            })
                .then((data) => {

                    resetTrailAndNote(data);
                });
        }

    });
}

