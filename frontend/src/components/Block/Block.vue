<template>
    <div :style="blockstyle" class="block">
        <h1>{{text}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Block',
    props: {
        'text':{
            type: String,
            default: ''
        },
        'width':{
            type: Number,
            default: 200
        },
        'height':{
            type: Number,
            default: 50
        },
        'borderRadius':{
            type: Number,
            default: 8
        },
        'textColor':{
            type: String,
            default: '#212529'
        }
    },
    computed: {
        blockstyle(){
            return  'width:'+this.width+'px;'+
                    'height:'+this.height+'px;'+
                    'color:'+this.textColor+';'+
                    'border-radius:'+this.borderRadius+'px;';
        }
    },
    data(){
        return {
        }
    },
    methods: {

    },
    beforeMount(){

    },
}
</script>

<style scoped>
    .block {
            background-color: #393e46;
            border: solid 1px #393e46;
            text-align: center;
            text-decoration: none;
            
    }

</style>