<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
    <q-item-section top avatar>
      <q-avatar color="primary">
        <img :src="msg.avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ msg.name }}</q-item-label>
      <q-item-label caption lines="2">{{ msg.msg }}.</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ msg.time }}</q-item-label>
      <q-btn class="btn-sm" flat size="sm" icon="star" text-color="blue-7">{{ msg.btn }}</q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessagesPages',
  setup () {
    return {
      messages: [
        {
          id: 5,
          name: 'Pratik Patel',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          msg: 'Ingin Mendaftar Sebagai Driver',
          time: '10:42 PM',
          btn: ''
        }, {
          id: 6,
          name: 'Winfield Stapforth',
          msg: 'Ingin Mendaftar Sebagai Driver',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Boy',
          msg: 'Ingin Mendaftar Sebagai Driver',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Jeff Galbraith',
          msg: 'Ingin Mendaftar Sebagai Driver',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Razvan Stoenescu',
          msg: 'Ingin Mendaftar Sebagai Driver',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>
