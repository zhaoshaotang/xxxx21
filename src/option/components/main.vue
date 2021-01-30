<!-- 通用配置-->
<template>
  <div>
    <!-- 折叠公共配置 -->
    <el-collapse accordion>
      <!-- 标题设置 -->
      <template v-if="main.vaildProp('titleList')">
        <el-collapse-item title="标题设置">
          <el-form-item label="标题">
            <avue-switch v-model="main.activeOption.titleShow"></avue-switch>
          </el-form-item>
          <el-form-item label="标题">
            <avue-input v-model="main.activeOption.title"></avue-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-input-color v-model="main.activeOption.titleColor"></avue-input-color>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.titleFontSize"></avue-input-number>
          </el-form-item>
          <el-form-item label="字体位置">
            <avue-select v-model="main.activeOption.titlePostion"
                         :dic="dicOption.textAlign">
            </avue-select>
          </el-form-item>
          <el-form-item label="副标题">
            <avue-input v-model="main.activeOption.subtext"></avue-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-input-color v-model="main.activeOption.subTitleColor"></avue-input-color>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.subTitleFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 柱图文字设置 -->
      <template v-if="main.vaildProp('labelList')">
        <el-collapse-item title="柱图文字设置">
            <el-form-item label="轴颜色">
              <avue-input-color v-model="main.activeOption.lineColor">
              </avue-input-color>
            </el-form-item>
            <el-form-item label="显示">
              <avue-switch v-model="main.activeOption.labelShow">
              </avue-switch>
            </el-form-item>
            <el-form-item label="字体大小">
              <avue-input-number v-model="main.activeOption.labelShowFontSize">
              </avue-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <avue-input-color v-model="main.activeOption.labelShowColor">
              </avue-input-color>
            </el-form-item>
            <el-form-item label="字体粗细">
              <avue-select v-model="main.activeOption.labelShowFontWeight" :dic="dicOption.fontWeight">
              </avue-select>
            </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="分割线样式">
          <el-form-item label="显示X轴网格线">
            <avue-switch v-model="main.activeOption.xAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="显示Y轴网格线">
            <avue-switch v-model="main.activeOption.yAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="线宽度">
            <avue-input-number v-model="main.activeOption.splitLine.width">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="线颜色">
            <avue-input-color v-model="main.activeOption.splitLine.color">
            </avue-input-color>
          </el-form-item>
          <el-form-item label="线样式">
            <avue-input-color v-model="main.activeOption.splitLine.type">
            </avue-input-color>
          </el-form-item>	
          <el-form-item label="线阴影">
            <avue-input-number v-model="main.activeOption.splitLine.shadowBlur">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="线阴影色">
            <avue-input-color v-model="main.activeOption.splitLine.shadowColor">
            </avue-input-color>
          </el-form-item>
          <el-form-item label="阴影X轴偏移">
            <avue-input-number v-model="main.activeOption.splitLine.shadowOffsetX">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="阴影Y轴偏移">
            <avue-input-number v-model="main.activeOption.splitLine.shadowOffsetY">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="分割线透明度">
            <avue-slider v-model="main.activeOption.splitLine.opacity">
            </avue-slider>
          </el-form-item>
        </el-collapse-item>
      </template>

      <!-- 轴设置 -->
      <template v-if="main.vaildProp('barList')">
        <el-collapse-item title="X轴设置">
          <el-form-item label="名称">
            <avue-input v-model="main.activeOption.xAxisName">
            </avue-input>
          </el-form-item>
          <el-form-item label="显示">
            <avue-switch v-model="main.activeOption.xAxisShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="标签间距">
            <avue-switch v-model="main.activeOption.xAxisinterval">
            </avue-switch>
          </el-form-item>
          <el-form-item label="文字角度">
            <avue-switch v-model="main.activeOption.xAxisRotate">
            </avue-switch>
          </el-form-item>
          <el-form-item label="轴反转">
            <avue-switch v-model="main.activeOption.xAxisInverse">
            </avue-switch>
          </el-form-item>
          <el-form-item label="字号">
            <avue-input-number v-model="main.activeOption.xNameFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Y轴设置">
          <el-form-item label="名称">
            <avue-input v-model="main.activeOption.yAxisName">
            </avue-input>
          </el-form-item>
          <el-form-item label="显示">
            <avue-switch v-model="main.activeOption.yAxisShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="反转">
            <avue-switch v-model="main.activeOption.yAxisInverse">
            </avue-switch>
          </el-form-item>
          <el-form-item label="字号">
            <avue-input-number v-model="main.activeOption.yNameFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 提示语设置  -->
      <template v-if="main.vaildProp('tipList')">
        <el-collapse-item title="提示语设置">
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.tipFontSize"></avue-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-input-color v-model="main.activeOption.tipColor"></avue-input-color>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 轴距离设置 -->
      <template v-if="main.vaildProp('postionList')">
        <el-collapse-item title="坐标轴边距设置">
          <el-form-item label="左边距(像素)">
            <avue-slider v-model="main.activeOption.gridX" :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="顶边距(像素)">
            <avue-slider v-model="main.activeOption.gridY" :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="右边距(像素)">
            <avue-slider v-model="main.activeOption.gridX2" :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="底边距(像素)">
            <avue-slider v-model="main.activeOption.gridY2" :max="400"></avue-slider>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 图例设置 -->
      <template v-if="main.vaildProp('legendList')">
        <el-collapse-item title="图例操作">
          <el-form-item label="图例">
            <avue-switch v-model="main.activeOption.legend"></avue-switch>
          </el-form-item>
          <el-form-item label="位置">
            <avue-select v-model="main.activeOption.legendPostion" :dic="dicOption.textAlign">
            </avue-select>
          </el-form-item>
          <el-form-item label="布局朝向">
            <avue-select v-model="main.activeOption.legendOrient" :dic="dicOption.orientList">
            </avue-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.legendFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 颜色设置 -->
      <template v-if="main.vaildProp('colorList')">
        <el-collapse-item title="自定义配色">
          <el-form-item label="文字颜色">
            <avue-input-color v-model="main.activeOption.nameColor">
            </avue-input-color>
          </el-form-item>
          <el-form-item label="轴线颜色">
            <avue-input-color v-model="main.activeOption.lineColor"></avue-input-color>
          </el-form-item>
          <avue-crud :option="colorOption" :data="main.activeOption.barColor"
                     @row-save="rowSave"
                     @row-del="rowDel"
                     @row-update="rowUpdate"></avue-crud>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption, colorOption } from '@/option/config'
export default {
  inject: ["main"],
  data () {
    return {
      dicOption: dicOption,
      colorOption: colorOption
    }
  },
  methods: {
    rowSave (row, done) {
      this.main.activeOption.barColor.push(row)
      done()
    },
    rowDel (row, index) {
      this.main.activeOption.barColor.splice(index, 1)
    },
    rowUpdate (row, index, done) {
      this.main.activeOption.barColor.splice(index, 1, row)
      done()
    },
  }
}
</script>

<style>
</style>