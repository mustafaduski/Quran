const surahList=document.getElementById("surah-list")
const search=document.getElementById("search")
const surahPage=document.getElementById("surah-page")
const tasbeehPage=document.getElementById("tasbeeh")
const prayerPage=document.getElementById("prayer")
const qiblaPage=document.getElementById("qibla")
const ayahs=document.getElementById("ayahs")
const title=document.getElementById("surah-title")
const audio=document.getElementById("audio")

let surahs=[]
fetch("https://api.alquran.cloud/v1/surah")
.then(res=>res.json())
.then(data=>{surahs=data.data;showSurahs(surahs)})

function showSurahs(list){
surahList.innerHTML=""
list.forEach(s=>{
const div=document.createElement("div")
div.className="surah"
div.innerHTML=`<h3>${s.number}. ${s.englishName}</h3><p>${s.name}</p>`
div.onclick=()=>openSurah(s.number,s.englishName)
surahList.appendChild(div)
})
}

function openSurah(num,name){
surahList.style.display="none"
surahPage.classList.remove("hidden")
title.innerText=name
ayahs.innerHTML=""
audio.src=`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${num}.mp3`
fetch(`https://api.alquran.cloud/v1/surah/${num}`)
.then(res=>res.json())
.then(data=>{data.data.ayahs.forEach(a=>{const p=document.createElement("p");p.textContent=a.text;ayahs.appendChild(p)})})
}

function back(){surahPage.classList.add("hidden");surahList.style.display="grid"}

search.addEventListener("input",()=>{
const value=search.value.toLowerCase()
const filtered=surahs.filter(s=>s.englishName.toLowerCase().includes(value))
showSurahs(filtered)
})

let count=0
function tasbeeh(){count++;document.getElementById("count").innerText=count}
function openTasbeeh(){surahList.style.display="none";surahPage.classList.add("hidden");tasbeehPage.classList.remove("hidden")}
function openPrayer(){surahList.style.display="none";surahPage.classList.add("hidden");tasbeehPage.classList.add("hidden");prayerPage.classList.remove("hidden");document.getElementById("prayer-times").innerText="06:00 Fajr\n12:30 Dhuhr\n15:45 Asr\n18:10 Maghrib\n19:30 Isha"}
function openQibla(){surahList.style.display="none";surahPage.classList.add("hidden");tasbeehPage.classList.add("hidden");prayerPage.classList.add("hidden");qiblaPage.classList.remove("hidden");alert("Qibla Compass Feature Coming Soon")}
function home(){tasbeehPage.classList.add("hidden");prayerPage.classList.add("hidden");qiblaPage.classList.add("hidden");surahPage.classList.add("hidden");surahList.style.display="grid"}
