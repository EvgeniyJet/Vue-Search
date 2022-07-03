<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Form />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    Form,
  },
};
</script>

<style>
body,
html,
td {
  background-color: #061328 !important;
  color: #ffff;
}
</style>

