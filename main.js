const pantalla1 = document.querySelector(".pantalla1");
const pantalla2 = document.querySelector(".pantalla2");
const pantalla3 = document.querySelector(".pantalla3");
const pantalla4 = document.querySelector(".pantalla4");
const pantalla5 = document.querySelector(".pantalla5");
const pantalla6 = document.querySelector(".pantalla6");
const pantalla7 = document.querySelector(".total-kbps");
const pantalla8 = document.querySelector(".total-mbps");
const botones = document.querySelectorAll(".btn");
let guarda = document.getElementById("guarda");
sega = document.getElementById("seg1");
segb = document.getElementById("seg2");
segc = document.getElementById("seg3");
let cda = document.getElementById("cd_conv1");
let cdb = document.getElementById("cd_conv2");
let cdc = document.getElementById("cd_conv3");
let mda = document.getElementById("mod1");
let mdb = document.getElementById("mod2");
let mdc = document.getElementById("mod3");


botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;
        var guardav = guarda.options[guarda.selectedIndex].value;
        segav = sega.value;
        segbv = segb.value;
        segcv = segc.value;
        var cdav = cda.options[cda.selectedIndex].value;
        var cdbv = cdb.options[cdb.selectedIndex].value;
        var cdcv = cdc.options[cdc.selectedIndex].value;
        var mdav = mda.options[mda.selectedIndex].value;
        var mdbv = mdb.options[mdb.selectedIndex].value;
        var mdcv = mdc.options[mdc.selectedIndex].value;
        const tasaKbpsa = calculateKbps(segav, cdav, mdav, guardav)*1000;
        const tasaMbpsa = tasaKbpsa / 1000;
        const tasaKbpsb = calculateKbps(segbv, cdbv, mdbv, guardav)*1000;
        const tasaMbpsb = tasaKbpsb / 1000;
        const tasaKbpsc = calculateKbps(segcv, cdcv, mdcv, guardav)*1000;
        const tasaMbpsc = tasaKbpsc / 1000;

        totalKbpsValue = tasaKbpsa + tasaKbpsb + tasaKbpsc;
        totalMbpsValue = tasaMbpsa + tasaMbpsb + tasaMbpsc;

        if (boton.id === "calcular") {
            pantalla1.textContent = tasaKbpsa.toFixed(3);
            pantalla3.textContent = tasaKbpsb.toFixed(3);
            pantalla5.textContent = tasaKbpsc.toFixed(3);
            pantalla2.textContent = tasaMbpsa.toFixed(3);
            pantalla4.textContent = tasaMbpsb.toFixed(3);
            pantalla6.textContent = tasaMbpsc.toFixed(3);
            pantalla7.textContent = totalKbpsValue.toFixed(3);
            pantalla8.textContent = totalMbpsValue.toFixed(3);
            return;
        }

        if (boton.id === "borrar") {
            location.reload();
        }

    })
})

function calculateKbps(seg, cdConv, mod, guarda) {
        
        if (seg === "0" || cdConv === "0" || mod === "0" || guarda === "0") {
            rslt = "0";
        }
        else {
            rslt = Number(seg)*((8*0.922*Number(cdConv)*Math.log2(Number(mod))) / (21*(1+Number(guarda))));
        }
    return rslt;
}


