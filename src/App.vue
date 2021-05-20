<template>
  <div id="app" style="display: flex; flex-direction: column">
    <div style="overflow-y: hidden; margin: 50px">
      <Table
        ref="table"
        style="height: 250px"
        :repos="listReps.value"
        @scroll.native="onWheel"
        v-wheel="onWheel"
      />
      <div v-if="params.loading">carregando...</div>
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";
import { reactive, ref, computed, watch } from "@vue/composition-api";
import useSWRV from "swrv";
const ax = require("axios");
export default {
  name: "App",
  components: {
    Table,
  },

  setup(_, attrs) {
    const axios = ax.create({
      baseURL: "https://api.github.com/users/vuejs/repos",
    });
    const params = reactive({
      page: 1,
      loading: false,
      eof: false,
    });
    const listReps = reactive({
      value: [],
    });
    const startTimeout = ref(0);
    const table = computed(() => attrs.refs.table);
    function onWheel(e) {
      if (!params.loading && !params.eof) {
        if (e === "down") {
          clearTimeout(startTimeout.value);
          startTimeout.value = setTimeout(() => {
            const listElm = table.value.$el;
            if (
              listElm.scrollTop + listElm.clientHeight >=
              listElm.scrollHeight
            ) {
              params.page += 1;

              params.loading = true;
            }
          }, 100);
        }
      }
    }
    watch(
      () => [params.page],
      () => {
        if (params.loading) mutate();
      }
    );
    const { mutate } = useSWRV(
      () => "repos",
      () =>
        axios
          .get("", {
            params: {
              page: params.page,
              per_page: 10,
              client_id: "2bfb64cd0b6873041246",
              client_secret: "55d4978a85ce91ba7c9bf687872b7dbc5a0a18e3",
            },
          })
          .then((res) => {
            params.loading = false;
            if (res.data.length == 0) params.eof = true;
            res.data.forEach((element) => {
              const ind = listReps.value.findIndex(
                (el) => el.id === element.id
              );
              if (ind == -1) {
                listReps.value.push(element);
              } else {
                listReps.value.splice(ind, 1, element);
              }
            });
          })
    );
    return {
      onWheel,
      params,
      listReps,
    };
  },
};
</script>

<style>
body {
  height: 100vh;
  margin: 0;
}
#app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #f0f0f0;
  color: #2c3e50;
}
</style>
