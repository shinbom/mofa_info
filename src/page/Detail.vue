<template>
    <main id="detail">
        <div class="wrap">
            <header>
                <div class="left_box">
                    <figure>
                        <img :src="`${this.imageUrl}`" alt="">
                    </figure>
                    <h3>{{this.country}}</h3>
                </div>
                <div class="right_box">
                    <ul class="info_list">
                        <li>
                            <span class="title">언어정보</span>
                            <span class="desc">{{this.countryInfomation.language }}</span>
                        </li>
                        <li>
                            <span class="title">기후정보</span>
                            <span class="desc">{{this.countryInfomation.climateInfo}}</span>
                        </li>
                        <li>
                            <span class="title">환율</span>
                            <span class="desc">{{this.countryInfomation.price}}</span>
                        </li>
                    </ul>
                    <ul class="btn_lists">
                        <li>
                            <button type="button">결제 정보 확인</button>
                        </li>
                        <li>
                            <button type="button">체류 정보</button>
                        </li>
                        <li>
                            <button type="button">비상사태 발생시 정보</button>
                        </li>
                        <li>
                            <button type="button">인터넷 환경 정보</button>
                        </li>
                    </ul>
                </div>
            </header>
            <div>
                <section>
                    <h4>{{this.country}} 한국발 입국자 조치</h4>
                    <p v-if="this.covidNotice.length == 0" class="not_work">{{this.country}} 한국발 입국자 조치가 없습니다.</p>
                    <ul v-else>
                        <li v-for="(item, index) in covidNotice" v-bind:key="index">{{item}}</li>
                    </ul>
                </section>
                <section>
                    <h4>{{this.country}} 안전공지</h4>
                    <p v-if="this.safetyNotice.length == 0">{{this.country}} 안전공지가 없습니다.</p>
                    <ul v-else>
                        <li v-for="(item, index) in safetyNotice[0]" v-bind:key="index">
                            <button type="button">{{item.title}}</button>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <Modal
        v-if="modalStatus" 
        v-on:modalClose="close" 
        v-bind:selectedIndex="noticeSelectedIndex" 
        v-bind:selectedNotice="noticeArray[noticeSelectedIndex]"
        ></Modal>
    </main>
</template>

<script>
import axios from 'axios';
import Modal from '../components/Modal.vue';

export default {
    name : 'Detail',
    data () {
        return {
            country : '',
            imageUrl : '',
            countryInfomation : {
                language : '',
                climateInfo : '',
                price : '',
                usageInfo : '',
                visitInfo : '',
                emergencyInfo : '',
                internetStatus : ''
            },
            covidNotice :[], 
            safetyNotice : [],
            modalStatus : false,
        }
    },
    components :{
        Modal
    },
    created () {
        axios.get('/B410001/natnInfoService/natnInfo?serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D&type=json&isoWd2CntCd=AE')
        .then((response) => {
            const getCountryData = response.data;
            this.countryInfomation.language = getCountryData.items[0].langNm; // 언어정보
            this.countryInfomation.climateInfo = getCountryData.items[0].clmtCntnt; // 기후정보
            this.countryInfomation.price = getCountryData.items[0].critEhgtPrcs; // 환율
            this.countryInfomation.usageInfo = getCountryData.items[0].crtcdUsageCntnt; // 결제관련 정보
            this.countryInfomation.visitInfo = getCountryData.items[0].drvlsAcqsMthCntnt; // 체류정보
            this.countryInfomation.emergencyInfo = getCountryData.items[0].emgcyCntmsCheatCntnt; // 비상사태 발생시 정보
            this.countryInfomation.internetStatus = getCountryData.items[0].innetWifiCntnt; // 인터넷 환경 정보
        })
        .catch((error) => {
            console.log(`국가정보를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가 정보 및 지도 데이터 요청
        axios.get('/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D&numOfRows=10&cond[country_nm::EQ]=그리스')
        .then((response) =>  {
            let countryFlag = response.data.data[0];
            this.country = countryFlag.country_nm;
            this.imageUrl = countryFlag.download_url;
        })
        .catch((error) => {
            console.log(`국가를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가 별 한국발 입국자 조치 데이터 요청
        axios.get('/1262000/CountryKoreaDepartureService/getCountryKoreaDepartureList?serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D&returnType=JSON&numOfRows=10&cond[country_nm::EQ]=그리스').then((response) => {
           let covidNoticeList = response.data.data;
           if ( covidNoticeList.length > 0 ) {
            this.covidNotice.push(covidNoticeList);
           }
        })
        .catch ((error) => {
            console.log(`국가별 한국발 입국자 조치를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가별 안전공지 데이터 요청
        axios.get('/1262000/CountrySafetyService3/getCountrySafetyList3?serviceKey=dZzpRZXHtwvV1EXFqZd2pMdafCSAEzE%2Bze5XLaWmhL401G2v3rR%2FQViVia3LNGnTHHmiB2VLQz03b8kO5i9ZNg%3D%3D&returnType=JSON&numOfRows=10&cond[country_nm::EQ]=그리스').then((response) => {
            let safetyNoticeList = response.data.data;
            this.safetyNotice.push(safetyNoticeList);
        })
        .catch ((error) => {
            console.log(`안전공지를 불러오는 데 실패하였습니다. : ${error}`);
        })
    }
}
</script>

<style lang="scss" scoped>
    header{
        display:flex;
        width:100%;
        margin-bottom:40px;
        padding:30px;
        border-radius:15px;
        background-color:#fff;
        .left_box{
            flex :1;
            margin-right:20px;
            figure{
                position:relative;
                height:0;
                padding-top:47%;
                img{
                    position:absolute;
                    top:50%;
                    left:50%;
                    height:100%;
                    transform:translate(-50%, -50%);
                }
            }
            h3{
                text-align:center;
            }
        }
        .right_box{
            flex :3;
            .info_list {
               li {
                    padding:5px 0;
                    .title{
                        padding:0 10px;
                        border-radius:0 10px 10px 0;
                        background-color:#e2e2e2;
                    }
                    .desc{
                        display:block;
                        margin-top:5px;
                        font-size:14px;
                    }
                    &:nth-child(n+2){
                        border-top:1px solid #cacaca;
                    }
               } 
            }
            .btn_lists{
                display:flex;
                flex-wrap:wrap;
                gap:10px;
                margin-top:20px;
                li{
                    button{
                        padding:10px;
                        border-radius:10px;
                        background-color:#4880ee;
                        color:#fff;
                    }
                }
            }
        }
    }
    section{
        border-radius:15px;
        padding:30px;
        background-color:#fff;
        &:nth-child(n+2){
            margin-top:40px;
        }
        .not_work{text-align:center;}
    }
</style>