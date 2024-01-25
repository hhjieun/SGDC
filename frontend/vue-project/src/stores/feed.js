import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useFeedStore = defineStore('feed', () => {

    const URI = 'http://localhost8080/feed';

    //게시물 한 개
    const feedGet = function(feedId){
        return new Promise((resolve, reject) => {
            axios
                .get(`${URI}/feed-info/${feedId}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //게시물 조회수 업데이트

    const feedViewUpdate = function (feedId) {


        return new Promise((resolve, reject) => {
            axios
                .patch(`${URI}/feed-views/${feedId}`)
                .then((res) => {
                    resolve(res)
                    console.log('조회수 +1')
                })
                .catch((err) => {
                    reject(err)
                })
        })
    };

    //게시물 리스트 조회
    const feedListGet = function(){
        return new Promise((resolve, reject) => {
            axios
                .get(`${URI}/feed-list`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //게시물 리스트(페이지 당 10개씩)
    const feedListPageGet = function(){
        return new Promise((resolve, reject) => {
            axios
                .get(`${URI}/feed-list/pages`)
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //피드 좋아요 업데이트
    const feedLikeUpdate = function (feedId) {


        return new Promise((resolve, reject) => {
            axios
                .patch(`${URI}/feed-like/${feedId}`)
                .then((res) => {
                    resolve(res)
                    console.log('좋아요 +1')
                })
                .catch((err) => {
                    reject(err)
                })
        })
    };

    //피드좋아요한 유저 추가
    const feedLikeUser = function (feedId, userId) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/feed-like/${feedId}/${userId}`,{} )
                .then((response) => {
                    resolve(response);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    };

    //피드 좋아요했다가 취소한 유저 삭제
    const feedLikeDeleteUser = function (feedId, userId) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL}/feed-like/${feedId}/${userId}`)
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
        feedGet,
        feedViewUpdate,
        feedListGet,
        feedListPageGet,
        feedLikeUpdate,
        feedLikeUser,
        feedLikeDeleteUser,






    }
  })