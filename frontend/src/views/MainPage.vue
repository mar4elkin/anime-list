<template>
    <div class="content">
        <b-container class="bv-example-row">
            <b-row>
                
                <b-col>
                    <router-link to="/addManga">
                        <Block text="Добавить" :width=400 textColor="#eeeeee" />
                    </router-link>
                </b-col>


                <b-col>
                    <router-link to="/">
                        <Block text="Статистика" :width=400 textColor="#eeeeee" />
                    </router-link>
                </b-col>

                
            </b-row>
   
        </b-container>


            <div style="margin-top:100px" class="text-center" v-if="loading == true">
                <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>

            <div v-else>
                <div class="List mx-auto" v-for="(res,index) in apiResults" :key="index">
                    <div class="subList" >
                        <b-card :img-src="res.photo" img-left bg-variant="dark" text-variant="white" :title="res.name">
                            <b-card-text>
                                Тип: {{ res.type }} <br>
                                Оценка: {{ res.rating }} <br>
                                Дата Добавления: {{ res.date.split('T')[0] }}
                            </b-card-text>
                        </b-card>
                    </div>
                </div>
            </div>

    </div>
</template>

<script>
import Block from '../components/Block/Block'
import {apiWorker} from '../components/Api/apiWorker'
export default {
    name: 'app',
        data(){
            return {
                loading: true,
                backendUri: 'http://localhost:7000/',
                apiResults: [],
        }
    },
    created() {
        this.getManga()
    },
    methods: {
        async getManga() {

            apiWorker(this.backendUri).then(response => { 
                this.loading = false; 
                this.apiResults = response 
                //console.log(response)
            })

        }
    },
    components: {
        Block,
    },
}
</script>

<style scoped>
    .card-img-left{
        width: 200px;
    }
    .List{
        margin-top: 30px;
        width: 80%;
    }
    .subList{
        margin-top: 10px;
    }
</style>