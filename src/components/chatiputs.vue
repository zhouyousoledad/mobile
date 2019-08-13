<template>
    <div class="chatinput"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script type="text/ecmascript-6">
	
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false,

            }
        },
        watch: {
            'value'(){
                if (!this.isLocked) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            },
            parentHandleclick(){
            		this.innerText = ""
            }
        }
    }
</script>

<style scoped="scoped">
	.chatinput{
	border: none;
	border-radius: 10px;
	width: 90% !important;
	margin-left: 0 !important;
	min-height: 0.4rem;
	font-size: 0.3rem;
	padding: 0.1rem 0.2rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	white-space:normal;
    word-break:break-all;
    word-wrap:break-word; 
}
</style>