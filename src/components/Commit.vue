<template>
  <div class="wrapper">
    <div class="head_pic">
      <div class="star">
        <i
          v-for="item in 5"
          :key="item"
          :class="[
            'iconfont',
            'icon-aixin',
            'star_icon',
            score >= item ? 'active_star' : 'inactive_star',
          ]"
        ></i>
      </div>
      <div class="head_pic_wrapper">
        <img v-if="commentData?.isAnonymous" src alt />
        <i v-else :class="['iconfont', 'icon-anonymous']"></i>
      </div>
      <div v-if="!commentData?.isVip" class="head_vip">
        <span>超级会员</span>
      </div>
    </div>
    <div class="content">
      <div>{{ content }}</div>
      <span class="time">{{ time }}</span>
      <i class="zanCount">{{ zanCount }}</i>
      <i
        :class="['iconfont', 'icon-dianzan_kuai', 'zan', isZan ? 'isZan' : '']"
        @click="zan"
      ></i>
      <i class="commitChild">{{ commitCount }}</i>
      <i
        :class="['iconfont', 'icon-pinglun', 'commit']"
        @click="dialogVisible = !dialogVisible"
      ></i>
    </div>
  </div>
  <div :class="['content_children',dialogVisible?'height_change':'']">
    <el-input v-model="replyVal" :rows="4" type="textarea" />
    <div class="commit_btn">
      <el-button size="small" @click="commit">提交</el-button>
    </div>
    <template v-for="(item, index) in commentData?.children" :key="index">
      <div class="child_wrapper">
        <span class="child_name">{{ hideName(item.uid) + "：" }}</span>
        <span class="child_val">{{ item.val }}</span>
        <div class="child_time">{{ formatDate(item.time) }}</div>
      </div>
    </template>
  </div>
</template>
<script>
import { formatDate, hideName } from "../utils/util";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { commitChd, commitZan } from "../api/detail";
export default {
  name: "Commit",
  props: {
    commentData: {
      type: [Object, String],
      default: () => {},
    },
    jid: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      defalut: "",
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const replyVal = ref("");
    const dialogVisible = ref(false);
    const time = computed(() => {
      return formatDate(props.commentData.time) || "2022-01-03";
    });
    const commitCount = computed(() => {
      return props.commentData?.children?.length || 0;
    });
    const zanCount = computed(() => {
      return props.commentData?.zanCount || 0;
    });
    const content = computed(() => {
      return props.commentData?.val || props.commentData;
    });
    const score = computed(() => {
      return props.commentData?.score || 5;
    });
    const isZan = computed(() => {
      return props.commentData?.zanFroms?.includes(store.getters.userId);
    });
    const zan = () => {
      commitZan({
        jid: props.jid,
        category: props.category,
        toUid: props.commentData.uid,
        cid: props.commentData.cid,
      })
        .then((res) => {
          emit("refresh");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const commit = () => {
      const params = {
        jid: props.jid,
        cid: props.commentData.cid,
        category: props.category,
        val: replyVal.value,
      };
      commitChd(params)
        .then((res) => {
          emit("refresh");
          replyVal.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      time,
      commitCount,
      zanCount,
      content,
      score,
      zan,
      isZan,
      commit,
      replyVal,
      dialogVisible,
      formatDate,
      hideName,
    };
  },
};
</script>
<style lang="scss" scoped>
.active_star {
  color: red;
}
.inactive_star {
  color: rgba(0, 0, 0, 0.2);
}
.isZan {
  color: red !important;
}
.wrapper {
  display: flex;
  margin-bottom: 30px;
  color: #333;
  .head_pic {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .star {
      .star_icon {
        font-size: 20px;
      }
    }
    .head_pic_wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 30px;
        width: 30px;
      }
      i {
        color: gray;
        font-size: 30px;
      }
    }
    .head_vip {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: yellow;
      width: 60px;
      height: 18px;
      font-size: 12px;
      background-color: #414141;
    }
  }
  .content {
    flex: 5;
    .iconfont {
      font-size: 24px;
    }
    span,
    i {
      color: #999;
      font-size: 12px;
      position: relative;
      top: 20px;
    }
    i {
      float: right;
      cursor: pointer;
    }
    .zan {
      margin-left: 30px;
    }
    .zanCount,
    .commitChild {
      font-size: 16px;
      margin-left: 5px;
    }
  }
}
.height_change{
  height: 200px !important;
}
.content_children {
  transition: height 1s;
  padding-left: 160px;
  height: 0;
  // overflow: hidden;
  overflow-y: auto;
  .commit_btn {
    margin-top: 10px;
    float: right;
  }
  .child_wrapper:nth-child(3) {
    margin-top: 50px !important;
  }
  .child_wrapper:last-child{
    margin-bottom: 20px;
  }
  .child_wrapper {
    margin-top: 10px;
    .child_name {
      color: #005ea7;
      font-size: 16px;
      font-weight: 600;
    }
    .child_val {
      word-wrap: break-word;
      word-break: break-all;
    }
    .child_time {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.content_children::-webkit-scrollbar {
  width: 4px;
}
.content_children::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.content_children::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>