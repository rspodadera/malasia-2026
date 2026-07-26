/* =========================================================
   GUÍA DE MALASIA
   JAVASCRIPT PRINCIPAL
   Versión 1.0
========================================================= */


/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

document.querySelectorAll(".current-year")
.forEach(element => {

    element.textContent = new Date().getFullYear();

});



/* =========================================================
   NAVEGACIÓN ACTIVA
========================================================= */

const currentPage = window.location.pathname;


document.querySelectorAll(".bottom-nav a")
.forEach(link => {

    if (link.href.includes(currentPage)) {

        link.classList.add("active");

    }

});



/* =========================================================
   CHECKLIST PERSISTENTE
========================================================= */

const checklistItems = document.querySelectorAll(
    ".check-item"
);


checklistItems.forEach((item,index)=>{


    const saved =
        localStorage.getItem(
            "checklist-" + index
        );


    if(saved === "true"){

        item.checked = true;

    }


    item.addEventListener(
        "change",
        ()=>{

            localStorage.setItem(
                "checklist-" + index,
                item.checked
            );

        }
    );


});



/* =========================================================
   BOTÓN VOLVER ARRIBA
========================================================= */

const topButton =
document.querySelector(".back-top");


if(topButton){


    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 400){

                topButton.classList.add("show");

            }else{

                topButton.classList.remove("show");

            }


        }
    );


    topButton.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );


}