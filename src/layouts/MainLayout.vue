<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header_normal" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                    class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="leftDrawerOpen"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px; align-items: center;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>Administrator</q-toolbar-title>
          </q-toolbar>
          <!-- <div class="text-center">{{dataUser.user.username}}</div> -->
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                :to="{ name: 'dashboard' }"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>
                <q-item-section>
                  Dashboard
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                :to="{ name: 'order' }"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="toc" />
                </q-item-section>
                <q-item-section>
                  Pesanan
                </q-item-section>
              </q-item>
              <q-item
                active-class="tab-active"
                :to="{ name: 'vehicle' }"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="directions_car" />
                </q-item-section>
                <q-item-section>
                  Kendaraan
                </q-item-section>
              </q-item>
              <q-item
                active-class="tab-active"
                :to="{name: 'driver'}"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="settings_accessibility" />
                </q-item-section>
                <q-item-section>
                  Pengemudi
                </q-item-section>
              </q-item>
              <!-- <q-item
                active-class="tab-active"
                :to="{ name: 'schedule' }"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="free_cancellation" />
                </q-item-section>
                <q-item-section>
                  Jadwal
                </q-item-section>
              </q-item> -->

              <q-item
                active-class="tab-active"
                :to="{ name: 'map' }"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="map" />
                </q-item-section>
                <q-item-section>
                  Peta
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                :to="{ name: 'profil' }"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="manage_accounts" />
                </q-item-section>
                <q-item-section>
                  Profil
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                :to="{ name: 'login' }"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  Logout
                </q-item-section>
              </q-item>

            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Messages from './Messages'
// import createToken from 'src/boot/create_token'
export default ({
  name: 'MainLayout',
  components: {
    Messages
  },
  data () {
    return {
      leftDrawerOpen: false,
      username: null
      // dataUser: this.$q.localStorage.getItem('dataUser')
    }
  }
  // methods: {
  //   getUser () {
  //     this.$axios.get('http://localhost:5050/users/get-all', {
  //       username: this.username,
  //       email: this.email,
  //       no_telpon: this.no_telpon
  //     }, createToken())
  //       .then((res) => {
  //         this.data = res.data.data
  //         this.username = this.data[0].username
  //         this.email = this.data[0].email
  //         this.no_telpon = this.data[0].no_telpon
  //         console.log(this.data)
  //       })
  //   }
  // }
})
</script>
<style>
.q-drawer {
  background-size: cover !important;
}
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}
.navigation-item {
  border-radius: 5px;
}
.tab-active {
  background-color: green;
}
.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}
</style>
