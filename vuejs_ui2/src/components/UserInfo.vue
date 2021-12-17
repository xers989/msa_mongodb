<template>
    <v-app class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
        <Header :email="email" />
        <v-main height="auto" class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "UserInfo",
  components: {
    Header
  },
  data() {
    return {
      email: null
    };
  },
  mounted() {
    this.email = this.$store.state.email;
    this.$router.push({name: 'UserList'});
  }
}
</script>