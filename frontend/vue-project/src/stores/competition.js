import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { serverURL, v1_URL } from '@/main.js';


export const useCompetionStore = defineStore('competition', () => {
    const URL = serverURL + v1_URL + 'compet';
    const URL2 = serverURL  + v1_URL;

    
    //랜덤도전장보내기
    const randomSend = function (randomSend) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/random-send`, randomSend)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };


    //랜덤도전장수락하기
    const randomAccept = function (randomAccept) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/random-accept`, randomAccept)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };
    //친구에게 도전장 보내기
    const friendSend = function (friendSend) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/friend-send`, friendSend)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };
    //친구도전장 수락하기
    const friendAccept = function (friendAccept) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/friend-send`, friendAccept)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };
    //도전장함
    const competitionMailbox = function (userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL}/list/${userId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };
    
    //경쟁인증
    const competitionImage = function (image) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/image-auth`, image)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //종료 경쟁 목록 조회
    const competitionFinish = function (userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL}/finish-compet-list/${userId}`)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err)
                    reject(err);
                });
        })
    };

    //종료 경쟁 정보 상세 조회
    const competitionFinishDetail = function (userId, cometId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL}/finish-compet-datil/${userId}/${cometId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //경쟁모드인증현황
    const competitionProgressDetail = function (userId, cometId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL}/progress-compet-detail/${userId}/${cometId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };


    //친구 리스트 조회
    const competitionFriendList = function (userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL2}/friend/list/${userId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //사용자경쟁모드 분석
    const competitionAnalysis = function (userId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL}/analysis/${userId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };
    return {
        randomSend,
        randomAccept,
        friendSend,
        friendAccept,
        competitionMailbox,
        competitionImage,
        competitionFinish,
        competitionFinishDetail,
        competitionProgressDetail,
        competitionFriendList,
        competitionAnalysis,
    };
})