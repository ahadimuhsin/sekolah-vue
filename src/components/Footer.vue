<template>
    <footer>
        <div class="container-fluid" style="background: white;">
            <div class="row p-4">
                <div class="col-md-4">
                    <h5>TENTANG</h5>
                    <hr>
                    <p>
                        This example is a quick exercise to illustrate how the top-aligned navbar works. As you scroll, this navbar remains in its original position.
                    </p>

                </div>
                <div class="col-md-4">
                    <h5>TAGS</h5>
                    <hr>
                    <div v-if="tags.length > 0">
                        <router-link :to="{name: 'detail_tag', params: {slug: tag.slug}}"
                        v-for="tag in tags" :key="tag.id" class="btn btn-sm btn-outline-secondary mb-2 me-2">
                            {{ tag.name.toUpperCase() }}
                        </router-link>
                    </div>
                    <div v-else class="text-center">
                        <ListLoader></ListLoader>
                    </div>
                </div>
                <div class="col-md-4">
                    <h5>KONTAK</h5>
                    <hr>
                    <p>
                        <i class="fa fa-map-marker" aria-hidden="true"></i> This example is a quick exercise to illustrate how the top-aligned navbar works

                        <i class="fas fa-phone"></i> +62857-8585-2224
                    </p>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-dark">
            <div class="row p-3">
                <div class="text-center text-white font-weight-bold">
                    Copyright © 2020 SMK INDONESIA. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import {ListLoader} from 'vue-content-loader'
import axios from 'axios'
export default {
    name: 'Slider',
    components: {
        ListLoader
    },
    data(){
        return {
            tags: []
        }
    },
    created(){
        axios.get('/tag')
        .then(response => {
            this.tags = response.data.data.data
        });
    }
}
</script>