<template>
    <div id="tag">
        <Header></Header>

        <!-- Main Content -->
         <!-- Main Content -->
        <header class="pt-5 border-bottom bg-light">
            <div class="container pt-md-1 pb-md-1">
                <h1 class="bd-title mt-4 font-weight-bold">
                    <i class="fa fa-book-open" aria-hidden="true"></i>
                     BERITA
                </h1>
                <p class="bd-lead">{{tag.message}}</p>
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
                    <router-link :to="{name: 'post'}" class="text-decoration-none">
                        <i class="fa fa-book-open"></i> Berita
                    </router-link>
                </li>
            </ol>
        </nav>
        <!-- End Breadcrumb -->

        <div class="container-fluid mt-5 mb-5">
            <div class="row">
                <div v-if="posts.length > 0" class="row">
                    <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
                        <div class="card h-100 shadow-sm border-0 rounded-lg">
                            <div class="card-img">
                                <img :src="post.foto" alt="Foto Berita" class="w-100"
                                style="height: 200px; object-fit: cover; border-top-left-radius: .rem;
                                border-top-right-radius: .3rem;">
                            </div>
                            <div class="card-body">
                                <router-link :to="{name: 'detail_post', params: {slug: post.slug}}"
                                class="text-dark text-decoration-none">
                                    <h6>{{post.title}}</h6>
                                </router-link>
                            </div>
                            <div class="card-footer">
                                <i class="fa fa-calendar" aria-hidden="true">
                                    {{ format_time(post.created_at) }}
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="alert alert-danger">
                        DATA BERITA TERBARU BELUM TERSEDIA!
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

        <Footer></Footer>
    </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    components: {
        Header,
        Footer
    },
    data(){
        return {
            posts : [],
            tag: [],
            moreExists: false,
            nextPage: 0
        }
    },
    methods: {
        getPostByTag(){
            axios.get(`tag/${this.$route.params.slug}`)
            .then(response => {
                this.tag = response.data.response
                this.posts = response.data.data.data

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
            axios.get(`tag/${this.$route.params.slug}?page=`+this.nextPage)
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
                    this.posts.push(data)
                })
            })
            .catch(response => {
                console.log(response)
            })
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler(){
                this.getPostByTag()
            }
        }
    }
}
</script>