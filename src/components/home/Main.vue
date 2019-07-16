<!-- html部分 -->
<template>
	<div style="height: 100%;">
		<!-- tags标签 -->
		<div style="text-align: left;height: 32px;line-height: 32px;">
			<el-tag v-for="(tag,index) in $store.state.tags" :key="tag.name" closable :type="tag.type" style='margin-right: 10px;' @click='fn(tag,index)' @close='del(tag,index)'>
				{{tag.name}}
			</el-tag>
		</div>
		<!-- 主视图 -->
		<router-view/>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			fn(tag,index){
				//路由跳转
				this.$router.push({path:tag.url});
				//执行点击更新方法
				this.$store.commit('updateTag',index);
				//更改defaultIndex
				this.$store.state.defaultIndex = tag.index;
			},
			del(tag,index){
				if(this.$store.state.tags.length==1){
					this.$message('最后一个标签不能被删除');
				}else{
					//关闭的是否是当前type
					var flag = this.$store.state.tags[index].type=='warning';
					//删除tag
					this.$store.commit('delTag',index);
					if(flag){
						if(index==0){
							this.$store.commit('updateTag',0);
							this.$router.push({path:this.$store.state.tags[0].url});
						}else{
							this.$store.commit('updateTag',index-1);
							this.$router.push({path:this.$store.state.tags[index-1].url});
						}
					}
				}
			}
		}
	}
</script>
<!-- css部分 -->
<style>

</style>
