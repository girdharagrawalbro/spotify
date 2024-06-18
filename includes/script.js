let currentAudio = null;
let songs = [];
let currentIndex = 0;

async function getSongs() {
    try {
        let response = await fetch("http://spotify-girdhar.great-site.net/songs/");
        let html = await response.text();
        let div = document.createElement("div");
        div.innerHTML = html;

        let as = div.getElementsByTagName("a");
        songs = [];

        Array.from(as).forEach(a => {
            let href = a.getAttribute("href");
            if (href && href.endsWith(".mp3")) {
                let song = {
                    name: href.trim()
                };
                songs.push(song);
            }
        });

        console.log(songs);
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

async function displaySongs() {
    songs = await getSongs();
    let songListElement = document.getElementById("songList");

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        let listItem = document.createElement("li");
        listItem.classList.add("flex", "j-bet", "a-cen");

        let songInfoDiv = document.createElement("div");
        songInfoDiv.classList.add("flex", "a-cen");

        let indexHeader = document.createElement("h4");
        indexHeader.textContent = i + 1;

        let songImage = document.createElement("img");
        songImage.src = "resouces/music.svg";

        let songNameHeader = document.createElement("h4");
        songNameHeader.textContent = song.name.replace(/%20/g, ' '); // Replacing %20 with space

        songInfoDiv.appendChild(indexHeader);
        songInfoDiv.appendChild(songImage);
        songInfoDiv.appendChild(songNameHeader);

        listItem.appendChild(songInfoDiv);

        listItem.addEventListener("click", async function() {
            currentIndex = i; // Update currentIndex
            await playSong(song.name);
        });

        songListElement.appendChild(listItem);
    }
}

async function playSong(songName) {
    let songUrl = "http://spotify-girdhar.great-site.net/songs/" + songName;
    console.log(songUrl);
    if (currentAudio) {
        currentAudio.pause();
    }
    currentAudio = new Audio(songUrl);

    document.getElementById('song-playing').textContent = songName.replace(/%20/g, ' ');

    currentAudio.addEventListener('loadedmetadata', function() {
        let durationInSeconds = currentAudio.duration;
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = Math.floor(durationInSeconds % 60);
        let durationString = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        document.getElementById('tduration').textContent = durationString;
        document.getElementById('progress').max = durationInSeconds;
    });

    currentAudio.addEventListener('timeupdate', function() {
        let playedSeconds = Math.floor(currentAudio.currentTime);
        let durationInSeconds = currentAudio.duration;
        let progress = (playedSeconds / durationInSeconds) * 100;
        document.getElementById('progress').value = playedSeconds;
        let minutes = Math.floor(playedSeconds / 60);
        let seconds = Math.floor(playedSeconds % 60);
        let playedString = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        document.getElementById('pduration').textContent = playedString;
    });

    document.getElementById('progress').addEventListener('input', function() {
        currentAudio.currentTime = this.value;
    });

    currentAudio.play();

    document.getElementById('play').style.display = 'none';
    document.getElementById('pause').style.display = 'inline-block';

    currentAudio.addEventListener('pause', function() {
        document.getElementById('play').style.display = 'inline-block';
        document.getElementById('pause').style.display = 'none';
    });

    currentAudio.addEventListener('play', function() {
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'inline-block';
    });

    currentAudio.addEventListener('ended', function() {
        if (currentIndex < songs.length - 1) {
            currentIndex++;
            playSong(songs[currentIndex].name);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('play').addEventListener('click', function() {
        if (currentAudio && currentAudio.paused) {
            currentAudio.play();
        }
    });

    document.getElementById('pause').addEventListener('click', function() {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
    });

    document.getElementById('previous').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            playSong(songs[currentIndex].name);
        }
    });

    document.getElementById('next').addEventListener('click', function() {
        if (currentIndex < songs.length - 1) {
            currentIndex++;
            playSong(songs[currentIndex].name);
        }
    });

    displaySongs();
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the volume controller input element
    let volController = document.getElementById('vol-controller');

    // Add event listener to the volume controller input element
    volController.addEventListener('input', function() {
        // Get the value of the volume controller (range) input
        let volume = parseFloat(this.value);

        // Ensure that volume is between 0 and 1
        volume = Math.min(1, Math.max(0, volume));

        // Set the volume of the current audio
        if (currentAudio) {
            currentAudio.volume = volume;
        }
    });
});

left= document.getElementById('left')
document.getElementById('hamburg').addEventListener('click', function() {
    left.style.display="block";
    left.style.width="100vw"
    left.style.height="100%"

    document.getElementById('right').style.display="none";
    
});
document.getElementById('close').addEventListener('click', function() {
    left.style.display="none";
    document.getElementById('right').style.display="block";

});


// let currentAudio = null;
//         let songs = [];
//         let currentIndex = 0;

//         async function getSongs() {
//             let response = await fetch("../songs/");
//             let html = await response.text();
//             let parser = new DOMParser();
//             let doc = parser.parseFromString(html, "text/html");
//             let spans = doc.querySelectorAll('span.name');
//             songs = [];

//             spans.forEach(span => {
//                 let songName = span.innerText.trim();
//                 if (songName.endsWith(".mp3")) {
//                     let song = {
//                         name: songName
//                     };
//                     songs.push(song);
//                 }
//             });

//             return songs;
//         }

//         async function displaySongs() {
//             let songs = await getSongs();
//             let songListElement = document.getElementById("songList");

//             for (let i = 0; i < songs.length; i++) {
//                 const song = songs[i];
//                 let listItem = document.createElement("li");
//                 listItem.classList.add("flex", "j-bet", "a-cen");

//                 let songInfoDiv = document.createElement("div");
//                 songInfoDiv.classList.add("flex", "a-cen");

//                 let indexHeader = document.createElement("h4");
//                 indexHeader.textContent = i + 1;

//                 let songImage = document.createElement("img");
//                 songImage.src = "https://i.scdn.co/image/ab67616d00001e02ab1e3b16de1c7ec009880e97";

//                 let songNameHeader = document.createElement("h4");
//                 songNameHeader.textContent = song.name;

//                 songInfoDiv.appendChild(indexHeader);
//                 songInfoDiv.appendChild(songImage);
//                 songInfoDiv.appendChild(songNameHeader);

//                 listItem.appendChild(songInfoDiv);

//                 listItem.addEventListener("click", async function() {
//                     await playSong(song.name);
//                 });

//                 songListElement.appendChild(listItem);
//             }
//         }

//         async function playSong(songName) {
//             let songUrl = "../songs/" + encodeURIComponent(songName);
//             if (currentAudio) {
//                 currentAudio.pause();
//             }
//             currentAudio = new Audio(songUrl);

//             document.getElementById('song-playing').textContent = songName;

//             currentAudio.addEventListener('loadedmetadata', function() {
//                 let durationInSeconds = currentAudio.duration;
//                 let minutes = Math.floor(durationInSeconds / 60);
//                 let seconds = Math.floor(durationInSeconds % 60);
//                 let durationString = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
//                 document.getElementById('tduration').textContent = durationString;
//                 document.getElementById('progress').max = durationInSeconds;
//             });

//             currentAudio.addEventListener('timeupdate', function() {
//                 let playedSeconds = Math.floor(currentAudio.currentTime);
//                 let durationInSeconds = currentAudio.duration;
//                 let progress = (playedSeconds / durationInSeconds) * 100;
//                 document.getElementById('progress').value = playedSeconds;
//                 let minutes = Math.floor(playedSeconds / 60);
//                 let seconds = Math.floor(playedSeconds % 60);
//                 let playedString = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
//                 document.getElementById('pduration').textContent = playedString;
//             });

//             document.getElementById('progress').addEventListener('input', function() {
//                 currentAudio.currentTime = this.value;
//             });

//             currentAudio.play();

//             document.getElementById('play').style.display = 'none';
//             document.getElementById('pause').style.display = 'inline-block';

//             currentAudio.addEventListener('pause', function() {
//                 document.getElementById('play').style.display = 'inline-block';
//                 document.getElementById('pause').style.display = 'none';
//             });

//             currentAudio.addEventListener('play', function() {
//                 document.getElementById('play').style.display = 'none';
//                 document.getElementById('pause').style.display = 'inline-block';
//             });

//             currentAudio.addEventListener('ended', function() {
//                 if (currentIndex < songs.length - 1) {
//                     currentIndex++;
//                     playSong(songs[currentIndex].name);
//                 }
//             });
//         }

//         document.addEventListener("DOMContentLoaded", function() {
//             document.getElementById('play').addEventListener('click', function() {
//                 if (currentAudio && currentAudio.paused) {
//                     currentAudio.play();
//                 }
//             });

//             document.getElementById('pause').addEventListener('click', function() {
//                 if (currentAudio && !currentAudio.paused) {
//                     currentAudio.pause();
//                 }
//             });

//             document.getElementById('previous').addEventListener('click', function() {
//                 if (currentIndex > 0) {
//                     currentIndex--;
//                     playSong(songs[currentIndex].name);
//                 }
//             });

//             document.getElementById('next').addEventListener('click', function() {
//                 if (currentIndex < songs.length - 1) {
//                     currentIndex++;
//                     playSong(songs[currentIndex].name);
//                 }
//             });

//             displaySongs();
//         });


//         left= document.getElementById('left')
//         document.getElementById('hamburg').addEventListener('click', function() {
//             left.style.display="block";
//             left.style.width="100vw"
//             left.style.height="100%"

//             document.getElementById('right').style.display="none";
            
//            });
//            document.getElementById('close').addEventListener('click', function() {
//               left.style.display="none";
//               document.getElementById('right').style.display="block";
          
//           });
           

//           document.addEventListener("DOMContentLoaded", function() {
//             // Get the volume controller input element
//             let volController = document.getElementById('vol-controller');
        
//             // Add event listener to the volume controller input element
//             volController.addEventListener('input', function() {
//                 // Get the value of the volume controller (range) input
//                 let volume = parseFloat(this.value);
        
//                 // Ensure that volume is between 0 and 1
//                 volume = Math.min(1, Math.max(0, volume));
        
//                 // Set the volume of the current audio
//                 if (currentAudio) {
//                     currentAudio.volume = volume;
//                 }
//             });
//         });