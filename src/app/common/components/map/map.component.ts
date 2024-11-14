import { Component, ElementRef, inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { Order } from 'src/app/core/models/order';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  @Input() order!: Order;
  @Input() readonly: boolean = false;

  map!: Map;
  currentMarker!: Marker;
  #locationService = inject(LocationService);
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  /**
   * Marker Properties
   */
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  ngOnChanges(): void {
    if (!this.order) return;
    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  /**
   * Making Map All Features Disable
   */
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }
  /**
     * Initializing Map
     */
  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Marker Will Move On Clicking Any Point
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }


  /**
   * Find My Location Method
   */
  findMyLocation() {
    this.#locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }


  /**
   * Adding Marker To Map
   */
  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    // Getting New Location On Mouse dragging 
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })

  }

  /**
     * Setting Longitude And Latitude
     */
  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatlng = latlng;
    console.log(this.order.addressLatlng);
  }

  /**
     * Getting Address
     */
  get addressLatLng() {
    return this.order.addressLatlng!!;
  }
}
