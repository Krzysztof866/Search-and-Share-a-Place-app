var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    axios_1 = __importDefault(axios_1);
    const form = document.querySelector("form");
    const addressInput = document.getElementById('address');
    const GOOGLE_MAPS_KEY_URL = process.env.API_KEY;
    function searchAddressHandler(event) {
        event.preventDefault();
        const enteredAddress = addressInput.value;
        axios_1.default
            .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_MAPS_KEY_URL}`)
            .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error("Could not fetch location!");
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 16,
            });
            new google.maps.Marker({ position: coordinates, map: map });
        })
            .catch(err => {
            alert(err.message);
            console.log(err);
        });
    }
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', searchAddressHandler);
});
//# sourceMappingURL=app.js.map