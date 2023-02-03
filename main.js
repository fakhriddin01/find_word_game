// window.localStorage.setItem("words", JSON.stringify(["lola", "ahmad", 'lochin', 'katta', 'osmon', 'shahar', "ko'cha", 'munosabat', 'ochiq', 'yopiq', 'mahalla']));
let words=JSON.parse(window.localStorage.getItem("words"));
// let words=["lola", "ahmad", 'word', 'big', 'sheep', 'country', 'put', 'negative', 'open' ]

let yourscore=0;
let pcscore=0;
let round=0;
let pcanswer;
let usedwords={};
const SR = new webkitSpeechRecognition();
SR.lang = "uz-UZ";
mic.onclick = (e) => {
  SR.start();
  message.innerHTML='';
};

SR.onresult = (event) => {
  let soz = event.results[0][0].transcript;  
  searchInput.value=soz;
  let letter2;
  let letter=soz[soz.length-1]
  
  if(round>0){
    letter2=pcanswer[pcanswer.length-1]
  }
  else{
    letter2=soz[0]
  }
  if(usedwords[soz] || soz[0]!=letter2 ){
    pc.innerHTML=++pcscore;
    message.innerHTML="siz mag'lub bo'ldingiz :( "; 
    mylist.innerHTML="";
    pclist.innerHTML=""; 
    usedwords={};
    round=0; 
  }
  else{
    mylist.innerHTML += `<li>${soz}</li>`;
    usedwords[soz]=soz;
    answer();
  }
  
  function answer(){
    setTimeout(()=>{
      for(let word of words){
        if(word[0]==letter && !usedwords[word]){
          usedwords[word]=word;
          pcanswer=word;
          pclist.innerHTML += `<li>${word}</li>`;
          round++;
          return word;
        }
      }
      you.innerHTML=++yourscore;
      message.innerHTML="Siz g'olib bo'lindingiz";
      mylist.innerHTML="";
      pclist.innerHTML="";
      usedwords={};
      round=0;
      return;
    }, 1500)
     
  }

  if(!words.includes(soz)){
    words.push(soz)
  }
  window.localStorage.setItem("words", JSON.stringify(words));
  console.log(usedwords);
};




