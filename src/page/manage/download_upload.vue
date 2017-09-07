<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link to="/manage/download"><i class="iconfont icon-back" aria-hidden="true"></i></router-link>
                    </div>
                    <h3 class="panel-title">资料上传</h3>
                    <p class="panel-subtitle">最多同时上传5个文件</p>
                </div>
                <div class="panel-body">
                    <dropzone id="myVueDropzone" :url="url+'tables/insertTables'" :maxFileSizeInMB="20">
                    </dropzone>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Dropzone from 'vue2-dropzone'
    export default {
        data() {
            return {
                url:this.url
            }
        },
        components: {
            Dropzone
        }
    }
</script>

<style scoped>
    a:hover {
        color: #d90a81
    }
</style>