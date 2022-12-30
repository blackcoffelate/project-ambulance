<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-item style="width: 350px;" v-for="(d, i) in dataInformasi" :key="i" clickable v-ripple>
    <q-item-section top avatar>
      <q-avatar>
        <q-icon name="person_pin" class="text-blue-7" size="35px" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-uppercase">{{ d.data_user.fullname }}</q-item-label>
      <q-item-label caption>{{ d.titik_jemput.substring(0,20)+"..." }} <q-icon name="sync_alt" color="blue-7" size="15px" /> {{ d.tujuan.substring(0,20)+"..." }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ d.kode_pesanan }}</q-item-label>
      <q-btn :to="{ name: 'order' }" class="btn-sm" flat size="sm" icon="trip_origin" text-color="blue-7"></q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import createToken from 'src/boot/create_token'
export default ({
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      username: null,
      dataInformasi: [],
      dataUser: this.$q.localStorage.getItem('dataUser')
      // messages: [
      //   {
      //     id: 5,
      //     name: 'Pratik Patel',
      //     avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
      //     msg: 'Ingin Mendaftar Sebagai Driver',
      //     time: '10:42 PM',
      //     btn: ''
      //   }, {
      //     id: 6,
      //     name: 'Winfield Stapforth',
      //     msg: 'Ingin Mendaftar Sebagai Driver',
      //     avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
      //     time: '11:17 AM'
      //   }, {
      //     id: 1,
      //     name: 'Boy',
      //     msg: 'Ingin Mendaftar Sebagai Driver',
      //     avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      //     time: '5:17 AM'
      //   }, {
      //     id: 2,
      //     name: 'Jeff Galbraith',
      //     msg: 'Ingin Mendaftar Sebagai Driver',
      //     avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
      //     time: '5:17 AM'
      //   }, {
      //     id: 3,
      //     name: 'Razvan Stoenescu',
      //     msg: 'Ingin Mendaftar Sebagai Driver',
      //     avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
      //     time: '5:17 AM'
      //   }
      // ]
    }
  },
  created () {
    this.getPesanan()
  },
  methods: {
    getPesanan () {
      // this.$axios.get('http://localhost:5050/pesanan/get-pesanan', createToken())
      this.$axios.get('http://192.168.43.172:5050/pesanan/get-pesanan', createToken())
        .then((res) => {
          this.dataInformasi = res.data.data
          console.log(this.dataInformasi)
          // res.data.data.forEach((phonex) => {
          //   phonex.phones = phonex.data_user.no_telpon
          //   this.phoneData = phonex.phones.replace('0', '62')
          //   console.log(this.phoneData)
          // })
        })
    }
  }
})
</script>

<style scoped>

</style>
