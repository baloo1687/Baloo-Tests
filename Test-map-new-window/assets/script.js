
const map = L.map('map', {
    center: [50.4020355, 30.5326905],
    zoom: 12
});

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar', 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([50.4020355, 30.5326905])
    .addTo(map)
    .bindPopup('Слава Україні')
    .openPopup();

const button = document.querySelector('#button');
const windowWidth = window.innerWidth * 0.3;
const windowHeight = window.innerHeight * 0.3;
const windowLeft = (window.innerWidth/2)-(windowWidth/2);
const windowTop = (window.innerHeight/2)-(windowHeight/2);
const windowFeatures = `width=${windowWidth}, height=${windowHeight}, top=${windowTop}, left=${windowLeft}`;
let popupWindow = null;
let popupWindowHtml = `<div id="popupMap" style="height: 100vh;"></div>
                        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
                        <script>
                            let leafletStyles = document.createElement('link');
                            leafletStyles.type = 'text/css';
                            leafletStyles.rel = 'stylesheet';
                            leafletStyles.href = 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css';
                            document.head.appendChild(leafletStyles);

                            setTimeout(() => {
                                const map = L.map('popupMap', {
                                    center: [50.4020355, 30.5326905],
                                    zoom: 12
                                });
                                
                                const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
                                    foo: 'bar', 
                                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                }).addTo(map);
                                
                                const marker = L.marker([50.4020355, 30.5326905])
                                    .addTo(map)
                                    .bindPopup('Слава Україні')
                                    .openPopup();
                            }, 500)
                            
                        </script>`

button.addEventListener('click', (e) => {
    if (popupWindow) {
        if (popupWindow.closed) {
            windowOpener();
        } else {
            popupWindow.close();
        }
    } else {
        windowOpener();
    }
})

const itemLeft = document.querySelector('.main__left');
const itemRight = document.querySelector('.main__right');

const toggler = (e) => {
    itemLeft.classList.toggle('col-xs-6');
    itemLeft.classList.toggle('col-xs-12');
    itemLeft.classList.toggle('col-sm-6');
    itemLeft.classList.toggle('col-sm-12');
    itemRight.classList.toggle('hidden');
}

const windowOpener = () => {
    toggler();

    popupWindow = window.open('', '_blank', windowFeatures);
    popupWindow.document.write(popupWindowHtml);
    popupWindow.document.close();
    popupWindow.addEventListener("beforeunload", (e) => {
        toggler();
    });
}