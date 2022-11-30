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
                Administrator Blits Ambulance | Graduate and past committee | Keynote speaker on Selling and Recruiting
                Topics
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
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.NAMA"
                label="Nama"
              />

              <q-input
                filled
                v-model="user.EMAIL"
                label="Email"
              />

              <q-input
                filled
                v-model="user.NO_TELPON"
                label="No. Telpon"
              />

              <div>
                <q-btn label="Update" type="submit" color="green"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      dataUser: this.$q.localStorage.getItem('dataUser'),
      user: {
        NAMA: 'Gunawan',
        EMAIL: 'm******@****.com',
        NO_TELPON: '98******23'
      }
    }
  }
}
</script>

<style scoped>

</style>
