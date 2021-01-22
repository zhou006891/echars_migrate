<template>
  <div class="home" ref="home" @keyup.f11="KeyUpF11">
    <div class="ditu"></div>
    <span class="project_display">项目分布展示图</span>
    <span class="project_display_english">PROJECT DISTRIBUTION DIAGRAM</span>
    <span class="szcity">苏州市</span>
    <div id="jiangsu" class="jiangsu"></div>
  </div>
</template>

<script>
import jiangsu from '../assets/长三角(2).json' 
export default {
  name: 'Home',
  data() {
    return {
      flag: false,
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.initLoad()
  },
  methods: {
     resize() { 
      this.$echarts.init(document.getElementById("jiangsu")).resize();
      this.initLoad();
    },
    initLoad() {
      this.$echarts.registerMap('jiangsu', jiangsu) // 如果是js引入就不需要这一行了
      let chart = this.$echarts.init(document.getElementById('jiangsu'))
      let geoCoordMap = {
        安徽点1: [116.573, 33.094],
        安徽点2: [117.732, 31.544],
        安徽点3: [118.522, 30.92],
        浙江点1: [119.711, 30.085],
        浙江点2: [119.831, 28.496],
        浙江点3: [121.451, 29.165],
        浙江点4: [121.599, 29.995],
        上海点1: [121.75, 31.0],
        苏州: [120.981585, 31.310379], //必须写 不然报错，  series item[0]里 有引用, item[0].concat([10])  将颜色标到最高
        上海点2: [121.561, 30.765],
        江苏省点1: [121.856, 31.6],
        江苏省点2: [121.246, 32.05],
        江苏省点3: [119.29, 33.33],
      }

      let hjDatas = [
        [
          {
            name: '安徽点1',
            value: 3,
          },
        ],
        [
          {
            name: '安徽点2',
            value: 1,
          },
        ],
        [
          {
            name: '安徽点3',
            value: 3,
          },
        ],
        [
          {
            name: '浙江点1',
            value: 4,
          },
        ],
        [
          {
            name: '浙江点2',
            value: 1,
          },
        ],

        [
          {
            name: '浙江点3',
            value: 2,
          },
        ],
        [
          {
            name: '浙江点4',
            value: 2,
          },
        ],
        [
          {
            name: '上海点1',
            value: 1,
          },
        ],

        [
          {
            name: '上海点2',
            value: 2,
          },
        ],
        [
          {
            name: '江苏省点1',
            value: 1,
          },
        ],
        [
          {
            name: '江苏省点2',
            value: 2,
          },
        ],
        [
          {
            name: '江苏省点3',
            value: 3,
          },
        ],
      ]

      let convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var toCoord = geoCoordMap[dataItem[0].name]
          var fromCoord = [120.981585, 31.310379]
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value,
              },
              {
                coord: toCoord,
              },
            ])
          }
        }
        return res
      }

      let series = []
      ;[['苏州', hjDatas]].forEach(function(item) {
        series.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 15, //图标大小
            },
            lineStyle: {
              normal: {
                width: 3, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.1, //尾迹线条曲直度
              },
            },
            data: convertData(item[1]),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              scale: 3, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: false,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  return params.data.name
                },
                fontSize: 16,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: 'circle',
            symbolSize: function(val) {
              return 5 + val[2] * 1.5 //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
              },
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
              }
            }),
          },
          //被攻击点
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,

            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 2,
            },
            label: {
              normal: {
                show: false,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  return params.data.name
                },
                fontSize: 16,
              },
              emphasis: {
                // show: true
              },
            },
            symbol: 'circle',
            symbolSize: function(val) {
              return 2 + val[2] * 1.5 //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: '#0f0',
              },
            },
            data: [
              {
                name: item[0],
                value: geoCoordMap[item[0]].concat([8]),
              },
            ],
          }
        )
      })
      let option = {
        visualMap: {
          //图例值控制
          min: 0,
          max: 6,
          calculable: true,
          show: false,
          color: ['#FF2A00', '#9FFDFF', '#9FFDFF', '#9FFDFF', '#9FFDFF'],
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'jiangsu',

          zoom: 1.2,
          regions: [
            {
              name: '苏州市',
              label: {
                show: false,
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#3471DF', //#005BFB  #3471DF
                },
              },
            },
            {
              name: '上海市',
              label: {
                textStyle: {
                  fontSize: 14,
                  color: '#FFFFFF', //#005BFB  #3471DF
                },
              },
            },
          ],

          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 18,
                color: '#FFFFFF',
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
          },

          itemStyle: {
            normal: {
              borderWidth: 0,
              areaColor: 'transparent',
            },
            emphasis: {
              areaColor: '',
              borderWidth: 0,
            },
          },
        },
        series: series,
      }

      // 将地图放入指定div

      chart.setOption(option)
    },
    puppleSort(arr){
        for(let i =0 ; i< arr.length - 1 ; i++){
          for(let j = 0; j <arr.length - 1 -i; j++){
            if(arr[j] > arr[j+1]){
              let temp = arr[j]
              arr[j]= arr[j+1]
              arr[j+1] = temp
            }
          }
        }
        return arr
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
/* html:-moz-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:-webkit-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:fullscreen {
  .home {
    width: 100vw;
    height: 100vh;
  }
} */

:-webkit-full-screen {
  .home {
    border: 10px solid red;
  }
}

:-moz-full-screen {
}

:-ms-fullscreen {
}

:fullscreen {
}

.home {
  max-width: 24rem;
  height: 13.5rem;
  background-image: url('../assets/imgs/bgc.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /*  box-sizing: border-box; */
 position: relative;
}

.project_display {
  display: inline-block;
  color: white;
  font-size: 0.525rem;
  font-family: Segoe UI;
  font-weight: bold;
  line-height: 0.7rem;
  color: #d1d1d1;
  opacity: 1;
  position: absolute;
  left: 0.6875rem;
  top: 0.775rem;
}

.project_display_english {
  display: inline-block;
  letter-spacing: 0.00625rem;
  font-size: 0.2rem;
  font-family: Segoe UI;
  font-weight: bold;
  line-height: 0.2625rem;
  color: #d1d1d1;
  opacity: 1;
  position: absolute;
  left: 0.6875rem;
  top: 1.4875rem;
}
.jiangsu {
  width: 100%;
  height: 100%;
}

//双伪元素清除
.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.ditu {
  position: absolute;
  left: 29.6%;
  top: 7%;
  width: 9.9125rem;
  height: 11.8rem;
  background-image: url('../assets/imgs/ditu.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.szcity {
  z-index: 1;
  position: absolute;
  left: 59%;
  top: 50%;
  font-size: 0.2rem;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 0.2625rem;
  color: #3471df;
  /* opacity: 1; */
}
</style>
