<template>
    <div id="notice_list" class="wrap">
        <h3>외교부 공지사항</h3>
        <ul>
            <li v-for="(item, index) in noticeArray" v-bind:key="index">
                <button type="button" @click="getDetail(index)" ref="notice_list_btn">
                    <span class="title">{{noticeArray[index].title}}</span>
                    <span class="date">{{noticeArray[index].written_dt}}</span>
                </button>
            </li>
        </ul>
        <Modal 
        v-if="modalStatus" 
        v-on:modalClose="close" 
        v-bind:selectedIndex="noticeSelectedIndex" 
        v-bind:selectedNotice="noticeArray[noticeSelectedIndex]"></Modal>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal.vue';
import {apiServiceKey} from '../router/apiInfo';

export default {
    name : 'notice',
    data () {
        return {
          noticeSelectedIndex : 0,
          noticeArray : [],
          modalStatus : false,
        }
    },
    components : { 
      Modal
    },
    mounted () {
      axios.get(`/1262000/NoticeService2/getNoticeList2?${apiServiceKey}&returnType=JSON&numOfRows=10&pageNo=1`)
      .then((response) =>  {
        let notice_array = response.data.data;
        this.noticeArray = notice_array;
      })
      .catch(function(error) {
        console.log(`리스트를 불러오는 데 실패하였습니다. : ${error}`);
      });
    },
    methods : {
      getDetail (index) {
        this.modalStatus = true;
        this.noticeSelectedIndex = index;
      },
      close () {
        this.modalStatus = false;
      }
    }
}
</script>

<style lang="scss" scoped>
  #notice_list{
    border-radius:15px;
    padding:30px;
    background-color:#fff;
    ul{
      margin-top:20px;
      li {
        &:nth-child(n+2){
          margin-top:10px;
        }
        button{
          width:100%;
          overflow:hidden;
          text-align:left;
          span{display:block;}
          .title{
            width:1000px;
            white-space: nowrap;
            overflow:hidden;
            text-overflow: ellipsis;
            float:left;
          }
          .date{
            width:100px;
            text-align:center;
            float:right;
          }
        }
      }
    }
  }
  
@media screen and (min-width : 768px) and (max-width : 1024px) {
  #notice_list{
    .title{
      width:100%;
      float:none;
    }
    .date{
      width:100%;
      float:none;
    }
  }
}
@media screen and (max-width : 767px){
  #notice_list{
    .title{
      width:100%;
      float:none;
    }
    .date{
      width:100%;
      float:none;
    }
  }
}
</style>