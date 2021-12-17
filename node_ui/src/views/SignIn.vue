<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <h1>Welcome to MongoDB MSA</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>ACCOUNT</h2>
          <v-form >
              <v-text-field
                v-model="email"
                label="Email"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                dark
                filled
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
              <div class="text-center">
                <v-btn class="signin-btn" type="submit" rounded color="white" dark @click="signIn">
                  Sign In
                </v-btn>
            </div>
          </v-form>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
    data() {
        return {
          tenant: "",
          email: "",
          password: "",
          showPass: false
        }
    },
    methods: {
        signIn() {
          this.$store.commit("signInState", { email: this.email});
          this.$router.push({name: 'userinfo'})
        }
    }
}
</script>