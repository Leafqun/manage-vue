<template>
    <!-- MAIN CONTENT -->
    <div class="main-content" style="margin-top:20px;">
        <div class="container-fluid">
            <!-- OVERVIEW -->
            <div class="panel panel-headline">
                <div class="panel-heading" style="overflow: hidden">
                    <div style="float: right;">
                        <router-link :to="{name:'course_file_manage',params:{courseId:$route.params.courseId}}"><i class="iconfont icon-back" aria-hidden="true"></i></router-link>
                    </div>
                    <h3 class="panel-title">{{headline}}</h3>
                    <p class="panel-subtitle">最多同时上传5个文件</p>
                </div>
                <div class="panel-body">
                    <dropzone id="myVueDropzone" :url="url+'course/insertCourseFile'" :maxFileSizeInMB="20" :maxNumberOfFiles="10">
                        <!-- Optional parameters if any! -->
                        <input type="hidden" name="ctype" v-model="type">
                        <input type="hidden" name="courseId" v-model="$route.params.courseId">
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
        },
        computed:{
          headline:function () {
              if(this.$route.params.ctype == 1){
                  return "课程资源上传"
              }else{
                  return "课程视频上传"
              }
          },
           type:function () {
               return this.$route.params.ctype
           }
        }
    }
</script>

<style scoped>
    a:hover {
        color: #d90a81
    }
</style>