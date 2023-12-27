<template>
  <div class="login-form-bg mt-4 text-center">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 mx-auto">
          <div class="form-input-content w-9975"> 
            <div class="card login-form mb-5">
              <div class="card-body pt-5">
                <h4 style="font-size: 60px;">WELCOME TO RT LIMA</h4>
                <br />
                <br />
                <h4 style="font-size: 15px;">LOGIN NOW</h4>

                <div class="login-form-wrapper d-flex flex-column align-items-center justify-content-center">
                  <form class="mt-5 mb-5 login-input" v-on:submit.prevent="$emit('doLogin', login)">
                    <div class="form-group">
                      <input
                        type="username"
                        v-model="login.username"
                        class="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        v-model="login.password"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <button class="btn login-form__btn submit w-100">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
}
</script>
