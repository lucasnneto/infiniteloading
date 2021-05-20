<template>
  <div style="overflow-y: auto; height: inherit">
    <table>
      <tr>
        <th>Nome</th>
        <th>Linguagem</th>
      </tr>

      <tr v-for="r in repos" :key="r.id">
        <td>{{ r.name }}</td>
        <td>{{ r.language }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["repos"],
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 450px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
