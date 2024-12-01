//text in english and greek
const translations = {
    en: {
       home:"Home",
       about:"About",
       services:"Sevices",
       decoration:"Decoration",
       horecaCandles:"HORECA Candles",
       gifts:"Gifts",
       presents:"Presents",
       contact:"Contact"
    },
    el: {
       home:"Αρχική",
       about:"Σχετικά",
       services:"Υπηρεσίες",
       decoration:"Διακόσμηση Δεξιώσεων",
       horecaCandles:"Κεριά HORECA",
       gifts:"Εταιρικά Δώρα",
       presents:"Δώρα Βάφτισης",
       contact:"Επικοινωνία"
    },
 };

 function changeButtons(){

    activeLangButton.classList.remove("active-lang");
    inactiveLangButton.classList.add("active-lang");

    var tempPtr = inactiveLangButton;
    inactiveLangButton = activeLangButton;
    activeLangButton = tempPtr;
 }

 function setLanguage(langMode){
    console.log("set language for: ", langMode)
    
    if(activeLanguage === langMode)
       return;
    
    localStorage.setItem("language", langMode);

    applyLanguage(langMode);
    changeButtons();
    activeLanguage = langMode;
 }

 function applyLanguage(langMode){

    document.querySelectorAll("[data-text]").forEach((element) => {
       const key = element.getAttribute("data-text");
       element.innerText = translations[langMode][key];
    });
 }

 let activeLanguage = localStorage.getItem("language") || "en";
 
 let activeLangButton;
 let inactiveLangButton;
 const enLangButton = document.getElementById("enLangButton")
 const elLangButton = document.getElementById("elLangButton")

 if (activeLanguage === "en"){
    enLangButton.classList.add("active-lang")
    activeLangButton = enLangButton
    inactiveLangButton = elLangButton
 }
 else{
    elLangButton.classList.add("active-lang")
    activeLangButton = elLangButton
    inactiveLangButton = enLangButton
 }

 console.log(activeLanguage)
 applyLanguage(activeLanguage);