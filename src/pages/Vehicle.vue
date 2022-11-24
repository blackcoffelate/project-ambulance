<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Detail Kendaraan"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn @click="new_customer=true" outline color="primary bg-green text-white" label="Tambah Kendaraan" class="q-mr-xs"/>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'Selesai')?'green'
              :(props.row.status == 'Tidak Aktif'?'red':'grey')
              "
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.status}}
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="new_customer">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Tambah Baru Data Kendaraan
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Plat ID</q-item-label>
                  <q-input dense outlined v-model="plat_id" label="Plat ID"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nama PO</q-item-label>
                  <q-input dense outlined v-model="nama_po" label="Nama PO"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Imei GPS</q-item-label>
                  <q-input dense outlined v-model="imei_gps" label="Imei GPS"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">No GPS</q-item-label>
                  <q-input dense outlined v-model="no_gps" label="No GPS"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">KM</q-item-label>
                  <q-input dense outlined v-model="km" label="KM"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Trayek</q-item-label>
                  <q-input dense outlined v-model="trayek" label="Trayek"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn label="Save" type="submit" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile } from 'quasar'
import { axios } from 'axios'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const columns = [
  {
    name: 'plat_id',
    align: 'left',
    label: 'Plat ID',
    field: 'plat_id',
    sortable: true
  },
  {
    name: 'nama_po',
    required: true,
    label: 'Nama PO',
    align: 'left',
    field: row => row.nama_po,
    sortable: true
  },
  {
    name: 'imei_gps',
    align: 'left',
    label: 'Imei GPS',
    field: 'imei_gps',
    sortable: true
  },
  {
    name: 'no_gps',
    align: 'left',
    label: 'No GPS',
    field: 'no_gps',
    sortable: true
  },
  {
    name: 'km',
    align: 'left',
    label: 'KM',
    field: 'km',
    sortable: true
  },
  {
    name: 'trayek',
    align: 'left',
    label: 'Trayek',
    field: 'trayek',
    sortable: true
  }
]

const data = [
  {
    plat_id: 'D 1948 AY',
    nama_po: 'KOPAMAS',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  },
  {
    plat_id: 'D 1948 AY',
    nama_po: 'AMBULAN',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  },
  {
    plat_id: 'D 1948 AY',
    nama_po: 'AMBULAN',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  },
  {
    plat_id: 'D 1948 AY',
    nama_po: 'AMBULAN',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  },
  {
    plat_id: 'D 1948 AY',
    nama_po: 'AMBULAN',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  },
  {
    plat_id: 'D 1948 AY',
    nama_po: 'AMBULAN',
    imei_gps: '353327023124720',
    no_gps: '089517874244',
    km: '52271.652',
    trayek: 'Posko - UBL'
  }
]

export default {
  data () {
    return {
      columns,
      data,
      filter: '',
      customer: {},
      new_customer: false,
      mode: 'list',
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  // created () {
  //   this.getKendaraan()
  // },
  methods: {
    getKendaraan () {
      const config = {
        method: 'POST',
        url: 'https://api-kopamas-carter.pptik.id:5121/api.v1/vehicles/po-get',
        headers: { 'x-acces-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoiNzNhZjk3YjQtNTllZC00MGFmLWJlZTQtOTM4MzhmMzlhNGYzIiwiaWF0IjoxNjY5MTA3MDIyLCJleHAiOjE4MjY3ODcwMjJ9.4x6F8nQyDiMaiARRMOpIV2YkbPrS4iKEEf3Qtm0SjDY' }
      }
      axios(config)
        .then(res => {
          console.log(res)
          this.data = res.data.data
        })
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('change-request.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  }

}
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
