<template>
    <div id="modal" tabindex="-1" ref="modal">
        <div class="content">
            <header>
                <h3>{{this.$store.state.modalContent.title}}</h3>
                <span>{{this.$store.state.modalContent.writtenDate}}</span>
            </header>
            <div v-html="this.$store.state.modalContent.text"></div>
            <button type="button" id="modal_close" @click="modalClose">
                <font-awesome-icon :icon="['far', 'circle-xmark']" size="2x"/>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex';

export default {
    name : 'modal',
    created () {
        // ○, 다., ※인 경우, 줄바꿈 처리가 되도록 해야 함.
        // 콘텐츠에 제목과 동일한 텍스트가 있는 경우에 제거
        // console.log(this.selectedNotice.txt_origin_cn.split(/^[&nbsp;&nbsp;|①|②|③|④|⑤|□|○|△|\*.][가-하]다\.$/g));

        // replace가 좋을지, split후, 텍스트 반환이 좋을지 고민이 필요해 보임.
        // this.selectedNotice.txt_origin_cn.split(/&nbsp;&nbsp;|①|②|③|④|⑤|□|○|△|\*.|[가-하]다\.$/g);
        // this.notice_detail = this.selectedNotice.txt_origin_cn.replace(/&nbsp;&nbsp;|①|②|③|④|⑤|□|○|△|\*.|다\./g, (x) => {
        //     if (x == '다.') {
        //         return x + '<br>';
        //     } else if (x == '&nbsp;&nbsp;') {
        //         return '';
        //     }else {
        //         return '<br>' + x;
        //     }
        // }).trim();
    },
    mounted () {
        this.$refs.modal.focus();
    },
    computed : {
        ...mapState(['modalContent', 'modalStatus', 'selectedIndex'])
    },
    methods : {
        ...mapMutations['modalClose'],

        modalClose () {
            this.$store.commit('closeModal');
        }

    }
}
</script>

<style lang="scss" scoped>
    #modal{
        width:100%; 
        height:100%;
        position:fixed; 
        top:0; 
        left:0; 
        background-color:rgba(0, 0, 0, 0.5);
        header{
            h3{
                margin-bottom:10px;
                word-break: keep-all;
            }
        }
        .content{
            width:80%;
            max-width:800px;
            padding:80px 40px 80px 30px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            border-radius:10px;
            background-color:#fff;
           
            header{
                margin-bottom:10px;
                overflow:hidden;
                span{float:right;}
            }
            div {
                max-height:60vh;
                padding:20px;
                font-size:16px;
                word-break: keep-all;
                border-radius:10px;
                background-color:#f5f5f5;
                overflow-y:overlay;
            }
            #modal_close{
                width:50px;
                height:50px;
                position:absolute;
                top:10px;
                right:20px;
            }
        }
    }
</style>