<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="text-white bg-green-8">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Drivers</div>
                <div class="text-h5">140</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="local_taxi"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="text-white bg-orange-9">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Users</div>
                <div class="text-h5">
                  200
                </div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="airline_seat_recline_extra"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
        <q-card>
          <div style="height: fit-content; width: 100%;">
            <l-map
              :zoom="map.zoom"
              :center="map.center"
              :max-zoom="map.maxZoom"
              :min-zoom="map.minZoom"
              style="height: 430px; width: 100%"
            >
              <l-tile-layer
                :url="map.tileLayer"
                :attribution="map.attribution"
              />
              <l-marker
                v-for="(d, i) in maps"
                :key="i"
                :lat-lng="[Number(d.location_latitude), Number(d.location_longitude)]"
              >
              <!-- <l-popup> Hi! I'm staying here on this location! </l-popup> -->
              <l-icon
                :icon-size="[32, 32]"
                :icon-anchor="[16, 32]"
                :popup-anchor="[0, -32]"
                :icon-url="d.icons"
                />
              </l-marker>
            </l-map>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>

<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  // LPopup,
  LMarker
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    // LPopup,
    LMarker
  },
  data () {
    return {
      map: {
        tileLayer: 'http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png',
        attribution: '<a href="">blits ambulance</a> contributors',
        center: [-5.398909, 105.070861],
        zoom: 10,
        minZoom: 7,
        maxZoom: 18,
        markerLatLng: [47.313220, -1.319482],
        icons: ''
      },
      maps: [],
      zoom: 2,
      guid_po: '2bfab8ff-304e-42e9-b200-9fb9140f0432',
      iconWidth: 25,
      iconHeight: 40
    }
  },
  async created () {
    await this.getKendaraan()
  },
  methods: {
    async getKendaraan () {
      this.$axios.post('https://api-kopamas-carter.pptik.id:5121/api.v1/vehicles/po-get', {
        guid_po: this.guid_po
      }, {
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoiNzNhZjk3YjQtNTllZC00MGFmLWJlZTQtOTM4MzhmMzlhNGYzIiwiaWF0IjoxNjY5MTA3MDIyLCJleHAiOjE4MjY3ODcwMjJ9.4x6F8nQyDiMaiARRMOpIV2YkbPrS4iKEEf3Qtm0SjDY'
        }
      })
        .then((res) => {
          // console.log(res)
          if (res.status === 200) {
            res.data.data.forEach((marker) => {
              marker.location_latitude = marker.location.coordinates[1]
              marker.location_longitude = marker.location.coordinates[0]
              // marker.icons = 'src/images/Marker-Ambulance.png'
              marker.icons = 'https://www.kibrispdr.org/data/4/ambulance-icon-png-5.png'
              this.maps.push(marker)
            })
          }
        })
    },
    log (a) {
    }
  }
}
</script>
