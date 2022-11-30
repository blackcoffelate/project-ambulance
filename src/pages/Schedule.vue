<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Detail Jadwal"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top-right="props">
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
        <template v-slot:body-cell-aksi="props">
          <q-td key="action" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn
              :color="(props.row.aksi == 'Jemput')?'green'
              :(props.row.aksi == 'selesai'?'red':'grey')
              "
                dense
                class="q-px-xs"
                @click="edit(props.row.GUID)"
                label="Jemput"></q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { exportFile } from 'quasar'
// import { axios } from 'axios'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const columns = [
  {
    name: 'no_plat',
    align: 'left',
    label: 'No Plat',
    field: 'no_plat',
    sortable: true
  },
  {
    name: 'id_gps',
    required: true,
    label: 'Id GPS',
    align: 'left',
    field: row => row.id_gps,
    sortable: true
  },
  {
    name: 'alamat_jemput',
    align: 'left',
    label: 'Alamat Jemput',
    field: 'alamat_jemput',
    sortable: true
  },
  {
    name: 'alamat_tujuan',
    align: 'left',
    label: 'Alamat Tujuan',
    field: 'alamat_tujuan',
    sortable: true
  },
  {
    name: 'tanggal',
    align: 'left',
    label: 'Tanggal',
    field: 'tanggal',
    sortable: true
  },
  {
    name: 'status',
    align: 'left',
    label: 'Status',
    field: 'status',
    sortable: true
  },
  {
    name: 'aksi',
    align: 'left',
    label: 'AKSI',
    field: 'aksi',
    sortable: true
  }
]
const data = [
  {
    no_plat: '98766',
    id_gps: '43245',
    alamat_jemput: 'Posko',
    alamat_tujuan: 'UBL',
    tanggal: '24-11-2022 - 17:46',
    status: 'jadwal masuk'
  },
  {
    no_plat: '98766',
    id_gps: '43245',
    alamat_jemput: 'Posko',
    alamat_tujuan: 'UBL',
    tanggal: '24-11-2022 - 17:46',
    status: 'driver mengantar'
  },
  {
    no_plat: '98766',
    id_gps: '43245',
    alamat_jemput: 'Posko',
    alamat_tujuan: 'UBL',
    tanggal: '24-11-2022 - 17:46',
    status: 'selesai'
  },
  {
    no_plat: '98766',
    id_gps: '43245',
    alamat_jemput: 'Posko',
    alamat_tujuan: 'UBL',
    tanggal: '24-11-2022 - 17:46',
    status: 'selesai'
  },
  {
    no_plat: '98766',
    id_gps: '43245',
    alamat_jemput: 'Posko',
    alamat_tujuan: 'UBL',
    tanggal: '24-11-2022 - 17:46',
    status: 'jadwal masuk'
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
  methods: {
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
    // dataTanaman () {
    //   axios.post('https://api-kopamas-carter.pptik.id:5121/api.v1/vehicles/po-get')
    //   // api.get('/tanaman/', createToken())
    //     .then((res) => {
    //       console.log(res)
    //       this.data = res.data.data
    //       // console.log(this.data)
    //       // console.log(res.data.data.GUID)
    //     })
    // }
  }
}
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
