<script setup>

import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password  = ref('')
const user = ref([])
const success = ref(false)

const login = async () => {
  
  let formData = new FormData

  formData.append('email', email.value)
  formData.append('password', password.value)

  await axios.post('http://127.0.0.1:4500/api/login', formData)
    .then(res => {
      success.value = true
    })
    .catch(err => {
      if(err.response.status == 401)
      {
        alert(err.response.data.message)
      }
    })
}
</script>

<template>
 <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image">
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <h1>LOGIN</h1> <br>

        <div class="alert alert-success" v-if="success" role="alert">
          Login Success
        </div>

        <form @submit.prevent="login()">
      
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" v-model="email" placeholder="Email"/>
          </div>

        
          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" v-model="password" placeholder="Password"/>
          </div>

          <div class="d-flex justify-content-around align-items-center mb-4">
  
            <div class="form-check">
          
            </div>
            
            <router-link :to="{ name: 'register' }">Don't have any account?</router-link>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>

        </form>
      </div>
    </div>
  </div>
</section>
</template>
