declare let L: any; // Leaflet included in HTML file

class MapMarker {
    map: any;

    async markIPs(ips: Array<string>) {
        ips.forEach(ip => fetch(`http://ip-api.com/json/${ip}`)
            .then(response => response.json())
            .then(response => {
                const {lat, lon, city} = response;
                this.createMarker(lat, lon, city);
            })
        );
    }

    createMarker(latitude: number, longitude: number, description: string) {
        L.marker([latitude, longitude]).addTo(this.map).bindPopup(description);
    }

    createMap(id: string, key: string, lat: number = 0, lon: number = 0) {
        this.map = L.map(id).setView([lat, lon], 2);

        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" + key, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
        }).addTo(this.map);
    }

    assignMap(map: any) {
        this.map = map;
    }
}