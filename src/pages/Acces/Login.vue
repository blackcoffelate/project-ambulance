<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          id="particles-js"
          class="normal_gradient">
        </div>
        <q-card
          class="login-form"
          v-bind:style="$q.platform.is.mobile ? { width: '80%' } : { width: '35%' }"
        >
        <q-img src="~assets/ambulance.jpg" height="260px"></q-img>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Selamat Datang di
                <div>Blits Ambulance</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="email" label="Email" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  type="button"
                  color='blue-7'
                  @click="loginNotify"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
  export default {
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      async loginNotify() {
        await this.$axios.post('http://localhost:5050/users/login', {
          email: this.email,
          password: this.password
        })
        .then((res)=>{
          // console.log(res);
          if (res.data.status === true){
            this.$q.localStorage.set('dataUser', res.data.data)
            this.$router.push({name : 'dashboard'})
            this.$q.notify({
              color: 'green',
              message: 'selamat anda berhasil login'
            })
          } else {
            if (res.data.code === 401) {
              this.$q.notify({
                color: 'red',
                message: 'Email yang anda masukkan salah'
              })
            }
          } if (res.data.code === 501) {
            this.$q.notify({
              color: 'red',
              message: 'Password yang anda masukkan salah'
            })
          }
        })
      }
    },
  }
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
}
.login-form {
  position: absolute;
}
</style>
