console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currtime=document.getElementById('ctime');

let songs = [
    {songName: "Aaj Ki Raat - Stree 2", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "O Mahi - Arijit Singh from Dunki", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Dekha Tenu - Mohammad Faiz from Mr.&Mrs. Mahi", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Allah De Bandeya - Jaani & B Praak from Desi Melodies", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Jeena Sikhaya - Guru Randhawa from Kuch Khatta Ho Jaye", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - O Sajni Re - Arijit Singh from Laapta Ladies", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Do You Know - Diljit Dosanjh from Khel Khel Mein", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sataranga - Arijit Singh from Animal", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Dance Meri Rani - Guru Randhawa Ft. Nora Fatehi from T-Series", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Teri Aadat - Abhi Dutt Ft. Anushka Sen from Bing Music", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})