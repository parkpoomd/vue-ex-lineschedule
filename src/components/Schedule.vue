<template>
  <div class="schedule container">
    <h1 class="page-header">Schedule</h1>
    <div class="alert alert-success alert-dismissible" role="alert" v-if="alert.type == 'success'">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
      {{ alert.message }}
    </div>
    <router-link class="btn btn-primary" v-bind:to="'/add'">Add Schedule</router-link>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Time</th>
          <th class="text-align-center">Mon</th>
          <th class="text-align-center">Tue</th>
          <th class="text-align-center">Wed</th>
          <th class="text-align-center">Thu</th>
          <th class="text-align-center">Fri</th>
          <th class="text-align-center">Sat</th>
          <th class="text-align-center">Sun</th>
          <th>Text</th>
          <th class="text-align-center">Active</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(schedule, index) in schedules">
          <td>{{ index + 1 }}</td>
          <td>{{ schedule.name }}</td>
          <td>{{ schedule.hour }} : {{ schedule.minute }}</td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.monday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.tuesday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.wednesday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.thursday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.friday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.saturday"></td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.sunday"></td>
          <td>{{ schedule.text }}</td>
          <td class="text-align-center"><input type="checkbox" v-model="schedule.isActive"></td>
          <td>
            <router-link class="btn btn-default btn-xs" v-bind:to="'/edit/' + schedule.id">Edit</router-link>
            <a class="btn btn-danger btn-xs" role="button" v-on:click="deleteSchedule(schedule.id)">Del</a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr v-if="schedules == ''"><td colspan="13">No Data</td></tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  data () {
    return {
      schedules: [],
      alert: {
        type: '',
        message: ''
      }
    }
  },
  methods: {
    getSchedule(){
      this.$http.get('http://localhost:3000/schedule')
        .then(function(response){
          this.schedules = response.data;
        });
    },
    deleteSchedule(id){
      this.$http.delete('http://localhost:3000/schedule?id=' + id)
        .then(function(response){
          this.alert.type = 'success';
          this.alert.message = 'Delete Schedule Success';
          this.getSchedule();
      });
    },
    closeAlert: function(){
      this.alert.type = '';
      this.alert.message = '';
    }
  },
  created: function(){
    this.$http.get('http://localhost:3000/schedule')
      .then(function(response){
        this.schedules = response.data;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .schedule table {
    margin-top: 15px;
  }
  .schedule .text-align-center {
    text-align: center;
  }
  .schedule .btn-save-cancel {
    margin-top: 50px;
  }
</style>
