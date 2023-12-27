<script>
export default {
  props: ['rumah', 'index'],
  data() {
    return {
      role: localStorage.role,
      userid: localStorage.userid
    }
  }
}
</script>

<template>
  <tr :key="rumah.id">
    <td>{{ index + 1 }}</td>
    <td>{{ rumah.nama_pemilik }}</td>
    <td>{{ rumah.nomor_rumah }}</td>
    <td>{{ rumah.status }}</td>
    <td style="text-align: center">
      <select
        v-model="rumah.status"
        class="form-select"
        @change="setStatus({ id: rumah.id, status: rumah.status })"
        style="text-align: center"
      >
        <option value="Belum Lunas">Active</option>
        <option value="Lunas">Inactive</option>
      </select>
    </td>
    <td>
      <button
        v-if="role === 'admin'"
        @click="getRumahById(rumah.id)"
        class="btn btn-warning btn-sm text-white"
      >
        <i class="fa fa-pencil" aria-hidden="true"></i>
        Edit
      </button>
      <button
        v-else="role === 'admin'"
        @click="getRumahById(rumah.id)"
        class="btn btn-warning btn-sm text-white"
      >
        <i class="fa fa-pencil" aria-hidden="true"></i>
        Edit
      </button>
    </td>
  </tr>
</template>
