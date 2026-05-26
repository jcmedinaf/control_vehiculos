console.log("Llego al app.js");

document.addEventListener('DOMContentLoaded', () =>{
    console.log("App: iniciando sistema");
    cargarComponente('components/login/login.html', 'components/login/login.js', 'app-root');
});

document-addEventListener('cambiarVista', (e) => {
    console.log("APP: evento ´cambiarVista´ recibido", e.detail);
    const contenedor = e.detail.contenedor || 'app-root';
    cargarComponente(e.detail.rutaHTML, e.detail.rutaJS, contenedor);

});

async function cargarComponente(rutaHTML, rutaJS, contenedorId = 'app-root') {
    console.log(`APP: cargando ${rutaHTML} en ${contenedorId}`);  
    const root = document.getElementById(contenedorId);  

    if(!root){
        console.error(`APP ERROR: No se encontrol del contendor con ID: ${contenedorId}`);
        return;
    }

    try {
        const rutaCss = rutaJS.replace('.js', '.css');
        const linkId = `css-${rutaJS.replace(/[\/.]/g, '-')}`;

        if(!document.getElementById(linkId)){
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';

            const resCss = await fetch(rutaCss, { method: 'HEAD'});
            if(resCss.ok){
                link.href = rutaCss;
                document.head.appendChild(link);
            }
        }


        const response = await fetch(rutaHTML);
        if(!response.ok) throw new Error(`No se pudo cargar el HTML: ${rutaHTML}`);
        root.innerHTML = await response.text();

        const modulo = await import(`./${rutaJS}?v=${Date.now()}`);
        if(modulo.init){
            modulo.init();
        }

        console.log(`APP: ${rutaHTML} cargado exitosamente en ${contenedorId}`);
    } catch (err) {
        console.error("APP ERROR CRITICO: ", err);
    }
}