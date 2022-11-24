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
          <q-btn @click="new_customer=true" outline color="primary" label="Add New" class="q-mr-xs"/>

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
            Add new change request
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Change Name</q-item-label>
                  <q-input dense outlined v-model="customer.name" label="Change Name"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Change Type</q-item-label>
                  <q-input dense outlined v-model="customer.change_type" label="Change Type"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">New Address Information</q-item-label>
                  <q-input dense outlined v-model="customer.new_address" label="New Address Information"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Status</q-item-label>
                  <q-input dense outlined v-model="customer.status" label="Status"/>
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
    name: 'status',
    align: 'left',
    label: 'AKSI',
    field: 'status',
    sortable: true
  }
]

const data = []
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
    },
    dataTanaman () {
      axios.post('https://api-kopamas-carter.pptik.id:5121/api.v1/vehicles/po-get')
      // api.get('/tanaman/', createToken())
        .then((res) => {
          console.log(res)
          this.data = res.data.data
          // console.log(this.data)
          // console.log(res.data.data.GUID)
        })
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
