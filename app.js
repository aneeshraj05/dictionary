const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inp = document.getElementById("inp").value;

    fetch(`${url}${inp}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            const phonetics = data[0].phonetics;
            const audioObj = phonetics.find(p => p.audio);
            const audioUrl = audioObj ? audioObj.audio : "";

            result.innerHTML = `
                <div class="word">
                    <h2>${inp}</h2>
                    <button onclick="playsound()"><i class="fa-solid fa-volume-high"></i></button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic || ""}</p>
                </div>
                <div>
                    <p class="meaning">${data[0].meanings[0].definitions[0].definition}.</p>
                </div>
                <div>
                    <p class="example">${data[0].meanings[0].definitions[0].example || "No example available."}</p>
                </div>`;

            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            result.innerHTML = `
                <div class="error">
                    <h3>❌ Couldn't fetch the word.</h3>
                    <p>Please check the spelling or try again later.</p>
                </div>`;
            sound.removeAttribute("src");
        });
});

function playsound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("No audio available for this word.");
    }
}
