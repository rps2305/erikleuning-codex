import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_ID = 'werkgebied-kaart';
let mapInstance;

function configureDefaultMarker() {
  const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href;
  const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href;
  L.Icon.Default.mergeOptions({
    iconUrl,
    iconRetinaUrl: iconUrl,
    shadowUrl
  });
}

export function initWerkgebiedMap() {
  if (typeof window === 'undefined') {
    return;
  }
  const container = document.getElementById(MAP_ID);
  if (!container || mapInstance) {
    return;
  }

  configureDefaultMarker();

  mapInstance = L.map(MAP_ID, {
    scrollWheelZoom: false,
    tap: false
  }).setView([52.311, 6.929], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers'
  }).addTo(mapInstance);

  L.circle([52.311, 6.929], {
    radius: 50000,
    color: '#0d7ea3',
    weight: 2,
    fillColor: '#0d7ea3',
    fillOpacity: 0.12
  }).addTo(mapInstance);

  L.marker([52.311, 6.929]).addTo(mapInstance).bindPopup('Werkgebied rondom Oldenzaal');
}
