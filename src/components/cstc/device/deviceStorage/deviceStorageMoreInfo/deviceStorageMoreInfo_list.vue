<template>
  <!-- 设备详细资料 -->
  <div>
    <el-collapse v-model="activeNames" accordion class="tableMoreInfo">
      <el-collapse-item v-for="item in rowDatas" :key="item.id" :name="item.id">
        <template slot="title">
          <div class="tableMoreInfoTitle">
            <span>设备编号：{{ item.deviceIdentifier }}</span>
            <span>单价：{{ item.price | money }}</span>
            <span>使用次数：{{ item.useTime || 0 }}</span>
            <span>设备状态：{{ item.status | typeText }}</span>
          </div>
        </template>
        <keep-alive>
          <el-row>
            <el-col :span="18">
              <el-form :inline="true" :model="item" label-width="84px">
                <el-col :span="8">
                  <el-form-item label="设备编号：">
                    <el-input v-model="item.deviceIdentifier" placeholder="请输入" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生产日期：">
                    <el-date-picker v-model="item.manufactureDate" type="date" placeholder="选择日期" size="small">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保修截止：">
                    <el-date-picker v-model="item.guaranteeDate" type="date" placeholder="选择日期" size="small">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="单价：">
                    <el-input v-model="item.price" @blur="formatRMB(item)" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="使用次数：">
                    <el-input v-model="item.useTime" placeholder="使用次数" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="设备状态：">
                    <el-select v-model="item.status" placeholder="请选择" size="small">
                      <el-option v-for="item in stateOption" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="存放地点：">
                    <el-input v-model="item.storageLocation" placeholder="设备位置" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="设备描述：" class="describeBox">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="设备描述" v-model="item.describes"></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
            <el-col :span="6" align="center">
              <el-col :span="18">
                <img :src="'/api/file/download/'+item.qrcode" class="qrImg">
              </el-col>
              <el-col :span="6">
                <div>
                  <p>
                    <el-button type="success" size="small" @click="save(item)">保存</el-button>
                  </p>
                  <p>
                    <!--<el-button type="warning" size="small" @click="edit(item.id)">修改</el-button>-->
                    <el-button type="warning" size="small" @click="edit(item)">修改</el-button>
                  </p>
                  <p>
                    <el-button type="danger" size="small" @click="remove(item.id)">删除</el-button>
                  </p>

                  <p>
                    <!--<el-button type="info" size="small" @click="show(item.id)">详情</el-button>-->
                    <el-button type="info" size="small" @click="show(item)">详情</el-button>
                  </p>

                </div>
              </el-col>
            </el-col>
          </el-row>
        </keep-alive>
      </el-collapse-item>
    </el-collapse>

    <!-- 模态框 编辑（edit） -->
    <Modal :mask-closable="false" v-model="editModal" height="200" title="对话框标题" class-name="vertical-center-modal" :width="1100">
      <modal-header slot="header" :content="button.editId"></modal-header>
      <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :id="todoId"></edit>
      <!--<edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData" :url-params="api.modify"></edit>-->
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 查看（view） -->
    <Modal :mask-closable="false" v-model="showModal" height="200" title="对话框标题" class-name="vertical-center-modal" :loading="true"
      :width="800">
      <modal-header slot="header" :parent="self" :content="button.showId"></modal-header>
      <show v-if="showModal" @cancel="cancel" :id="todoId"></show>
      <!--<show v-if="showModal" @cancel="cancel" :operailityData="operailityData"></show>-->
      <div slot="footer"></div>
    </Modal>
    <!-- 模态框 删除（del） -->
    <Modal close-on-click-modal="false" height="200" v-model="removeModal" title="对话框标题" class-name="vertical-center-modal" :loading="loading"
      :width="500">
      <modal-header slot="header" :content="button.removeId"></modal-header>
      <remove v-if="removeModal" :deleteUrl="api.delete" @remove="subCallback" @cancel="cancel" :operaility-data="operailityData"></remove>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  let Util = null;

  // 设备状态
  import stateOption from '../stateOption';

  // API
  import api from './api';

  // 模态框
  import edit from './deviceStorageMoreInfo_edit'; // 编辑
  import show from './deviceStorageMoreInfo_view'; // 查看

  export default {
    props: {
      rowData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        self: this,
        activeNames: [], // 视图激活
        stateOption, // 设备状态
        operailityData: '',
        api,
        //* 按钮 *//
        loading: false,
        // saveModal: false,
        button: {
          addId: {
            id: 'addId',
            title: '新建设备信息'
          },
          showId: {
            id: 'showId',
            title: '查看设备信息'
          },
          editId: {
            id: 'editId',
            title: '修改设备信息'
          },
          removeId: {
            id: 'removeId',
            title: '删除设备信息'
          },
        },
        todoId: ''
      }
    },
    methods: {
      // 保存
      save(obj) {
        obj = this.formDate(obj, ['manufactureDate', 'guaranteeDate'], this.yearMonthData)
        this.ajax({
          type: 'edit',
          successTitle: '保存成功!',
          errorTitle: '保存失败!',
          ajaxParams: {
            url: api.modify.path + obj.id,
            method: api.modify.method,
            data: obj
          }
        })
      },

      // 转换为保留两位小数
      formatRMB(item) {
        if (!isNaN(item.price)) {
          item.price = (+item.price).toFixed(2)
          console.log(item.price)
        } else {
          item.price = '0.00'
        }
      },
      /*----------- 模态框 -------------*/
      // 增加
      add() {
        this.openModel('add')
      },
      // 编辑
      edit(row) {
        this.todoId = row.id;
        // this.operailityData = row;
        this.openModel('edit');
      },
      // 查看
      show(row) {
        this.todoId = row.id;
        // this.operailityData = row;
        this.openModel('show');
      },
      // 取消
      cancel(targer) {
        this[targer + 'Modal'] = false;
      },
      // 删除
      /*--点击--删除--按钮--*/
      remove(id) {
        this.operailityData = [{
          id
        }];
        this.openModel('remove')
      },
      // 回调
      subCallback(target, title, updata) {
        this.cancel(target);
        this.$emit('edit', target, title, updata)
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options) {
        this[options + 'Modal'] = true;
      },
    },
    components: {
      edit,
      show
    },
    computed: {
      rowDatas() {
        let rowData = this.rowData;
        for (let i = 0; i < rowData.length; i++) {
          this.formatRMB(rowData[i])
        }
        return rowData
      },
    },
    created() {
      Util = this.$util;
    }
  }

</script>

<style lang="scss">
  @import '../../../../../assets/ambuf/css/manage_v1.0/tableMoreInfo';

</style>
