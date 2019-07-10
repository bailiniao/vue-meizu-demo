<template>
    <div class="bg">
        <div class="box">
            <div class="title">
                <span>提示</span>
                <i
                    @click="closeBox"
                    style="float:right;margin-right:10px;margin-top:5px;cursor: pointer;"
                    class="icon-font icon-close"
                ></i>
            </div>
            <hr />
            <div class="txt">确定删除吗？</div>
            <div class="title">
                <button  @click="confirmDel" class="btn success">确定</button>
                <button  @click="closeBox" class="btn danger">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    props:{
        index:''
    },
    data() {
        return {
            boxShowData: false,
            confirmDelData:true
        };
    },
    methods: {
         ...mapMutations([
            "delGoods"
        ]),
        closeBox() {
            this.$emit("closeWindowBox", this.boxShowData);
        },
        confirmDel(){
            this.$emit("closeWindowBox", this.boxShowData);
            this.delGoods(this.index);
        }
    },
    mounted() {
        // console.log()
    }
};
</script>

<style lang="less" scoped>
.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(153, 153, 153, 0.6);

    .box {
        width: 400px;
        height: 300px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -150px;

        .title {
            text-align: center;
        }

        .txt {
            text-align: center;
            height: 150px;
            line-height: 150px;
        }
    }
}
</style>