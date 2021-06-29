<template>
    <div id="video">
        <Header></Header>

        <!-- Main Content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container pt-md-1 pb-md-1">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-video" aria-hidden="true"></i>
                     Video
                </h1>
                <p class="bd-lead">Video terbaru tentang SMK Indonesia</p>
            </div>
        </header>

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'home'}" class="text-decoration-none">
                        <i class="fa fa-home"></i> Home
                    </router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'video'}" class="text-decoration-none">
                        <i class="fa fa-video"></i> Video
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- End Breadcrumb -->

        <div class="container-fluid mt-5 mb-5">
            <div class="row">
                <div v-if="videos.length > 0" class="row">
                    <div class="col-md-6 mb-4" v-for="video in videos" :key="video.id">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <div class="card-img">
                                <iframe :src="video.embed"
                                style="width:100%; height: 300px; object-fit: cover; border-top-left-radius: .3rem;
                                border-top-right-radius: .3rem; border: 0" :title="video.title"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                                </iframe>
                            </div>
                            <div class="card-body text-center">
                                <h6>{{video.title}}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col-md-4 mb-3" v-for="loader in videos_loader" :key="loader">
                        <div class="card border-0 shadow-sm rounded-lg">
                            <div class="card-body p-2">
                                <ContentLoader></ContentLoader>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center" v-show="moreExists">
                    <button type="button" class="btn btn-primary btn-md"
                    @click="loadMore">
                        <span class="fa fa-arrow-down"></span>
                         More
                    </button>
                </div>
            </div>
        </div>
        <!-- End Main Content -->
        <Footer></Footer>
    </div>
</template>

<script>
import {
    ContentLoader
} from 'vue-content-loader'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    name: 'videoIndex',
    components: {
        ContentLoader,
        Header,
        Footer
    },
    data(){
        return {
            videos: [],
            videos_loader: 4,
            moreExists: false,
            nextPage: 0
        }
    },
    mounted(){
        this.getVideos()
    },
    methods: {
        getVideos()
        {
            axios.get('video')
            .then(response => {
                this.videos = response.data.data.data
                if(response.data.data.current_page < response.data.data.last_page)
                {
                    this.moreExists = true
                    this.nextPage = response.data.data.current_page + 1
                }
                else{
                    this.moreExists = false
                }
            })
            .catch(response => {
                console.log(response)
            })
        },
        loadMore(){
            axios.get(`video?page=`+this.nextPage)
            .then(response => {
                if(response.data.data.current_page < response.data.data.last_page)
                {
                    this.moreExists = true
                    this.nextPage = response.data.data.current_page + 1
                }
                else{
                    this.moreExists = false
                }
                //push data baru ke array
                response.data.data.data.forEach(data => {
                    this.videos.push(data)
                })
            })
            .catch(response => {
                console.log(response)
            })
        }
    }
}
</script>