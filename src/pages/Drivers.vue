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
          <q-btn @click="new_customer=true" outline color="primary bg-green text-white" label="Tambah Pengemudi" class="q-mr-xs"/>
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
            <q-btn
              :color="(props.row.status === 'AKTIF')?'green'
              :(props.row.status == 'vb'?'red':'grey')
              "
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 95px"
            >{{props.row.status}}
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="new_customer">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Tambah Baru Pengemudi
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md"
          @submit="onsubmit">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Instansi</q-item-label>
                  <q-input dense outlined v-model="instansi" label="Nama Instansi"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">No Plat</q-item-label>
                  <q-input dense outlined v-model="no_plat" label="No Plat"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nama Driver</q-item-label>
                  <q-input dense outlined v-model="nama_driver" label="Nama Driver"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Alamat</q-item-label>
                  <q-input dense outlined v-model="alamat" label="Alamat"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                <q-item-label class="q-pb-xs">Status</q-item-label>
                  <q-select
                  dense outlined
                  filled
                  key="status"
                  v-model="status"
                  option-label="status"
                  :options="optionStatus"
                  label="status"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label caption>{{ scope.opt.status }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                  <!-- <q-item-label class="q-pb-xs">Status</q-item-label>
                  <q-input dense outlined v-model="status" label="Status"/> -->
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="right" class="text-teal">
              <q-btn label="Simpan" type="submit" color="green" v-close-popup/>
            </q-card-actions>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>
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
    name: 'instansi',
    align: 'left',
    label: 'Nama Instansi',
    field: 'instansi',
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
    name: 'nama_driver',
    align: 'left',
    label: 'Nama Pengemudi',
    field: 'nama_driver',
    sortable: true
  },
  {
    name: 'alamat',
    align: 'left',
    label: 'Alamat',
    field: 'alamat',
    sortable: true
  },
  {
    name: 'status',
    align: 'center',
    label: 'Status',
    field: 'status',
    sortable: true
  }
]
const data = []

export default {
  data () {
    return {
      instansi: null,
      no_plat: null,
      nama_driver: null,
      alamat: null,
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
  mounted () {
    this.getDriver()
  },
  methods: {
    getDriver () {
      this.$axios.get('http://localhost:5050/drivers/get-driver', createToken())
        .then((res) => {
          console.log(res)
          this.data = res.data.data
        })
    },
    onsubmit () {
      this.$axios.post('http://localhost:5050/drivers/input', {
        instansi: this.instansi,
        no_plat: this.no_plat,
        nama_driver: this.nama_driver,
        alamat: this.alamat
      }, createToken()).then((res) => {
        console.log(res)
        if (res.data.status === true) {
          this.$router.push('/Drivers')
          this.$q.notify({
            message: 'berhasil input driver',
            color: 'green'
          })
        }
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
