<template>
  <div class="form-class mx-auto">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Название:" label-for="input-2" style="color:#eeeeee">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Напишите ТОЧНОЕ название на АНГЛИЙСКОМ"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Оценка:" label-for="input-3" style="color:#eeeeee">
        <b-form-select
          id="input-3"
          v-model="form.userRating"
          :options="rating"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Дата Просмотра/Прочтения:" label-for="input-3" style="color:#eeeeee">
          <datepicker id="date" class="date" v-model="form.date"></datepicker>
      </b-form-group>

      <b-button style="margin-right:10px;" type="submit" variant="primary">Добавить</b-button>
      <b-button type="reset" variant="danger">Очистить</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import {apiWorker} from './Api/apiWorker'
import Datepicker from 'vuejs-datepicker';

  export default {
    props: {
        'type':{
            type: String,
            default: ''
        }
    },
    data() {
      return {
        picUri: 'https://kitsu.io/api/edge/anime?filter[text]=',
        backendUri: 'http://localhost:7000/',
        form: {
          name: '',
          userRating: null,
          type: this.type,
          image: '',
          date: new Date()
        },
        rating: [{ text: 'Выберете', value: null }, 'Я хочу об этом забыть', 'Плохо', 'Нормально', 'Хорошо', '10/10'],
        show: true
      }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            let res = '';
            await apiWorker(this.picUri + this.form.name).then(response => { res = response })
            this.form.image = res.data[0].attributes.posterImage.medium
            
            let titleName = res.data[0].attributes.canonicalTitle
            let contentType = res.data[0].type

            let body = { 
                name: titleName, 
                photo: this.form.image, 
                rating: this.form.userRating, 
                type: contentType,
                date: this.form.date
            }


            //console.log(this.form.date)
            await apiWorker(this.backendUri, 'post', body).then(response => { alert('Запрос успешно обработан') })
            this.onReset()
            //console.log(this.form);
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.image = ''
            this.form.userRating = null
            this.form.type = 'manga' 
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            this.form.date = new Date()
            })
        },
    },
    components: {
        Datepicker
    }
  }
</script>

<style>
    .vdp-datepicker *{
        background: #393e46;
        color: #fff;
        border:#393e46;
    }
    .form-class{
        width: 700px;
        background-color: #393e46;
        border: solid 1px #393e46;
        border-radius: 8px;
        padding: 10px;
    }
</style>
