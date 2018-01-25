<template>
  <div class="editschedule container">
    <h1 class="page-header">Edit Schedule</h1>
    <div class="alert alert-warning alert-dismissible" role="alert" v-if="alert.type == 'warning'">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>Warning!</strong> {{ alert.message }}
    </div>
    <router-link class="btn btn-default" v-bind:to="'/'">Back</router-link>
    <form v-on:submit="updateSchedule">
      <div>
        <h3>Name</h3>
        <input type="text" class="form-control" placeholder="Name" v-model="schedule.name" autofocus>
      </div>
      <div class="schedule-time">
        <h3>Time</h3>
        <input type="text" class="form-control" placeholder="Hour" pattern="[0-9]{2}" maxlength="2" v-model="schedule.hour"> : 
        <input type="text" class="form-control" placeholder="Minute" pattern="[0-9]{2}" maxlength="2" v-model="schedule.minute">
      </div>
      <div>
        <h3>Days</h3>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.monday"> Monday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.tuesday"> Tuesday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.wednesday"> Wednesday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.thursday"> Thursday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.friday"> Friday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.saturday"> Saturday </span>
        <span class="checkbox-day"><input type="checkbox" v-model="schedule.sunday"> Sunday </span>
      </div>
      <div>
        <h3>Text</h3>
        <input type="text" class="form-control" placeholder="Text Message" v-model="schedule.text">
      </div>
      <div>
        <h3>Active</h3>
        <input type="checkbox" v-model="schedule.isActive"> active
      </div>
      <div class="btn-save-cancel">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="reset" class="btn btn-default">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'editschedule',
  data () {
    return {
      schedule: {},
      alert: {
        type: '',
        message: ''
      }
    }
  },
  methods: {
    getScheduleById(id){
      this.$http.get('http://localhost:3000/schedule?id=' + id)
          .then(function(response){
            this.schedule = response.data;
            console.log(this.schedule);
      });
    },
    updateSchedule: function(e){
      if (!this.schedule.name || !this.schedule.hour || !this.schedule.minute || !this.schedule.text) {
        this.alert.type = 'warning';
        this.alert.message = 'Please fill in all required fields';
      } else if (this.schedule.monday == false && this.schedule.tuesday == false && this.schedule.wednesday == false && this.schedule.thursday == false && this.schedule.friday == false && this.schedule.saturday == false && this.schedule.sunday == false) {
        this.alert.type = 'warning';
        this.alert.message = 'Please choose day less than one';
      } else {
        let updateSchedule = {
          id: this.schedule.id,
          name: this.schedule.name,
          hour: this.schedule.hour,
          minute: this.schedule.minute,
          monday: this.schedule.monday,
          tuesday: this.schedule.tuesday,
          wednesday: this.schedule.wednesday,
          thursday: this.schedule.thursday,
          friday: this.schedule.friday,
          saturday: this.schedule.saturday,
          sunday: this.schedule.sunday,
          text: this.schedule.text,
          isActive: this.schedule.isActive
        }
        console.log(updateSchedule);
        this.$http.put('http://localhost:3000/schedule', updateSchedule)
          .then(function(response){
            console.log(response);
            this.$router.push({path: '/'});
          });
        e.preventDefault();
      }
      e.preventDefault();
    },
    closeAlert: function(){
      this.alert.type = '';
      this.alert.message = '';
    }
  },
  created: function(){
    this.getScheduleById(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editschedule .schedule-time input[type="text"] {
    display: inline-block;
    width: 80px;
  }
  .editschedule .checkbox-day {
    margin-right: 20px;
  }
  .editschedule .btn-save-cancel {
    margin-top: 50px;
  }
</style>