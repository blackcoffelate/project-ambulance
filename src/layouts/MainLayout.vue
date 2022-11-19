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
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>Gunawan</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/"
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
                to="/Map"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="map" />
                </q-item-section>

                <q-item-section>
                  Map
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/Login"
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

export default ({
  name: 'MainLayout',
  components: {
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
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
