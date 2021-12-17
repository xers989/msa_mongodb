<template>
    <v-app>
        <Header :email="email" />

        <Footer />
    </v-app>
</template>

<script>
import Header from "../components/Header";
//import UserInfo from "../components/UserInfo";

export default {
  name: 'App',

  components: {
    Header,
  //  UserInfo
  },
  data() {
    return {
      email: null
    };
  },
  mounted() {
    this.email = this.$route.params.email;
  }
};
</script>