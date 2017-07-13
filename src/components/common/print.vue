<template>
  <!-- 打印 -->
  <div>
    <p :align="btnAlign" style="padding-bottom:16px;">
      <el-button type="info" size="small" @click="printContent">打印</el-button>
    </p>
    <div class="printContent" id="printContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 打印按钮位置 left,center,right
      btnAlign: {
        type: String,
        default: 'right'
      },
      // 打印之后返回的数据集
      operailityData: {
        default: () => {}
      },
    },
    methods: {
      // 打印
      printContent() {
        let printContent = document.getElementById('printContent');
        let printContentBox = document.getElementById('printContentBox');
        if (!printContentBox) {
          printContentBox = document.createElement('div');
          printContentBox.setAttribute('id', 'printContentBox');
        }
        printContentBox.innerHTML = printContent.innerHTML;
        document.body.appendChild(printContentBox)
        if (this.getExplorer() == "IE") {　　　　
          this.pageSetupUull();　
        }
        window.print();
        this.$emit('print', this.operailityData);
      },
      /**
       * 对IE设置打印预览
       */
      pageSetupUull() {
        var hkey_root, hkey_path, hkey_key;
        hkey_root = "HKEY_CURRENT_USER";
        hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        try {
          var RegWsh = new ActiveXObject("WScript.Shell");
          hkey_key = "header";
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
          hkey_key = "footer";
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        } catch (e) {}
      },
      // 获取浏览器类型
      getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie 
        if (explorer.indexOf("MSIE") >= 0) {
          return "IE";
        }
        //firefox 
        else if (explorer.indexOf("Firefox") >= 0) {
          return "Firefox";
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
          return "Chrome";
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
          return "Opera";
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
          return "Safari";
        }
      }
    }
  }

</script>

<style>
  /* 打印 */

  #printContentBox {
    display: none;
  }

  @media print {
    #app,
    .el-message {
      visibility: hidden;
    }
    #printContentBox {
      /* width: 1000px; */
      display: block;
      z-index: -9999;
    }
    @page {
      size: auto;
      /* 边距 */
      margin: 5mm 16mm;
    }
  }

</style>
