const pantalla2 = document.querySelector(".pantalla2");
const pantalla4 = document.querySelector(".pantalla4");
const pantalla6 = document.querySelector(".pantalla6");
const pantalla8 = document.querySelector(".total-mbps");
const botones = document.querySelectorAll(".btn");
let guarda = document.getElementById("guarda");
let sega = document.getElementById("seg1");
let segb = document.getElementById("seg2");
let segc = document.getElementById("seg3");
let cda = document.getElementById("cd_conv1");
let cdb = document.getElementById("cd_conv2");
let cdc = document.getElementById("cd_conv3");
let mda = document.getElementById("mod1");
let mdb = document.getElementById("mod2");
let mdc = document.getElementById("mod3");

// Función para validar que la suma de segmentos no exceda 13
function validarSegmentos(segav, segbv, segcv) {
    return (segav + segbv + segcv) <= 13;
}

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
        
        
        if (!validarSegmentos(segav, segbv, segcv)) {
            alert('El total de segmentos en A, B y C no puede exceder 13. Ajuste los valores.');
            return;
        }
        
        const tasaMbpsa = calculateKbps(segav, cdav, mdav, guardav);
        const tasaMbpsb = calculateKbps(segbv, cdbv, mdbv, guardav);
        const tasaMbpsc = calculateKbps(segcv, cdcv, mdcv, guardav);

        totalMbpsValue = tasaMbpsa + tasaMbpsb + tasaMbpsc;

        if (boton.id === "calcular") {
            pantalla2.textContent = tasaMbpsa.toFixed(3);
            pantalla4.textContent = tasaMbpsb.toFixed(3);
            pantalla6.textContent = tasaMbpsc.toFixed(3);
            pantalla8.textContent = totalMbpsValue.toFixed(3);
            return;
        }

        if (boton.id === "borrar") {
            location.reload();
        }
    })
});

function calculateKbps(seg, cdConv, mod, guarda) {
    if (seg === "0" || cdConv === "0" || mod === "0" || guarda === "0") {
        rslt = 0;
    } else {
        rslt = Number(seg) * ((8 * 0.922 * Number(cdConv) * Math.log2(Number(mod))) / (21 * (1 + Number(guarda))));
    }
    return rslt;
}
