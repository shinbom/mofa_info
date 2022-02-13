<template>
    <div id="searchBar">
        <input type="text" 
            id="searchText" 
            ref="searchText" 
            v-model="searchText" 
            @blur="checkInputText"
            @keyup="getCountry"
            v-bind:class="{ 'innerText' : searchTextStatus}"
        >
        <label for="searchText">국가 검색어 입력</label>
        <!-- Custom DataList -->
        <ol id="country_list" ref="countryList">
        </ol>
        <button type="button" id="submit_btn" @click="getCountryInfo">
            <font-awesome-icon :icon="['fas', 'glasses']" size="2x"/>
        </button>
    </div>
</template>

<script>
import axios from 'axios';

const requestUrl = "http://apis.data.go.kr/1262000/";
const serviceKey = "serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D";

export default {
    name : 'searchBar',
    data () {
        return {
            searchText : '',
            searchTextStatus : false,
            countryList : [],
            retsultCountryList : [],
        }
    },
    mounted () {
        axios.get(`${requestUrl}CountryCodeService2/getCountryCodeList2?${serviceKey}&returnType=JSON&numOfRows=237&pageNo=1`)
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
           this.$router.push('/country');
        },
        checkInputText () {
            const searchTextInput = this.$refs.searchText;
            (searchTextInput.value.length > 0) ? this.searchTextStatus = true : this.searchTextStatus = false;
        },
        getCountry (e) {
            let input_text = e.target.value;
            let result = this.countryList.filter(x => x.country_nm.indexOf(input_text) >= 0);
            console.log(result);
        },
        setCountry (e) {
            this.searchText = e.target.textContent
            this.searchTextStatus = true;
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
    }
    #country_list{
        display:none;
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