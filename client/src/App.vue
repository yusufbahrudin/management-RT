<script>
import axios from 'axios'
import LoginComponent from './components/LoginComponent.vue'
import HomeComponent from './components/HomeComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import RumahComponent from './components/RumahComponent.vue'
import PembayaranComponent from './components/PembayaranComponent.vue'
import FormComponent from './components/FormComponent.vue'
import PembayaranComponent from './components/PembayaranComponent.vue'

export default {
  components: {
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    RumahComponent,
    PembayaranComponent,
    FormComponent,
    PembayaranComponent
},
  data() {
    return {
      currentPage: '',
      rumahs: [],
      dataInput: {},
      pembayarans: [],
    }
  },
  created() {
    if (localStorage.access_token) {
      this.currentPage = 'home'
      this.fetchRumah()
      this.fetchPembayaran()
    } else {
      this.currentPage = 'login'
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      if (page === 'home') {
        this.fetchRumah()
        this.fetchPembayaran()
      } else if (page === 'form') {
        this.dataInput = {
          nomor_rumah: '',
          nama_pemilik: '',
          status: '',
        }
      }
    },

    async loginHandler(login) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:4000/login',
          data: login
        })
        localStorage.setItem('username', data.username)
        localStorage.setItem('role', data.role)

        Toastify({
          text: `Welcome ${localStorage.username} (${localStorage.role})`,
          duration: 2000
        }).showToast()

        localStorage.access_token = data.access_token

        this.currentPage = 'home'
        this.rumahs()
      } catch (error) {
        console.log(error)
      }
    },

    async fetchRumah() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:4000/rumah',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.rumahs = data
        this.currentPage = 'rumah'
      } catch (error) {
        console.log(error)
      }
    },
    async fetchPembayaran() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:4000/pembayaran',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.pembayarans = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error)
      }
    },
    async handleFormData(form, status) {
      // console.log(form.status, 'testtttttttttt')

      try {
        if (status === 'edit') {
          const data = await axios({
            url: `http://localhost:4000/rumah/${form.id}`,
            method: 'PUT',
            headers: {
              access_token: localStorage.access_token
            },
            data: form
          })
          Toastify({ text: `Rumah ${form.name} updated`, duration: 3000 }).showToast()
          console.log(data)
        } else {
          const data = await axios({
            method: 'POST',
            url: 'http://localhost:4000/rumah',
            data: form,
            headers: {
              access_token: localStorage.access_token
            }
          })
          Toastify({ text: `Rumah ${form.name} added`, duration: 3000 }).showToast()
          console.log(data)
        }
        this.currentPage = 'rumah'
        this.fetchRumah()
      } catch (error) {
        console.log(error)
      }
    },
    async logoutHandler() {
      const username = localStorage.username

      localStorage.clear()

      Toastify({
        text: `Terima kasih , ${username}!`,
        duration: 2000
      }).showToast()

      this.currentPage = 'login'
    },

    async getRumahById(data) {
      const { id } = data
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:4000/rumah/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.dataInput = data
        this.currentPage = 'form'
      } catch (error) {
        console.log(error)
      }
    },
  
  }
}
</script>

<template>
  <NavbarComponent
    v-if="currentPage !== 'login'"
    :currentPage="currentPage"
    @dologout="logoutHandler"
  />

  <SidebarComponent
    v-if="currentPage !== 'login'"
    :currentPage="currentPage"
    @changePage="changePage"
  />

  <LoginComponent
    v-if="currentPage === 'login'"
    @doLogin="loginHandler"
    @changePage="changePage"
    @googleLogin="googleLogin"
  />


  <HomeComponent
    v-if="currentPage === 'home'"
    @changePage="changePage"
    :rumahs="rumahs"
    :pembayarans="pembayarans"
  />

  <RumahComponent
    v-if="currentPage === 'rumah'"
    @changePage="changePage"
    :rumahs="rumahs"
    @setStatus="setStatus"
    @getRumahById="getRumahById"
  />

  <PembayaranComponent
    v-if="currentPage === 'pembayaran'"
    @changePage="changePage"
    :pembayarans="pembayarans"
  />


  <FormComponent
    v-if="currentPage === 'form'"
    :dataInput="dataInput"
    :rumahs="rumahs"
    @handleFormData="handleFormData"
  />
</template>
