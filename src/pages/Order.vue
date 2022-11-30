<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Detail Pesanan"
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="telp" :props="props">
              {{ props.row.telp }}
            </q-td>
            <q-td key="tujuan" :props="props">{{ props.row.tujuan }}</q-td>
            <q-td key="titik_jemput" :props="props">{{ props.row.titik_jemput }}</q-td>
            <q-td key="tanggal" :props="props">{{ props.row.tanggal }}</q-td>
            <q-td key="status" :props="props">{{ props.row.status }}</q-td>
            <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <!-- <q-btn
              :color="(props.row.aksi == 'Pilih Driver')?'green'
              :(props.row.aksi == 'selesai'?'red':'grey')
              "
                dense
                class="q-px-xs"
                @click="edit(props.row.GUID)"
                label="Pilih Driver">
              </q-btn> -->
              <q-btn
                color="teal-10"
                dense
                class="q-px-xs"
                @click="edit(props.row.GUID)"
                label="Pilih Driver">
              </q-btn>
            </div>
          </q-td>
          </q-tr>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'Harga Diterima')?'green'
              :(props.row.status == 'Batal'?'red':'grey')
              "
              text-color="white"
              dense
              align="center"
              class="text-weight-bolder"
              square
              style="width: 100px"
            >{{props.row.status}}
            </q-chip>
          </q-td>
        </template>
        <!-- <template v-slot:body-cell-aksi="props">
          <q-td key="action" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn
              :color="(props.row.aksi == 'Pilih Driver')?'green'
              :(props.row.aksi == 'selesai'?'red':'grey')
              "
                dense
                class="q-px-xs"
                @click="edit(props.row.GUID)"
                label="Pilih Driver">
              </q-btn>
              <q-btn
                color="teal-10"
                dense
                class="q-px-xs"
                @click="edit(props.row.GUID)"
                label="Pilih Driver">
              </q-btn>
            </div>
          </q-td>
        </template> -->
      </q-table>
    </q-card>

  </q-page>
</template>

<script>
import { exportFile } from 'quasar'
import createToken from 'src/boot/create_token'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const columns = [
  {
    name: 'telp',
    align: 'left',
    label: 'Telepon',
    field: 'telp',
    sortable: true
  },
  {
    name: 'tujuan',
    required: true,
    label: 'Tujuan',
    align: 'left',
    field: row => row.tujuan,
    sortable: true
  },
  {
    name: 'titik_jemput',
    align: 'left',
    label: 'Titik Jemput',
    field: 'titik_jemput',
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
    align: 'center',
    label: 'Aksi',
    field: 'aksi',
    sortable: true
  }
]
const data = []

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
  created () {
    this.getPesanan()
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
    },
    getPesanan () {
      this.$axios.get('http://192.168.43.172:5050/pesanan/get-pesanan', createToken())
        .then((res) => {
          console.log(res)
          this.data = res.data.data
        })
    }
  }
}
</script>
<style>
</style>
