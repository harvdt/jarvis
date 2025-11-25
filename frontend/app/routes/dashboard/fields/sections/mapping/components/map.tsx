import {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";
import "leaflet/dist/leaflet.css";
import type { Tree } from "~/types/tree";

export interface MapRef {
	flyToTree: (tree: Tree) => void;
}

const Map = forwardRef<MapRef, { data: Tree[] }>(({ data }, ref?) => {
	const [mounted, setMounted] = useState(false);
	const [MapComponents, setMapComponents] = useState<any>(null);
	const mapRef = useRef<any>(null);

	useImperativeHandle(ref, () => ({
		flyToTree: (tree: Tree) => {
			if (mapRef.current) {
				mapRef.current.flyTo([tree.latitude, tree.longitude], 18, {
					duration: 1.5,
				});
			}
		},
	}));

	useEffect(() => {
		Promise.all([import("react-leaflet"), import("leaflet")]).then(
			([reactLeaflet, L]) => {
				// Fix for default marker icons
				delete (L.Icon.Default.prototype as any)._getIconUrl;
				L.Icon.Default.mergeOptions({
					iconRetinaUrl:
						"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
					iconUrl:
						"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
					shadowUrl:
						"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
				});

				const createCustomIcon = (color: "green" | "yellow") => {
					return L.divIcon({
						className: "custom-marker",
						html: `
						<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.125 12.5 28.125S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" 
								fill="${color === "green" ? "#10b981" : "#fbbf24"}" 
								stroke="#fff" 
								stroke-width="2"/>
							<circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
						</svg>
					`,
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
					});
				};

				setMapComponents({
					...reactLeaflet,
					greenIcon: createCustomIcon("green"),
					yellowIcon: createCustomIcon("yellow"),
				});
				setMounted(true);
			}
		);
	}, []);

	if (!mounted || !MapComponents) {
		return (
			<div className="w-full h-[600px] bg-neutral-100 rounded-lg flex items-center justify-center">
				<p className="text-neutral-500">Loading map...</p>
			</div>
		);
	}

	const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

	return (
		<div className="w-full h-[600px] rounded-lg overflow-hidden border border-neutral-300">
			<MapContainer
				center={[3.5952, 98.6722]}
				zoom={16}
				className="w-full h-full"
				style={{ height: "100%", width: "100%" }}
				ref={mapRef}
			>
				{/* Free OpenStreetMap tiles */}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Tree markers */}
				{data &&
					data.map((tree) => (
						<Marker
							key={tree.id}
							position={[tree.latitude, tree.longitude]}
							icon={
								tree.flower_status && tree.pollination_status
									? MapComponents.greenIcon
									: MapComponents.yellowIcon
							}
						>
							<Popup>
								<div className="p-2">
									<h3 className="font-semibold text-sm">{tree.name}</h3>
									<p className="text-xs text-neutral-600 mt-1">
										Flower: {tree.flower_status ? "✓" : "✗"}
									</p>
									<p className="text-xs text-neutral-600">
										Pollination: {tree.pollination_status ? "✓" : "✗"}
									</p>
								</div>
							</Popup>
						</Marker>
					))}
			</MapContainer>
		</div>
	);
});

Map.displayName = "Map";

export default Map;
