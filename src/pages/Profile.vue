<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">
                Blits Ambulance
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{dataUser.user.username}}</div>
              <div class="text-caption text-grey">
                <div>{{dataUser.user.email}}</div>
                <div>{{dataUser.user.alamat}}</div>
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
            Assessing clients needs and present suitable promoted products. Liaising with and persuading targeted doctors to prescribe our products utilizing effective sales skills.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
            @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
              />

              <q-input
                filled
                v-model="email"
                label="Email"
              />

              <q-input
                filled
                v-model="no_telpon"
                label="No. Telpon"
              />

              <q-input
                filled
                v-model="alamat"
                label="Alamat"
              />

              <div>
                <q-btn label="Update" type="submit" color="green-10"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import createToken from 'src/boot/create_token'
export default {
  data () {
    return {
      dataUser: this.$q.localStorage.getItem('dataUser'),
      // user: {
      username: null,
      email: null,
      no_telpon: null,
      alamat: null
      // }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.put(`http://localhost:5050/users/user-update/${this.dataUser.user.guid}`, {
        username: this.username,
        email: this.email,
        no_telpon: this.no_telpon,
        alamat: this.alamat
      }, createToken())
        .then((res) => {
          console.log(res)
          if (res.data.status) {
            this.$q.dialog({
              title: 'Peringatan',
              message: 'apakah anda yakin? klik ok untuk melanjutkan'
            }).onOk(() => {
              this.$router.push({ name: 'login' })
            })
          }
        })
    },
    getUser () {
      // this.$axios.get(`http://localhost:5050/users/get-user/${this.$route.params.guid}`, createToken())
      this.$axios.get('http://localhost:5050/users/get-all', {
        username: this.username,
        email: this.email,
        no_telpon: this.no_telpon,
        alamat: this.alamat
      }, createToken())
        .then((res) => {
          this.data = res.data.data
          this.username = this.data[0].username
          this.email = this.data[0].email
          this.no_telpon = this.data[0].no_telpon
          this.alamat = this.data[0].alamat
          console.log(this.data)
        })
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>

<style scoped>

</style>
