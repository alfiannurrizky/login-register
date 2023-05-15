<script setup>

import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const name = ref('')
const password = ref('')
const success = ref(false)
const errors = ref([])

const register = async () => {
  let formData = new FormData

  formData.append('email', email.value)
  formData.append('name', name.value)
  formData.append('password', password.value)

  await axios.post('http://127.0.0.1:4500/api/register', formData)
    .then(res => {
      success.value = true
    })
    .catch(er => {
        for(let i = 0; i < 5; i++)
        {
          if(er.response.status == 422 )
          {
            errors.value = er.response.data.errors[i].msg
            alert(errors.value)
          }
        }

        if(er.response.status == 400)
        {
          alert(er.response.data.message)
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
        <h1>Register</h1> <br>

         <div class="alert alert-success" v-if="success" role="alert">
          Register Success
        </div>

        <form @submit.prevent='register()'>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" v-model="email" placeholder="Email"/>
          </div>

           <div class="form-outline mb-4">
            <input type="text" id="form1Example13" class="form-control form-control-lg" v-model="name" placeholder="Name"/>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" v-model="password" placeholder="Password"/>
          </div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>

        </form>
      </div>
    </div>
  </div>
</section>
</template>