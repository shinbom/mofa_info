<template>
    <div id="searchBar">
        <input type="text" 
            id="searchText" 
            ref="searchText" 
            v-model="searchText" 
            @change="checkInputText"
            @keydown="checkInputText"
            @keyup="getCountry"
            :class="{ 'innerText' : searchTextStatus}"
            autocomplete="off"
        >
        <label for="searchText" :class="{error : errorStatus}">국가 검색어</label>
        <!-- Custom DataList -->
        <ol id="country_list" ref="countryList" v-if="recommendStatus">
            <li v-for="(item, index) in retsultCountryList" :key="index">
                <button type="button" @click="setCountry">{{item.country_nm}}</button>
            </li>
        </ol>
        <button type="button" id="submit_btn" ref="submit_btn" @click="getCountryInfo">
            <font-awesome-icon :icon="['fas', 'search']" size="1x"/>
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import {apiServiceKey} from '../router/apiInfo';

export default {
    name : 'searchBar',
    data () {
        return {
            searchText : '',
            searchVal : '',
            errorStatus : false,
            searchTextStatus : false,
            recommendStatus : false,
            countryList : [],
            retsultCountryList : [],
        }
    },
    mounted () {
        axios.get(`/1262000/CountryCodeService2/getCountryCodeList2?${apiServiceKey}&returnType=JSON&numOfRows=237&pageNo=1`)
        .then((response) =>  {
                // 초기단계에서, 국가리스트를 option으로 출력해야 함.  
                const countryList = response.data.data;
                countryList.forEach((item) => {
                    // 전체국가, 이슬람 국제등 국가가 아닌 기관들은 리스트에 추가되지 않도록 해야 함.
                    if(item.country_eng_nm !== '' || item.country_eng_nm == null) { 
                        this.countryList.push(item);
                    }
                });
            })
            .catch(function(error) {
                console.log(`리스트를 불러오는 데 실패하였습니다. : ${error}`);
        });
    },
    methods : {
        getCountryInfo () {
            /*
                -- 검색어 검증 --

                1. 텍스트가 없음.
                2. 한글이 아님
                3. 나라 텍스트가 아님 
            */
            if(this.searchText.length == 0 || this.searchText.match(/[가-하]/g).lentgh > 0) {
                this.$refs.searchText.focus();
            } else {
                this.$router.push({
                    name: 'country',
                    query : {
                        country_name : this.searchText,
                        country_en : this.searchVal
                    }
                });
            }
        },
        checkInputText () {
            const searchTextInput = this.$refs.searchText;
            if (searchTextInput.value.length ==  0) {
                this.searchTextStatus = false;
                this.errorStatus = true;
            }  else {
                this.searchTextStatus = true
                this.errorStatus = false;
            } 

            if (this.retsultCountryList.length == 0) {
                this.recommendStatus = false;
            }  else {
                this.recommendStatus = true
            } 
        },
        getCountry (e) {
            let input_text = e.target.value;
            this.retsultCountryList = this.countryList.filter(x => x.country_nm.indexOf(input_text) >= 0);
        },
        setCountry (e) {
            this.searchText = e.target.textContent;
            this.searchVal = this.retsultCountryList[0].country_iso_alp2;
            this.searchTextStatus = true;
            this.recommendStatus = false;
            this.$refs.submit_btn.focus();
        }
    }
}
</script>

<style lang="scss" scoped>
#searchBar{
    position:relative;
    margin:0 auto 20px;
    width:200px;
    input{
        width:100%; 
        height:50px; 
        padding:0px 50px 0 10px; 
        border-radius:15px; 
        border:1px solid #bebebe;
        transition:padding-top 0.3s;
        &:focus, &.innerText{
            padding-top:10px;
        }
        &:focus + label, &.innerText + label{
            top:10px;
            font-size:10px;
        }
    }
    label{
        position:absolute;
        top:50%;
        left:10px;
        transform:translate(0, -50%);
        color:#909090;
        transition:font-size 0.3s, top 0.3s;
        &.error{
            color:red;
        }
    }
    #country_list{
        width:200px;
        position:absolute;
        top:50px;
        left:0;
        height:400px;
        overflow-y:overlay;
        border-radius:10px;
        border:1px solid #bebebe;
        background-color:#fff;
        button{
            width:100%;
            height:50px;
            line-height:50px;
            font-size:14px;
            text-align:left;
            padding-left:10px;
            &:hover, &:focus{
                background-color:#bebebe;
                color:#fff;
            }
        }
    }
    #submit_btn{
        width:50px;
        height:50px;
        position:absolute;
        top: 50%;
        right:0;
        transform:translate(0, -50%);
        border-radius:0 10px 10px 0;
    }
}
</style>