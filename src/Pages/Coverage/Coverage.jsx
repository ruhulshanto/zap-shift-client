import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLoaderData } from "react-router";
import './coverage.css'




// Fix leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// 🛰️ Component that updates map view on change
function FlyToLocation({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

const Coverage = () => {
    const districts = useLoaderData(); // Your JSON loader
    const [searchTerm, setSearchTerm] = useState("");
    const [mapCenter, setMapCenter] = useState([23.685, 90.3563]); // Bangladesh center
    const [zoom, setZoom] = useState(7); // Default zoom
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Filter markers to show only matches in search
    const filteredDistricts = districts.filter((d) =>
        d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Search function
    const handleSearch = () => {
        const found = districts.find(
            (d) => d.district.toLowerCase() === searchTerm.toLowerCase()
        );
        if (found) {
            setMapCenter([found.latitude, found.longitude]);
            setZoom(10); // Zoom into the selected district
        } else {
            alert("District not found.");
        }
    };

    const handleSuggestionClick = (districtName) => {
        setSearchTerm(districtName);
        setShowSuggestions(false);

        const found = districts.find(
            (d) => d.district.toLowerCase() === districtName.toLowerCase()
        );
        if (found) {
            setMapCenter([found.latitude, found.longitude]);
            setZoom(10);
        }
    };

    return (
        <div className="p-6 mt-16 space-y-8 w-3/4 mx-auto">
            <h1
                className="text-5xl font-bold text-center uppercase raleway"
            >
                We are available in 64 districts
            </h1>

            {/* Search Box */}
            <div className="relative flex justify-center gap-1 z-10">
                <div className="w-full max-w-md relative">
                    <input
                        type="text"
                        placeholder="Search your district..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                        }}
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && searchTerm.length > 0 && (
                        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-y-auto rounded shadow">
                            {districts
                                .filter((d) =>
                                    d.district.toLowerCase().startsWith(searchTerm.toLowerCase())
                                )
                                .slice(0, 10) // limit results
                                .map((d, idx) => (
                                    <li
                                        key={idx}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(d.district)}
                                    >
                                        {d.district}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                <button
                    onClick={handleSearch}
                    className="btn bg-blue-500 text-white font-semibold"
                >
                    Search
                </button>
            </div>

            {/* Map */}
            <div className="h-[600px] relative z-0">
                <MapContainer
                    center={mapCenter}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    className="h-full w-full rounded-xl shadow"
                >
                    {/* Make the map fly to location when center/zoom changes */}
                    <FlyToLocation center={mapCenter} zoom={zoom} />

                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {filteredDistricts.map((district, index) => (
                        <Marker
                            key={index}
                            position={[district.latitude, district.longitude]}
                        >
                            <Popup>
                                <strong>{district.district}</strong>
                                <br />
                                Status: {district.status}
                                <br />
                                Areas: {district.covered_area?.join(", ") || "N/A"}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
