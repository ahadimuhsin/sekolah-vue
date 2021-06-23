<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style="border-top: 5px solid rgb(175, 140, 226);">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{name: 'home'}"><i class="fa fa-graduation-cap" aria-hidden="true"></i> SMK INDONESIA</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'post'}">
                            <i class="fa fa-book-open" aria-hidden="true"></i> 
                            BERITA
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'event'}">
                            <i class="fa fa-calendar" aria-hidden="true"></i> 
                            AGENDA
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'photo'}">
                            <i class="fa fa-image" aria-hidden="true"></i> 
                            GALERI
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'video'}">
                            <i class="fa fa-video" aria-hidden="true"></i> 
                            VIDEO
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'contact'}">
                            <i class="fa fa-phone" aria-hidden="true"></i> 
                            
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header'
}
</script>