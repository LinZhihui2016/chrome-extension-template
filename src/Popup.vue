<template>
  <main>
    <h1>快递单号查询</h1>
    <h3>
      <span class="el-icon-message-solid red"></span>
      已支持申通、圆通、韵达、中通、EMS，其他快递将陆续支持，敬请关注
    </h3>
    <div class="input-wrap">
      <el-input
        v-model="input"
        autocomplete="off"
        placeholder="输入单号，用逗号隔开 例如：900814863705,900814863706"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="onSearch">查快递</el-button>
        </template>
      </el-input>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // const from = inject(clientKey)!;
    const input = ref("");
    // const send = new Msg({ from, to: Client.background, action: "expressNum" });
    return {
      input,
      onSearch: () => {
        // eslint-disable-next-line no-undef
        chrome.cookies.getAll({}, (cookies) => {
          const cookie = cookies
            .filter((i) => i.domain.match(/dianchacha/))
            .map((i) => {
              const { name, value } = i;
              return `${name}=${value}`;
            })
            .join("; ");
          window.alert(cookie);
        });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/style/common";

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 700px;
  min-height: 200px;
  background: #ffffff;

  h1 {
    margin: 20px 0;
  }

  h3 {
    font-weight: normal;
    font-size: 14px;
    color: #999;
  }

  .input-wrap {
    margin: 20px 0;
    width: 80%;
  }
}
</style>
