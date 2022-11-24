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
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'Selesai')?'green'
              :(props.row.status == 'Batal'?'red':'grey')
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

  </q-page>
</template>

<script>
import { exportFile } from 'quasar'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const columns = [
  {
    name: 'no_telp',
    align: 'left',
    label: 'No Telp',
    field: 'no_telp',
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
  }
]

const data = [
  {
    no_telp: '+6285221842929',
    tujuan: 'dewi sri no.10',
    titik_jemput: 'pelajar pejuang 45 no.65 bandung',
    tanggal: '02-11-2022 16:39',
    status: 'Batal',
    harga: 'Rp. 50.000'
  },
  {
    no_telp: 'KOPAMAS',
    tujuan: 'D 1977 BR',
    titik_jemput: 'Aceng',
    tanggal: '+62895325811879',
    status: 'Selesai',
    harga: 'Rp. 5000'
  }
]
export default {
  setup () {
    return {
      columns,
      data,
      filter: '',
      customer: {},
      new_order: false,
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
  }
}
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
