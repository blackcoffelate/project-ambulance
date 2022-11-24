<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Detail Pengemudi"
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
              :color="(props.row.status == 'Aktif')?'green'
              :(props.row.status == 'Tidak Aktif'?'red':'grey')"
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
    name: 'nama_po',
    align: 'left',
    label: 'Nama PO',
    field: 'nama_po',
    sortable: true
  },
  {
    name: 'no_plat',
    required: true,
    label: 'No Plat',
    align: 'left',
    field: row => row.no_plat,
    sortable: true
  },
  {
    name: 'nama_pengemudi',
    align: 'left',
    label: 'Nama Pengemudi',
    field: 'nama_pengemudi',
    sortable: true
  },
  {
    name: 'no_telp',
    align: 'left',
    label: 'No. Telp',
    field: 'no_telp',
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
    nama_po: 'KOPAMAS',
    no_plat: 'D 1977 BR',
    nama_pengemudi: 'Aceng',
    no_telp: '+62895325811879',
    status: 'Aktif'
  },
  {
    nama_po: 'KOPAMAS',
    no_plat: 'D 1977 BR',
    nama_pengemudi: 'Aceng',
    no_telp: '+62895325811879',
    status: 'Sibuk'
  },
  {
    nama_po: 'KOPAMAS',
    no_plat: 'D 1977 BR',
    nama_pengemudi: 'Aceng',
    no_telp: '+62895325811879',
    status: 'Tidak Aktif'
  }
]
export default {
  setup () {
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
  }
}
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
