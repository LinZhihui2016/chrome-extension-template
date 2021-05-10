<template>
  <div class="ttt">
    T
    <TT></TT>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TT from "@/components/TT.vue";

export default defineComponent({
  name: "T",
  components: { TT },
});
</script>

<style lang="scss" scoped>
.ttt {
  background: #000;
  color: red;
}
</style>
