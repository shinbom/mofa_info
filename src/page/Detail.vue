<template>
    <main id="detail">
        <div class="wrap">
            <header>
                <div class="left_box">
                    <div class="loading figure" v-if="loadingStatus"></div>
                    <figure v-else>
                        <img :src="`${this.countryInfomation.imageUrl}`" alt="">
                    </figure>
                    <div class="loading" v-if="loadingStatus"></div>
                    <h3 v-else>{{this.countryInfomation.country_name}}</h3>
                </div>
                <div class="right_box">
                    <ul class="info_list">
                        <li>
                            <span class="title">언어정보</span>
                            <span class="loading" v-if="loadingStatus"></span>
                            <span class="desc" v-else>{{this.countryInfomation.language }}</span>
                        </li>
                        <li>
                            <span class="title">기후정보</span>
                            <span class="loading" v-if="loadingStatus"></span>
                            <span class="desc" v-else>{{this.countryInfomation.climateInfo}}</span>
                        </li>
                        <li>
                            <span class="title">환율</span>
                            <span class="loading" v-if="loadingStatus"></span>
                            <span class="desc" v-else>{{this.countryInfomation.price}}</span>
                        </li>
                    </ul>
                    <div class="loading" v-if="loadingStatus"></div>
                    <ul class="btn_lists" v-else>
                        <li>
                            <button type="button" @click="activeModalIndex(0, {title: `${countryInfomation.country_name} 결제 정보`, written_dt : undefined, txt_origin_cn :  `${countryInfomation.usageInfo}`})">결제 정보</button>
                        </li>
                        <li>
                            <button type="button" @click="activeModalIndex(0, {title: `${countryInfomation.country_name} 체류 정보`, written_dt : undefined, txt_origin_cn : `${countryInfomation.visitInfo}`})">체류 정보</button>
                        </li>
                        <li>
                            <button type="button" @click="activeModalIndex(0, {title: `${countryInfomation.country_name} 비상사태 발생시 정보`, written_dt : undefined, txt_origin_cn : `${countryInfomation.emergencyInfo}`})">비상사태 발생시 정보</button>
                        </li>
                        <li>
                            <button type="button" @click="activeModalIndex(0, {title: `${countryInfomation.country_name} 인터넷 환경 정보`, written_dt : undefined, txt_origin_cn : `${countryInfomation.internetStatus}`})">인터넷 환경 정보</button>
                        </li>
                    </ul>
                </div>
            </header>
            <div>
                <section>
                    <h4>{{this.countryInfomation.country_name}} 한국발 입국자 조치</h4>
                    <div class="loading" v-if="loadingStatus"></div>
                    <div v-else>
                        <p v-if="this.countryInfomation.covidNotice.length == 0" class="not_work">{{this.countryInfomation.country}} 한국발 입국자 조치가 없습니다.</p>
                        <ul v-else>
                            <li v-for="(item, index) in this.countryInfomation.covidNotice" :key="index">
                                <button type="button" @click="activeModalIndex(index)">{{item}}</button>
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h4>{{this.countryInfomation.country_name}} 안전공지</h4>
                    <div class="loading" v-if="loadingStatus"></div>
                    <div v-else>
                        <p v-if="this.countryInfomation.safetyNotice.length == 0" class="not_work">{{this.countryInfomation.country}} 안전공지가 없습니다.</p>
                        <ul v-else>
                            <li v-for="(item, index) in this.countryInfomation.safetyNotice[0]" :key="index">
                                <button type="button" @click="activeModalIndex(index, countryInfomation.safetyNotice[0][index])">
                                    <span class="title">{{item.title}}</span>
                                    <span class="date">{{item.wrt_dt}}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <Modal v-if="modalStatus"></Modal>
    </main>
</template>

<script>
import axios from 'axios';
import Modal from '../components/Modal.vue';
import {apiServiceKey} from '../router/apiInfo';
import {mapState, mapMutations} from 'vuex';

export default {
    name : 'Detail',
    data () {
        return {
            countryInfomation : {
                country_name : this.$route.query.country_name,
                country_en : this.$route.query.country_en,
                imageUrl : '',
                language : '',
                climateInfo : '',
                price : '',
                usageInfo : '',
                visitInfo : '',
                emergencyInfo : '',
                internetStatus : '',
                covidNotice :[], 
                safetyNotice : [],
            },
            loadingStatus : true
        }
    },
    components :{
        Modal,
    },
    computed :{
      ...mapState(['modalContent', 'modalStatus', 'selectedIndex']),
    },
    created () {
        axios.get(`/B410001/natnInfoService/natnInfo?${apiServiceKey}&type=json&isoWd2CntCd=${this.countryInfomation.country_en}`)
        .then((response) => {
            const getCountryData = response.data;
            this.countryInfomation.language = getCountryData.items[0].langNm; // 언어정보
            this.countryInfomation.climateInfo = getCountryData.items[0].clmtCntnt; // 기후정보
            this.countryInfomation.price = getCountryData.items[0].critEhgtPrcs; // 환율
            this.countryInfomation.usageInfo = getCountryData.items[0].crtcdUsageCntnt; // 결제관련 정보
            this.countryInfomation.visitInfo = getCountryData.items[0].drvlsAcqsMthCntnt; // 체류정보
            this.countryInfomation.emergencyInfo = getCountryData.items[0].emgcyCntmsCheatCntnt; // 비상사태 발생시 정보
            this.countryInfomation.internetStatus = getCountryData.items[0].innetWifiCntnt; // 인터넷 환경 정보
            this.loadingStatus = false
        })
        .catch((error) => {
            console.log(`국가정보를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가 정보 및 지도 데이터 요청
        axios.get(`/1262000/CountryFlagService2/getCountryFlagList2?${apiServiceKey}&numOfRows=10&cond[country_iso_alp2::EQ]=${this.countryInfomation.country_en}`)
        .then((response) =>  {
            let countryFlag = response.data.data[0];
            this.countryInfomation.country = countryFlag.country_nm;
            this.countryInfomation.imageUrl = countryFlag.download_url;
        })
        .catch((error) => {
            console.log(`국가를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가 별 한국발 입국자 조치 데이터 요청
        axios.get(`/1262000/CountryKoreaDepartureService/getCountryKoreaDepartureList?${apiServiceKey}&returnType=JSON&numOfRows=10&cond[country_iso_alp2::EQ]=${this.countryInfomation.country_en}`).then((response) => {
        let covidNoticeList = response.data.data;
        if ( covidNoticeList.length > 0 ) {
            this.countryInfomation.covidNotice.push(covidNoticeList);
        }
        })
        .catch ((error) => {
            console.log(`국가별 한국발 입국자 조치를 불러오는 데 실패하였습니다. : ${error}`);
        })

        // 국가별 안전공지 데이터 요청
        axios.get(`/1262000/CountrySafetyService3/getCountrySafetyList3?${apiServiceKey}&returnType=JSON&numOfRows=10&cond[country_iso_alp2::EQ]=${this.countryInfomation.country_en}`).then((response) => {
            let safetyNoticeList = response.data.data;
            this.countryInfomation.safetyNotice.push(safetyNoticeList);
        })
        .catch ((error) => {
            console.log(`안전공지를 불러오는 데 실패하였습니다. : ${error}`);
        })
    },
    methods : {
         ...mapMutations(['activeModal']),

        activeModalIndex(index, data) {
            this.$store.commit('activeModal', {
                selectedIndex : index, 
                contents : {
                    title : data.title,
                    writtenDate : data.wrt_dt,
                    text : data.txt_origin_cn 
                }
            });
        }
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
            .loading.figure{
                padding-top:65%;
            }
            figure{
                position:relative;
                height:0;
                padding-top:65%;
                img{
                    position:absolute;
                    top:50%;
                    left:50%;
                    height:100%;
                    transform:translate(-50%, -50%);
                }
            }
            h3{
                margin-top:10px;
                text-align:center;
            }
        }
        .right_box{
            flex :3;
            .info_list {
               li {
                    padding:10px 0;
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
                    &:first-child{
                        padding-top:0;
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
    @media screen and (min-width : 768px) and (max-width : 1024px) {
        header{
                display:block;
                .left_box{
                    margin-right:0;
                    margin-bottom:20px;
                    .loading.figure{
                        width:40%;
                        margin:0 auto;
                        padding-top:30%;
                    }
                    figure{
                        padding-top:25%;
                    }
                }
                .right_box{
                    .btn_lists{
                        justify-content: center;
                    }
                }
            }
            section{
                padding:15px;
            }
    }
    @media screen and (max-width : 767px){
        header{
            display:block;
            .left_box{
                margin-right:0;
                margin-bottom:20px;
            }
            .right_box{
                .btn_lists{
                    justify-content: center;
                }
            }
        }
        section{
            padding:15px;
        }
    }

    
</style>